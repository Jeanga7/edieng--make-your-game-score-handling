export let levels = [{
        "scene": [{
                "pos": {
                    "x": 800,
                    "y": 20
                },
                "size": {
                    "w": 300,
                    "h": 300
                },
                "type": "sun",
                "cssPosition": "fixed"
            },
            {
                "pos": {
                    "x": 2800,
                    "y": -20
                },
                "size": {
                    "w": 682,
                    "h": 302
                },
                "type": "scene1",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 1800,
                    "y": 20
                },
                "size": {
                    "w": 470.2,
                    "h": 196.2
                },
                "type": "scene2",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 4100,
                    "y": 150
                },
                "size": {
                    "w": 157 * 1.5,
                    "h": 173 * 1.5
                },
                "type": "sphinx",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 150,
                    "y": 10
                },
                "size": {
                    "w": 125,
                    "h": 125
                },
                "type": "panneau",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 1100,
                    "y": 10
                },
                "size": {
                    "w": 125,
                    "h": 125
                },
                "type": "panneau",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 2350,
                    "y": 415 
                },
                "size": {
                    "w": 125,
                    "h": 125
                },
                "type": "panneau",
                "cssPosition": "absolute"
            },
        ],
        "obstacles": [{
                "pos": {
                    "x": 1,
                    "y": 0
                },
                "type": "ground",
                "size": {
                    "w": 550,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 1050,
                    "y": 0
                },
                "type": "ground",
                "size": {
                    "w": 3280,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 250,
                    "y": 100
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 680,
                    "y": 20
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 1250,
                    "y": 10
                },
                "type": "colonne",
                "size": {
                    "w": 176,
                    "h": 143
                }
            },
            {
                "pos": {
                    "x": 2200,
                    "y": 10
                },
                "type": "colonne",
                "size": {
                    "w": 176,
                    "h": 143
                }
            },
            {
                "pos": {
                    "x": 2600,
                    "y": 10
                },
                "type": "status",
                "size": {
                    "w": 276 / 1.8,
                    "h": 902 / 1.8
                }
            },
            {
                "pos": {
                    "x": 3600,
                    "y": 10
                },
                "type": "groundNL",
                "size": {
                    "w": 367 * 2,
                    "h": 137
                }
            },
            {
                "pos": {
                    "x": 1900,
                    "y": 200
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 2250,
                    "y": 350
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 340,
                    "y": 180
                },
                "size": {
                    "w": 50,
                    "h": 50
                },
                "type": "power"
            },
            {
                "pos": {
                    "x": 740,
                    "y": 95
                },
                "size": {
                    "w": 50,
                    "h": 50
                },
                "type": "life"
            },
            {
                "pos": {
                    "x": 1800,
                    "y": 30
                },
                "size": {
                    "w": 50,
                    "h": 50
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 3250,
                    "y": 10
                },
                "size": {
                    "w": 485/3,
                    "h": 415/3
                },
                "type": "chameau"
            },
        ],
        "enemies": [{
                "pos": {
                    "x": 1400,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 2
            },
            {
                "pos": {
                    "x": 2100,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 1.5
            },
            {
                "pos": {
                    "x": 2800,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 3
            },
        ],
        "background": "skyblue",
        "duration": 120,
        "end": 4200
    },
    {
        "scene": [{
                "pos": {
                    "x": 800,
                    "y": 80
                },
                "size": {
                    "w": 300,
                    "h": 300
                },
                "type": "moon",
                "cssPosition": "fixed"
            },
            {
                "pos": {
                    "x": 3400,
                    "y": 2
                },
                "size": {
                    "w": 407,
                    "h": 381
                },
                "type": "romeArena",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 5000,
                    "y": 1
                },
                "size": {
                    "w": 200,
                    "h": 200
                },
                "type": "roiGrec",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 1000,
                    "y": 18
                },
                "size": {
                    "w": 415,
                    "h": 435
                },
                "type": "greceBuilding",
                "cssPosition": "absolute"
            }
        ],
        "obstacles": [{
                "pos": {
                    "x": 1,
                    "y": 0
                },
                "type": "ground",
                "size": {
                    "w": 2300,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 3250,
                    "y": 0
                },
                "type": "ground",
                "size": {
                    "w": 2000,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 2100,
                    "y": 140
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 2450,
                    "y": 260
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 1350,
                    "y": 110
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 950,
                    "y": 160
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 2830,
                    "y": 140
                },
                "type": "platform2",
                "size": {
                    "w": 231,
                    "h": 72
                }
            },
            {
                "pos": {
                    "x": 1750,
                    "y": 10
                },
                "type": "colonne",
                "size": {
                    "w": 176,
                    "h": 143
                }
            },
            {
                "pos": {
                    "x": 650,
                    "y": 10
                },
                "type": "colonne",
                "size": {
                    "w": 176,
                    "h": 143
                }
            },
            {
                "pos": {
                    "x": 3950,
                    "y": 10
                },
                "type": "colonne",
                "size": {
                    "w": 176,
                    "h": 143
                }
            },
            {
                "pos": {
                    "x": 2350,
                    "y": 330
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 2280,
                    "y": 30
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 2850,
                    "y": 260
                },
                "size": {
                    "w": 70,
                    "h": 60
                },
                "type": "life"
            },
            {
                "pos": {
                    "x": 900,
                    "y": 20
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 1250,
                    "y": 30
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 1680,
                    "y": 60
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 120,
                    "y": 150
                },
                "size": {
                    "w": 50,
                    "h": 50
                },
                "type": "power"
            },
        ],
        "enemies": [{
                "pos": {
                    "x": 1200,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 4
            },
            {
                "pos": {
                    "x": 900,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 2
            },
            {
                "pos": {
                    "x": 1500,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 3
            },
            {
                "pos": {
                    "x": 3500,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 3
            }
        ],
        "background": "rgb (31, 38, 59)",
        "duration": 100,
        "end": 5000
    },
    {
        "scene": [{
                "pos": {
                    "x": 1000,
                    "y": 280
                },
                "size": {
                    "w": 300,
                    "h": 300
                },
                "type": "sun",
                "cssPosition": "fixed"
            },
            {
                "pos": {
                    "x": 4000,
                    "y": 2
                },
                "size": {
                    "w": 232*1.5,
                    "h": 309*1.5
                },
                "type": "chateauNeige",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 5000,
                    "y": 1
                },
                "size": {
                    "w": 200,
                    "h": 200
                },
                "type": "roiGrec",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 1500,
                    "y": 5
                },
                "size": {
                    "w": 752*1.4,
                    "h": 332*1.4
                },
                "type": "montagneNeige",
                "cssPosition": "absolute"
            },
            {
                "pos": {
                    "x": 100,
                    "y": 450
                },
                "size": {
                    "w": 317,
                    "h": 41
                },
                "type": "nuage2",
                "cssPosition": "fixed"
            },
            {
                "pos": {
                    "x": 650,
                    "y": 550
                },
                "size": {
                    "w": 317,
                    "h": 41
                },
                "type": "nuage",
                "cssPosition": "fixed"
            },
            {
                "pos": {
                    "x": 10,
                    "y": 5
                },
                "size": {
                    "w": 521/1.5,
                    "h": 479/1.5
                },
                "type": "maisonNeige",
                "cssPosition": "absolute"
            },
        ],
        "obstacles": [{
                "pos": {
                    "x": 1,
                    "y": 0
                },
                "type": "groundNeige",
                "size": {
                    "w": 750,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 1280,
                    "y": 0
                },
                "type": "groundNeige",
                "size": {
                    "w": 1500,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 3500,
                    "y": 0
                },
                "type": "groundNeige",
                "size": {
                    "w": 2000,
                    "h": 30
                }
            },
            {
                "pos": {
                    "x": 500,
                    "y": 360
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 850,
                    "y": 170
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 1600,
                    "y": 160
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 2050,
                    "y": 110
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 2700,
                    "y": 140
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 3100,
                    "y": 140
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 3500,
                    "y": 280
                },
                "type": "platformNeige",
                "size": {
                    "w": 483/2,
                    "h": 226/2
                }
            },
            {
                "pos": {
                    "x": 580,
                    "y": 10
                },
                "type": "bouleNeige",
                "size": {
                    "w": 340/2,
                    "h": 193/2
                }
            },
            {
                "pos": {
                    "x": 1350,
                    "y": 10
                },
                "type": "bouleNeige",
                "size": {
                    "w": 340/2,
                    "h": 193/2
                }
            },
            {
                "pos": {
                    "x": 2400,
                    "y": 10
                },
                "type": "bouleNeige",
                "size": {
                    "w": 340/2,
                    "h": 193/2
                }
            },
            {
                "pos": {
                    "x": 3950,
                    "y": 10
                },
                "type": "bouleNeige",
                "size": {
                    "w": 340/2,
                    "h": 193/2
                }
            },
            {
                "pos": {
                    "x": 4500,
                    "y": 10
                },
                "type": "bouleNeige",
                "size": {
                    "w": 340/2,
                    "h": 193/2
                }
            },
            {
                "pos": {
                    "x": 500,
                    "y": 480
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 590,
                    "y": 510
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 2350,
                    "y": 350
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 2280,
                    "y": 30
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 3000,
                    "y": 300
                },
                "size": {
                    "w": 70,
                    "h": 60
                },
                "type": "life"
            },
            {
                "pos": {
                    "x": 1600,
                    "y": 20
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 1850,
                    "y": 30
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 2080,
                    "y": 60
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 3600,
                    "y": 400
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 4350,
                    "y": 60
                },
                "size": {
                    "w": 50,
                    "h": 60
                },
                "type": "coin"
            },
            {
                "pos": {
                    "x": 1500,
                    "y": 350
                },
                "size": {
                    "w": 50,
                    "h": 50
                },
                "type": "power"
            },
        ],
        "enemies": [{
                "pos": {
                    "x": 1800,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 4
            },
            {
                "pos": {
                    "x": 1500,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 3
            },
            {
                "pos": {
                    "x": 2000,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 5
            },
            {
                "pos": {
                    "x": 4000,
                    "y": 500
                },
                "mobile": true,
                "speedUp": 3
            }
        ],
        "background": "rgb(210, 230, 150)",
        "duration": 50,
        "end": 5000
    }
]