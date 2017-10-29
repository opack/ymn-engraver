# YmnEngraver

# Roadmap
* New features
  * Toolbar
    * Save last 10 loaded files in a dropdown for load button
  * Validate score input
  * Convertion of the score input
    * From whatever format it is to YMN
    * From YMN to another supported format (CMN-French, CMN-English, DCRN, YMN)
  * Handle DCRN (Direct CMN Reading) notation : write notes as you see them, without understanding their meaning, for easy and quick transposition
    * 2 staves : one for treble clef (noted 'G') and one for bass clef (noted 'F')
    * Number of sharps and bemols are indicated using this notation : Tx#4 means 4 sharps in the armor. Bxb2 means 2 bemols. 
    * Notes are written with a number indicating the line where the note appears in CMN. Example : on T staff, 1 means that the note is on the first line of G-clef, meaning E ; 2 means F, 3 means G, 4 means A...
    * If a note is below the 1st lines then number is negative. Example : for Tx staff, -1 means 1 position under the 1st line of the G-clef, meaning D. -2 means C...
    * YMN timing notation and other notations (systems, part separator...) must be respected
    * Example : 3 first measures of "Close Your Eyes" :
      {
      G#3|4:-2:-1+2:x+* 4|1+3:-3:-2+-4:1|-4+-6:*+*:*+*:*+*
      -
      F#3|-1 4:9:-3 2:7|-2 3:8:2 6:9 6|-3 2:6 7:*:* 5
      }
  * Ability to modify rendering configuration (ShapeConfig)
  * Score edition
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
  * Use FireBase to store and load files for the user (who has to be authenticated)
* Bugfixes
  * Draw continuation lines not only for the first chord note
  * Draw the beat bar only if it is not the last of its measure.

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
