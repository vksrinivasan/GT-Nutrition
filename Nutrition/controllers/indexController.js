/*
  Controller for the web page itself. Renders the different tabs.
*/

module.exports = { 

  // GET /patients, query parameters: practitionerId
  patients: function(req, res, next) {
    res.render('home', { title: 'Nutrition App', page: 'partials/patients' });  
  },

  // GET /summary, query parameters: patientId, practitionerId
  summary: function(req, res, next) {
    res.render('patient', { title: 'Nutrition App', page: 'partials/summary' });  
  },

  // GET /history
  history: function(req, res, next) {
    res.render('patient', { title: 'Nutrition App', page: 'partials/history' });  
  },

  // GET /nutrients
  nutrients: function(req, res, next) {
    res.render('patient', { title: 'Nutrition App', page: 'partials/nutrients' });  
  },

  // GET /goals
  goals: function(req, res, next) {
    res.render('patient', { title: 'Nutrition App', page: 'partials/goals' });  
  },

  // GET /notes, query parameters: patientId, practitionerId
  notes: function(req, res, next) {
    res.render('patient', { title: 'Nutrition App', page: 'partials/notes'});  
  }
  
};