# settings-bro

> A spacebro tool to receive settings in JSON format and write it on
> disk. This tool is used with
> [settings-editor](https://github.com/soixantecircuits/settings-editor)

## ❓Why ?

We use [standard-settings](https://github.com/soixantecircuits/standard-settings) a lot.
Actually we use it in every nodeJS and electron project.

Sometimes, we need a non-developer humans to change the settings in production.  
This an alternative to `ssh` + `vim`

## 🌍 Installation

`yarn`


## ⚙ Configuration

```
cp settings/settings.default.json settings/settings.json
```

And edit settings.json,  
change the `folder.settings`to a path of a settings file that you want
to be available for web editing.


You can also change settings with argv parameters.
Learn more about this on [standard-settings](https://github.com/soixantecircuits/standard-settings)

## 👋 Usage

```
node index.js
```

And run [settings-editor](https://github.com/soixantecircuits/settings-editor) to start sending settings.

## 🕳 Troubleshooting

Ask emmanuel on soixantecircuits.slack.com

## ❤️ Contribute

Please do!

