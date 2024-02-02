// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const yaml = require('js-yaml');
require('dotenv').config();
const options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Orders/Cart microservice',
      description: 'This a microservice to manage orders of customers',
      /*     termsOfService: "https://example.com/terms/", */
      contact: {
        name: 'Florim de Sousa Jeque',
        /*  url: "https://www.example.com/support", */
        email: 'jeque.developer@gmail.com',
      },
      /*     license: {
                    name: "Apache 2.0",
                    url: "https://www.apache.org/licenses/LICENSE-2.0.html"
                }, */
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    servers: [{ url: 'http://localhost:' + process.env.PORT }],
  },
  apis: [`${__dirname}/src/routes/*routes.ts`],
};

/* const openapiSpec = swaggerJSDoc(options); */
/* const yamlSpec = yaml.dump(openapiSpec); */
/* fs.writeFileSync('swagger.json', JSON.stringify(openapiSpec, null, 2)); */
// Save the YAML specification to a file
/* fs.writeFileSync('openapi.yaml', yamlSpec); */

module.exports = options;
