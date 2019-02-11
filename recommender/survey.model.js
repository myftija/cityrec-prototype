var mongoose = require('mongoose');

var surveySchema = new mongoose.Schema({
  version: { type: Number, required: true },
  code: { type: String },
  recommendationTimeTaken: { type: Number },
  surveyTimeTaken: { type: Number },
  clickCount: { type: Number },
  cityRefreshCount: { type: Number },
  dismissedCities: { type: [[String]] },
  requestDetails: { type: {} },
  
  initialCities: { type: [String] },
  recommendations: { type: [String] },
  selectedCities: { type: [String] },
  refinements: { type: {} },

  gender: { type: String },
  ageGroup: { type: String },
  predictorRelevance: { type: {} },
  travelingFrequency: { type: String },

  evaluation: { type: {} },
  interest: { type: String },
  recommendation: { type: String },
  comment: { type: String },
}, { timestamps: true });

mongoose.model('Survey', surveySchema);
module.exports = mongoose.model('Survey');
