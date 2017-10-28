# YmnEngraver

# Roadmap
* New features
    * Load from text file (buttons on the bottom of the left column) https://github.com/eligrey/FileSaver.js
    * Create a toolbar with all action buttons
    * Make continuation line continue after the last chord of the system if applicable, and start before the first chord of the next system
    * Ability to directly update only modified parts of the score and layout impacted parts
    * Add/remove parts from groups instead of using visible in order to improve performance
    * Add zoom (https://konvajs.github.io/docs/sandbox/Zooming_Relative_To_Pointer.html) and pan
    * Add ability to edit notes (https://konvajs.github.io/docs/sandbox/Editable_Text.html)
    * Add drag and drop notes (https://konvajs.github.io/docs/sandbox/Drag_and_Drop_Multiple_Shapes.html)
    * Add copy and paste notes
    * Add tooltip over note to show pitch in english or french music notation
    * Plugin system to validate and load various formats
        * Load from MusicXML
* Refactorings
    * Change layout() methods to static methods

# Developing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
