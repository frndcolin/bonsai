const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const shell = require('shelljs')
const ejs = require('ejs')
const chalk = require('chalk')

const CURR_DIR = process.cwd()
const SKIP_FILES = ['node_modules', '.template.json']

function isNode(options) {return fs.existsSync(path.join(options.templatePath, 'package.json'))}
function postProcess(options) {return isNode(options) ? postProcessNode(options) : true}

function getTemplateConfig(templatePath) {
  const configPath = path.join(templatePath, '.template.json')

  if (!fs.existsSync(configPath)) return {}

  const templateConfigContent = fs.readFileSync(configPath)

  if (templateConfigContent) {
    return JSON.parse(templateConfigContent.toString())
  }

  return {}
}

function makeProjectDirectory(projectPath) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`))
    return false
  }

  fs.mkdirSync(projectPath)
  return true
}

function createDirectoryContents(templatePath, projectName, config) {
  const templateImage = fs.readdirSync(templatePath)

  templateImage.forEach(fileOrFolder => {
    const origFilePath = path.join(templatePath, fileOrFolder)
    const stats = fs.statSync(origFilePath)
    const skipFileOrFolder = SKIP_FILES.includes(fileOrFolder)

    if (stats.isFile() && !skipFileOrFolder) {
      let contents = fs.readFileSync(origFilePath, 'utf8')

      contents = ejs.render(contents, { projectName })

      const writePath = path.join(CURR_DIR, projectName, fileOrFolder)
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory() && !skipFileOrFolder) {
      fs.mkdirSync(path.join(CURR_DIR, projectName, fileOrFolder))

      createDirectoryContents(path.join(templatePath, fileOrFolder), path.join(projectName, fileOrFolder), config)
    }
  })
}

function postProcessNode(options) {
  shell.cd(options.tartgetPath)

  let cmd = ''

  if (shell.which('yarn')) {
    cmd = 'yarn'
  } else if (shell.which('npm')) {
    cmd = 'npm install'
  }

  if (cmd) {
    const result = shell.exec(cmd)

    if (result.code !== 0) {
      return false
    }
  } else {
    console.log(chalk.red('No yarn or npm found. Cannot run installation.'))
  }

  return true
}

function showMessage(options) {
  console.log('')
  console.log(chalk.green('Done.'))
  console.log(chalk.green(`Go into the project: cd ${options.projectName}`))

  const message = options.config.postMessage

  if (message) {
    console.log('')
    console.log(chalk.yellow(message))
    console.log('')
  }
}

function grow(argv) {
  const CHOICES = fs.readdirSync(path.join(__dirname, '../templates'))
  const QUESTIONS = [
    {
      name: 'name',
      type: 'input',
      message: 'Project name:',
      when: () => !argv['name'],
      validate: (input) => {
        if (/^([A-Za-z\-_\d])+$/.test(input)) return true
        else return 'Project name may only include letters, numbers, underscores and hashes.'
      }
    },
    {
      name: 'template',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: CHOICES,
      when: () => !argv['template']
    }
  ]

  inquirer.prompt(QUESTIONS)
    .then(answers => {

      answers = Object.assign({}, answers, argv)

      const projectChoice = answers['template']
      const projectName = answers['name']
      const templatePath = path.join(__dirname, '../templates', projectChoice)
      const tartgetPath = path.join(CURR_DIR, projectName)
      const templateConfig = getTemplateConfig(templatePath)

      const options = {
        projectName,
        templateName: projectChoice,
        templatePath,
        tartgetPath,
        config: templateConfig
      }

      if (!makeProjectDirectory(tartgetPath)) return

      createDirectoryContents(templatePath, projectName, templateConfig)

      if (!postProcess(options)) return

      showMessage(options)
    })
}

module.exports = { grow }
