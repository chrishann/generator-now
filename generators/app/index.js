'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const slugify = require('slugify');
const snAscii = require('../snascii');

module.exports = class extends Generator {

  prompting() {
    const promptObj = require('../prompt')(this);

    snAscii.print();
    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Welcome to the fabulous ' + chalk.red('generator-now') + ' generator!'
    // ));

    return this.prompt(promptObj.choices).then(props => {
      // To access props later use this.props.someAnswer;
      props.projectName = slugify(props.projectName);
      props.folders = promptObj.selectFoders(props.folders);
      props.folders_key = Object.keys( JSON.parse(props.folders) );
      props.auth = promptObj.generatePassword(props.username, props.password);
      props.libs = promptObj.selectLibs(props.libs);
      props.dist = promptObj.selectDist(props);
      this.props = props;
    });
  }

  writing() {

    // this.fs.copyTpl(
    //   this.templatePath('**/*'),
    //   this.destinationRoot(),
    //   this.props
    // );

    this.fs.copyTpl(this.templatePath('_sn-config.json'), this.destinationPath('.sn-config.json'), this.props);
    this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('.gitignore'), this.props);
    this.fs.copyTpl(this.templatePath('Gruntfile.js'), this.destinationPath('Gruntfile.js'), this.props);
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.props);

  }

  install() {
    this.installDependencies({
      bower: false,
      yarn: false,
      npm: true
    });
  }
};
