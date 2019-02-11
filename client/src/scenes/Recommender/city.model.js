const climateTypeToName = {
  Af: "Tropical rainforest",
  Am: "Tropical wet",
  Aw: "Tropical wet and dry",
  As: "Tropical savanna",
  BWh: "Desert",
  BWk: "Desert",
  BSh: "Semi-arid",
  BSk: "Tropical and subtropical steppe",
  Csa: "Mediterrean",
  Csc: "Mediterrean",
  Csb: "Mediterrean",
  Cwa: "Humid subtropical",
  Cwb: "Oceanic subtropical highland",
  Cwc: "Oceanic subtropical highland",
  Cfa: "Humid subtropical",
  Cfb: "Marine west coast",
  Cfc: "Marine west coast",
  Dsa: "Humid continental",
  Dsb: "Humid continental",
  Dsc: "Subarctic",
  Dsd: "Subarctic",
  Dwa: "Humid continental",
  Dwb: "Humid continental",
  Dwc: "Subarctic",
  Dwd: "Subarctic",
  Dfa: "Hot summer continental",
  Dfb: "Humid continental",
  Dfc: "Continental subarctic",
  Dfd: "Subarctic",
  ET: "Tundra",
  EF: "Ice cap",
}

class City {
  id;
  name;
  country;
  pictureUrl;
  climateType;
  averageTemperature;
  costOfLivingIndexBin;
  food;
  artsAndEntertainment;
  outdoorsAndRecreation;
  nightlife;
  distance;

  constructor({id, name, country, pictureUrl, climateType, averageTemperature, costOfLivingIndexBin, food, artsAndEntertainment, outdoorsAndRecreation, nightlife, distance}) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.pictureUrl = pictureUrl;
    this.climateType = climateType;
    this.averageTemperature = averageTemperature;
    this.costOfLivingIndexBin = costOfLivingIndexBin;
    this.food = food;
    this.artsAndEntertainment = artsAndEntertainment;
    this.outdoorsAndRecreation = outdoorsAndRecreation;
    this.nightlife = nightlife;
    this.distance = distance;
  }

  static parse = data => {
    const city = new City({
      id: data._id,
      name: data.name,
      country: data.country,
      pictureUrl: data.pictureUrl !== 'NaN' ? data.pictureUrl : 'https://source.unsplash.com/aExT3y92x5o/500x300',
      climateType: climateTypeToName[data.climateType],
      averageTemperature: data.averageTemperature,
      costOfLivingIndexBin: data.costOfLivingIndexBin,
      food: data.foodScaled,
      artsAndEntertainment: data.artsAndEntertainmentScaled,
      outdoorsAndRecreation: data.outdoorsAndRecreationScaled,
      nightlife: data.nightlifeScaled,
      distance: data.distance,
    });
    
    return city;
  }
}

export default City;