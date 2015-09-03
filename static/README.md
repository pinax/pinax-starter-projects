# Static Media

We are using `webpack` and `npm` for our static build process. A configuration
that should work for most cases has already been configured and statics come
pre-built so you don't need to do anything unless you change anything in the
`src/` directory.

Do NOT edit anything in the `dist/` directory.

Local development uses media from `dist/` and we are firm believers in building
static assets and committing them to the repo before deployments. This way we
always are testing and exercise exactly what will be served in production. It
also makes our deployment simpler.

## Images

If you want to add images to be referenced in your site's HTML or CSS there are
a couple things you need to be aware of.

You should first create a folder under `src/` called `images` (you can change
the name of this by updating your `webpack.config.js` to look for something
else). Store all your source images in this folder (or subfolders).

### CSS

Whether you use SASS or LESS, you will reference your images using relative
urls:

```css
div {
    background-image: url(../images/background.png);
}
```

### HTML

If you want to use an `img` tag you will need to do a couple things:

```html
<img src="{% static "images/picture.png" %}" />
```

then in your `src/js/main.js` you need to tell `webpack` that you are going to
reference that image:

```js
require("../images/picture.png");
```
