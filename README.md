# Single Page Theme developed with VueJS and WP REST API v2

Basic Single Page Theme developer with WordPress REST API v2 and VueJS 2.0.

## Install Tools & Download the Source

1. Download and install the current Version of **Composer** from [Getcomposer.org](https://getcomposer.org/)
2. Install global instance of **Gulp** with `npm install -g gulp`
3. Download the Source in your preferred folder with `git clone https://github.com/bedakb/vuewp.git`

## WordPress Configuration


## Required Plugins

1. [WordPress REST API v2](https://wordpress.org/plugins/rest-api/)
2. [Better REST API Featured Images](https://wordpress.org/plugins/better-rest-api-featured-images/)

## Install Dependencies

Open the Folder with the source code in your `cmd` and run following commands:
- `composer install` to install wordpress core-files and PHP devDependencies
- `npm install` to install the Node development tools (Scss, BrowserSync, dev-server etc.)

## Start Development-Server

Start the development server by simply typing this command: `gulp serve`. A new Chrome window will open a local development server for you to work on. The database is hosted on an external server. All files are saved locally and accessible for Git version control.

You can also access this URL in any other browser for testing: http://localhost:8080 or http://XXX.XXX.XX.XX:8080 (insert your LAN IP) to access it from your phone or other device.

With BrowserSync everything is in Sync and your changes are populated automatically on all active browser sessions.


## Credits

Enviroment by [Gilles Stuessi](https://github.com/gillesstuessi)
[VueJS](https://vuejs.org/) 
[WordPress](https://wordpress.org)
[WordPress REST API v2](https://wordpress.org/plugins/rest-api/)
[Better REST API Featured Images](https://wordpress.org/plugins/better-rest-api-featured-images/)
