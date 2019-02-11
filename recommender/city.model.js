var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  pictureUrl: { type: String },
  cluster: { type: Number },
  distanceFromCentroid: { type: Number },
  
  climateType: { type: String },
  costOfLivingIndexEstimated: { type: Boolean },
  costOfLivingIndexBin: { type: Number },

  costOfLivingIndex: { type: Number },
  venueCount: { type: Number },
  averageTemperature: { type: Number },
  averagePrecipitation: { type: Number },
  food: { type: Number },
  artsAndEntertainment: { type: Number },
  outdoorsAndRecreation: { type: Number },
  nightlife: { type: Number },

  costOfLivingIndexScaled: { type: Number },
  venueCountScaled: { type: Number },
  averageTemperatureScaled: { type: Number },
  averagePrecipitationScaled: { type: Number },
  foodScaled: { type: Number },
  artsAndEntertainmentScaled: { type: Number },
  outdoorsAndRecreationScaled: { type: Number },
  nightlifeScaled: { type: Number },
});

mongoose.model('City', citySchema);
module.exports = mongoose.model('City');
