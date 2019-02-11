const City = require('./city.model')
const Survey = require('./survey.model')


const distance = require('euclidean-distance');
const pick = require('lodash/pick'); 
const shuffle = require('lodash/shuffle'); 
const sampleSize = require('lodash/sampleSize'); 
const sample = require('lodash/sample'); 
const sumBy = require('lodash/sumBy'); 
const includes = require('lodash/includes'); 
const vanillaFilter = require('lodash/filter'); 
const vanillaTake = require('lodash/take'); 
const vanillaTakeRight = require('lodash/takeRight'); 
const parseInt = require('lodash/parseInt'); 
const isInteger = require('lodash/isInteger'); 
const pickBy = require('lodash/pickBy'); 
const get = require('lodash/get'); 

const filter = require('lodash/fp/filter'); 
const map = require('lodash/fp/map'); 
const take = require('lodash/fp/take'); 
const sortBy = require('lodash/fp/sortBy'); 
const flow = require('lodash/fp/flow');

const featureCodeToName = {
  cost: 'costOfLivingIndexScaled',
  temperature: 'averageTemperatureScaled',
  food: 'foodScaled',
  arts: 'artsAndEntertainmentScaled',
  outdoors: 'outdoorsAndRecreationScaled',
  nightlife: 'nightlifeScaled',
}

async function postSurvey(req, res) {
  console.log(req.body);

  const requestDetails = {
    remoteAddress: get(req, 'connection.remoteAddress', 'NA'),
    referer: get(req, 'headers.referer', 'NA'),
    userAgent: get(req, 'headers.user-agent', 'NA'),
    ip: get(req, 'headers.x-forwarded-for', 'NA')
  }

  Survey.create({ ...req.body, requestDetails },
  (err, survey) => {
    if (err) return res.status(500).send('A problem occurred while adding the survey to the database!');
    res.status(200).send('Survey answers submitted successfully!');
  });
}

async function listCities(req, res, next) {
  try {
    const cities = await City.find()
      .select('name country climateType costOfLivingIndexBin pictureUrl distanceFromCentroid cluster')
      .exec();

    const initialCities = [];

    // cluster 1
    const c1Cities = flow(
      filter(c => c.cluster === 1),
      sortBy('distanceFromCentroid'),
      take(16)
    )(cities);
    // cluster 2
    const c2Cities = flow(
      filter(c => c.cluster === 2),
      sortBy('distanceFromCentroid'),
      take(16)
    )(cities);
    // cluster 3
    const c3Cities = flow(
      filter(c => c.cluster === 3),
      sortBy('distanceFromCentroid'),
      take(16)
    )(cities);
    // cluster 4 - small cluster
    const c4Cities = flow(
      filter(c => c.cluster === 4),
      sortBy('distanceFromCentroid'),
      take(5)
    )(cities);
    // cluster 5
    const c5Cities = flow(
      filter(c => c.cluster === 5),
      sortBy('distanceFromCentroid'),
      take(16)
    )(cities);

    initialCities.push(sample(vanillaTake(c1Cities, 8)));
    initialCities.push(sample(vanillaTakeRight(c1Cities, 8)));

    initialCities.push(sample(vanillaTake(c2Cities, 8)));
    initialCities.push(sample(vanillaTakeRight(c2Cities, 8)));

    initialCities.push(sample(vanillaTake(c3Cities, 8)));
    initialCities.push(sample(vanillaTakeRight(c3Cities, 8)));

    initialCities.push(sample(vanillaTake(c4Cities, 5)));
    
    initialCities.push(sample(vanillaTake(c5Cities, 8)));
    initialCities.push(sample(vanillaTakeRight(c5Cities, 8)));

    const alreadySelectedCityIds = initialCities.map(c => String(c._id));
    const remainingCanditateCities = vanillaFilter(cities, c => !includes(alreadySelectedCityIds, String(c._id)))

    initialCities.push(...sampleSize(remainingCanditateCities, 3));

    res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
    return res.status(200).json(shuffle(initialCities));
  } catch (error) {
    next(error);
  }
}

