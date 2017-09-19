# VueJS Wordpress Theme

Powered by the WordPress REST API v2. Adapted from [dedakb/vuewp](https://github.com/bedakb/vuewp.git).

## Development

- Clone this repo `git clone https://github.com/lyzs90/vuewp.git`
- Install the dependencies `npm install`
- Set up a [Docker](https://www.docker.com/community-edition) environment
- Start Wordpress and MySQL `docker-compose up -d`
- Obtain your docker container ip `docker-machine ip`
- Access the Wordpress server at this url [http://<container-ip>:8000](http://<container-ip>:8000) and perform the famous 5-minute install
- Once Wordpress is set up, enable the theme
- For a better development experience, you should run `gulp serve` to run the Browsersync proxy server and you can access your site at http://localhost:8080, complete with live reloading and other cool stuff.

## Deployment

- To use as a theme, simply copy the `vuewp` directory to your Wordpress themes i.e. `/var/www/html/wp-content/themes`
- For a headless setup, one option is to host the `vuewp` directory with built assets on [S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) as a static site.

## Recommended Plugins

- [Better REST API Featured Images](https://wordpress.org/plugins/better-rest-api-featured-images/)
- [ACF to Rest API](https://wordpress.org/plugins/acf-to-rest-api/)
- [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)
- [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/)
- [Fakerpress](https://wordpress.org/plugins/fakerpress/)
