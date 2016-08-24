# Lestra

### Setup dev env
```sh
$ cd path/to/lestra/project
$ npm install # Install dependencies
$ gulp # Start dev task
```

### Setup Vhost
Create http://lestra.dev vhost to make .htaccess working for routing.
If you want to change the vhost uri, change it in gulpfile.js/config.js

### Build production
```sh
$ cd path/to/lestra/project
$ gulp build # All compiled sources are in /dist
```
Copy the entire /dist folder on FTP

### HTACCESS

```
RewriteEngine On  
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

RewriteRule ^ /path/to/index/if-in-subdirectory/index.html [L]
```

### Customize data.json
The entire website is based on the src/assets/js/data.json file to create dynamically new expeditions & pages.
Follow exemples on the file to create new ones.

Here is are a default data.json file

```json
{
	"expeditions": [
		{
			"name": "Atka",
			"slug": "atka",
			"intro": "Au sein de ...",
			"image": "home/expedition1.png",
			"image_mobile": "home/expedition1-mobile.png",
			"views": {
				"preparation": [
					{
						"slug": "la-mission",
						"title": "La mission",
						"module": "HomeExpedition",
						"props": {
							"header": {
								"background": "expeditions/1/bg-home-desktop.png",
								"background_mobile": "expeditions/1/bg-home.png",
								"title": "Un voilier au service des rêves arctiques"
							},
							"image": "expeditions/1/map.png",
							"image_title": "Sur la côte ouest du Groenland",
							"title": "Le projet ATKA et A Chacun son Everest ! GRAND NORD… GRAND RÊVE !",
							"content": "<p>L'exception ...</p><blockquote>Un voyage exceptionnel ... </blockquote>"
						}
					},
					{
						"slug": "l-equipe",
						"title": "L'équipe",
						"module": "Slider",
						"props": {
							"header": {
								"background": "expeditions/1/bg-home-desktop.png",
								"background_mobile": "expeditions/1/bg-home.png",
								"title": "Les copains"
							},
							"items": [
								{
									"title": "Parka Artctic Expe",
									"image": "expeditions/1/equipment.png",
									"content": "<h4>Description</h4><p>Parka mixte pour ... The Pole 2.</p><a href=\"#\" target=\"_blank\">En savoir plus</a>"
								}
							]
						}
					},
					{
						"slug": "l-equipement",
						"title": "L'équipement",
						"module": "Slider",
						"props": {
							"header": {
								"background": "expeditions/1/bg-home-desktop.png",
								"background_mobile": "expeditions/1/bg-home.png",
								"title": "Les équipements de l'expédition"
							},
							"items": [
								{
									"title": "Parka Artctic Expe",
									"image": "expeditions/1/equipment.png",
									"content": "<h4>Description</h4><p>Parka mixte pour ... The Pole 2.</p><a href=\"#\" target=\"_blank\">En savoir plus</a>",
									"mention": "Lestra Extrem"
								}
							]
						}
					},
					{
						"slug": "le-depart",
						"title": "Le départ",
						"module": "Galery",
						"props": {
							"title": "A la découverte d’ATKA...",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>",
							"grid": [
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "2x2",
									"size_mobile": "3x1",
									"details": [
										"expeditions/1/img-galery-test.png"
									]
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "1x1",
									"size_mobile": "3x1",
									"details": [
										"expeditions/1/img-galery-test2.png"
									]
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "2x1",
									"size_mobile": "2x1",
									"details": [
										"expeditions/1/img-galery-test.png"
									]
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "1x2",
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": null,
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": null,
									"size_mobile": "2x1"
								}
							]
						}
					}
				],
				"exploration": [
					{
						"slug": "la-rencontre",
						"title": "La rencontre",
						"module": "Galery",
						"props": {
							"title": "A la découverte d’ATKA...",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>",
							"grid": [
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "2x2",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "1x1",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "2x1",
									"size_mobile": "2x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "1x2",
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": null,
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": null,
									"size_mobile": "2x1"
								}
							]
						}
					},
					{
						"slug": "l-embarquement",
						"title": "L'embarquement",
						"module": "Galery",
						"props": {
							"title": "A la découverte d’ATKA...",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>",
							"grid": [
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "2x2",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "1x1",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "2x1",
									"size_mobile": "2x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "1x2",
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": null,
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": null,
									"size_mobile": "2x1"
								}
							]
						}
					},
					{
						"slug": "l-interview",
						"title": "L'interview",
						"module": "Interview",
						"props": {
							"header": {
								"background": "expeditions/1/bg-interview.png",
								"name": "Arnaud"
							},
							"title": "Arnaud",
							"subtitle": "Membre de A Chacun son Everest",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>"
						}
					},
					{
						"slug": "les-coulisses",
						"title": "Les coulisses",
						"module": "Galery",
						"props": {
							"title": "A la découverte d’ATKA...",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>",
							"grid": [
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "2x2",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "1x1",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "2x1",
									"size_mobile": "2x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "1x2",
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": null,
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": null,
									"size_mobile": "2x1"
								}
							]
						}
					}
				],
				"retour": [
					{
						"slug": "le-trajet",
						"title": "Le trajet",
						"module": "Galery",
						"props": {
							"title": "A la découverte d’ATKA...",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>",
							"grid": [
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "2x2",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "1x1",
									"size_mobile": "3x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": "2x1",
									"size_mobile": "2x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": "1x2",
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test2.png",
									"size": null,
									"size_mobile": "1x1"
								},
								{
									"image": "expeditions/1/img-galery-test.png",
									"size": null,
									"size_mobile": "2x1"
								}
							]
						}
					},
					{
						"slug": "pascale",
						"title": "Pascale",
						"module": "Interview",
						"props": {
							"header": {
								"background": "expeditions/1/bg-interview.png",
								"name": "Pascale"
							},
							"title": "Pascale",
							"subtitle": "Membre de A Chacun son Everest",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>"
						}
					},
					{
						"slug": "alexande",
						"title": "Alexande",
						"module": "Interview",
						"props": {
							"header": {
								"background": "expeditions/1/bg-interview.png",
								"name": "Alexande"
							},
							"title": "Alexande",
							"subtitle": "Membre de A Chacun son Everest",
							"content": "<p>L'exception ... ensemble.</p><blockquote>Un voyage exceptionnel ... </blockquote>"
						}
					},
					{
						"slug": "le-film",
						"title": "Le film",
						"module": "Film",
						"props": {
							"title": "À chacun son<br />Everest",
							"poster": "expeditions/1/film-poster.png",							
							"sources": {
								"video/mp4": "oceans.mp4",
								"video/webm": "oceans.webm",
								"video/ogg": "oceans.ogv"
							}
						}
					}
				]
			}
		}
	]
}
```