async function recommendCities(req, res, next) {
  try {
    let selectedCityIds = [];
    if (req.query['selected_cities']) {
      selectedCityIds = Array.isArray(req.query['selected_cities']) ? req.query['selected_cities'] : [req.query['selected_cities']];
    }
    if (selectedCityIds.length === 0) {
      return res.status(400).json("Selected cities are missing!");  
    }

    const cities = await City.find()
      .exec();
    const selectedCities = vanillaFilter(cities, c => includes(selectedCityIds, String(c._id)));

    const userProfile = {
      costOfLivingIndexScaled: sumBy(selectedCities, 'costOfLivingIndexScaled') / selectedCities.length,
      venueCountScaled: sumBy(selectedCities, 'venueCountScaled') / selectedCities.length,
      averageTemperatureScaled: sumBy(selectedCities, 'averageTemperatureScaled') / selectedCities.length,
      averagePrecipitationScaled: sumBy(selectedCities, 'averagePrecipitationScaled') / selectedCities.length,
      foodScaled: sumBy(selectedCities, 'foodScaled') / selectedCities.length,
      artsAndEntertainmentScaled: sumBy(selectedCities, 'artsAndEntertainmentScaled') / selectedCities.length,
      outdoorsAndRecreationScaled: sumBy(selectedCities, 'outdoorsAndRecreationScaled') / selectedCities.length,
      nightlifeScaled: sumBy(selectedCities, 'nightlifeScaled') / selectedCities.length,
    }

    const refinements = {
      cost: parseInt(req.query['cost']),
      temperature: parseInt(req.query['temperature']),
      food: parseInt(req.query['food']),
      arts: parseInt(req.query['arts']),
      outdoors: parseInt(req.query['outdoors']),
      nightlife: parseInt(req.query['nightlife'])
    }

    const activeRefinements = pickBy(refinements, isInteger);
    
    for (const [featureCode, value] of Object.entries(activeRefinements)) {
      userProfile[featureCodeToName[featureCode]] = userProfile[featureCodeToName[featureCode]] + (value / 5);
      if (userProfile[featureCodeToName[featureCode]] < 0) {
        userProfile[featureCodeToName[featureCode]] = 0
      } else if (userProfile[featureCodeToName[featureCode]] > 1) {
        userProfile[featureCodeToName[featureCode]] = 1
      }
    }

    cities.forEach(c => {
      c.distance = distance(
        [ c.costOfLivingIndexScaled,
          c.venueCountScaled,
          c.averageTemperatureScaled,
          c.averagePrecipitationScaled,
          c.foodScaled,
          c.artsAndEntertainmentScaled,
          c.outdoorsAndRecreationScaled,
          c.nightlifeScaled], 
        [ userProfile.costOfLivingIndexScaled,
          userProfile.venueCountScaled,
          userProfile.averageTemperatureScaled,
          userProfile.averagePrecipitationScaled,
          userProfile.foodScaled,
          userProfile.artsAndEntertainmentScaled,
          userProfile.outdoorsAndRecreationScaled,
          userProfile.nightlifeScaled]
      );
    });


    const citiesToRecommend = flow(
      // filter(c => !includes(selectedCityIds, String(c._id))),   // uncomment to filter out selected cities from recommendations
      sortBy('distance'),
      map(c => pick(c, 
        ['_id', 'name', 'country', 'climateType', 'averageTemperature', 'costOfLivingIndexBin', 'foodScaled', 'pictureUrl',
        'artsAndEntertainmentScaled', 'outdoorsAndRecreationScaled', 'nightlifeScaled', 'distance'])),
      take(10)
    )(cities);

    res.set('Cache-Control', 'max-age=0, no-cache, must-revalidate, proxy-revalidate');
    return res.status(200).json(citiesToRecommend);
  } catch (error) {
    next(error);
  }
}

module.exports = { listCities, recommendCities, postSurvey }