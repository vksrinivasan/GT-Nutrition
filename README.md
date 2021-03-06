# GT-Nutrition
Georgia Tech Nutrition project for CS 6440

Note: As the testing Gatech FHIR server did not containt a large enough volume of data to test the visualizations, the code augments FHIR entries with generated entries for mockup purposes. Look in fhirController.js for calls to fetch FHIR resources, as well as configuration for which FHIR server the dashboard responds to.

The client code relies on query parameters to know which practitioner and patient to get information for. Use practitionerId and patientId parameters in the URL. These must be valid on the FHIR server that this app is configured to communicate with.

## Local Testing

Here's how to set up a local server for testing.
First, if you don't have them, install git, node, and npm:

- git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

- node: https://nodejs.org/en/download/package-manager/#windows

- npm: http://blog.npmjs.org/post/85484771375/how-to-install-npm

Then, clone the repo to your local machine:

`git clone https://github.gatech.edu/ccheape3/CS-6440-Nutrition.git`

Give your gatech credentials. You'll now have the repo cloned to your pc.

### Dependencies

For communicating with a FHIR server, we use fhir.js: https://github.com/FHIR/fhir.js/blob/master/README.md

You'll need to install this manually as it is not on NPM at the moment :(. Go to the top level directory of our repo (CS-6440-Nutrition) and run the following command: `git clone https://github.com/FHIR/fhir.js.git`

This will create a new folder at the top level, fhir.js. Now we need to install fhir.js along with our other dependencies. Within the 'CS-6440-Nutrition' folder is a folder called 'Nutrition'. This is the actual nodejs project. CD into the Nutrition folder and run:

`npm install`

This will install all of the project's dependencies (listed in Nutrition/package.json). Now you can start the server. Still within the Nutrition folder, run:

`sudo nodemon ./bin/www`

This will run the server on the default port 3001. Go to localhost:3001 in your web browser to view the site you are now hosting. To change the port, open bin/www and change the value 3001. You can now edit files to your heart's content.

## NodeJS Structure

This is the structure of our app.

**app.js** - Instantiates the app object and sets its settings. This includes adding in routes from `routes.js`...

**routes.js** - Tells our app what to do if someone, for example, goes to "our_app_domain.com/history". If you are testing locally, 'our_app_domain.com' will be replaced by localhost:3000. The routes file receives the route '/history' and calls a specified function of one of our controllers. In this case, '/history' is handled by the `history` method of `indexController`.

**Controllers** - JS files that control certain aspects of our site, and handle requests. For example, the `nuvalController` will handle all requests for a patient's nuval information. Another controller, `indexController`, handles actually rendering the HTML for our site. Controllers do not need to stand alone; they can be associated with Models (database tables) as well as Views (HTML documents). We may in the future have a `patientController` that is associated with a patient model, and will handle creating and updating attributes of each patient. 

**Views** - "HTML" files that can be rendered by controllers to show different pages of our site. They aren't actually .html but .ejs files. The syntax is nearly the same, but it gives us the ability to embed javascript variables into the code, linking a view to the controller that is rendering it. As an example, look at the view `index.ejs`. It has an embedded javascript variable 'title'. If you go to the `indexController`, you can see where the title variable came from.

## Custom FHIR Resources

The FHIR resources this app pulls are for the most part standard: patient, observations (weight, height, respiratory rate, HDL, LDL, Cholesterol, HBA1C)

However, for nutrition scores (specifically nutrisavings) there were no existing FHIR resources available. To compensate, we designed the following FHIR resource to accomodate. This resource must be implemented by your FHIR server if you want nutrition score support:

```javascript
"fullUrl":"FHIR SERVER INSERT URL HERE",
"resource":{
    "resourceType":"Observation",
    "id":"123456",
    "status":"final",
     "code":{
        "coding":[
            {
                "system":"https://github.gatech.edu/ccheape3/CS-6440-Nutrition",
                "code":"1",
                "display":"Nutrisavings Score"
            }
        ]
    },

    "subject":{
        "reference":"Patient/14",
        "display":"Reed C Bullock"
    },
    "encounter":{
        "reference":"Encounter/13124"
    },
    "effectiveDateTime":"2017-04-17T19:30:00",
    "valueQuantity":{
        // nutrisavings values are always between 0 - 100, and are unitless scores.
        "value":100,
    }
}
```

In addition there is a 'notes' tab on the dashboard, but unfortunately no clinical note fhir resource in place on the Gatech FHIR server. 

For next steps, we suggest implementing this resource on the FHIR server, and adapting our code to reference it (fhirController.js): http://wiki.hl7.org/index.php?title=ClinicalNote_FHIR_Resource_Proposal
