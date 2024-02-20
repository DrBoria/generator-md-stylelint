'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require("lodash");
const fs = require("fs");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the super ${chalk.red('generator-md-stylelint')} generator!`
      )
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath(".stylelintrc"),
      this.destinationPath(".stylelintrc"),
      {answers: this.answers}
    );


    // Merge Package Json
    const templateJSON = this.fs.readJSON(this.templatePath("package.json"));
    const usersJSON = this.fs.readJSON(this.destinationPath('package.json'));
    const newPackageJsonContent = _.merge(usersJSON, templateJSON);
    fs.writeFileSync(this.destinationPath('package.json'), JSON.stringify(newPackageJsonContent, null, 4));
  }

  install() {
    this.installDependencies({
      npm: true,
      yarn: true,
      callback: function () {
        console.log('Everything is ready!');
        console.log('Thanks for using MD tools');
      }
    });
  }
};
