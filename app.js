//插件-效率-s
const FACTORY_TICK = 'FACTORY_TICK';
const FACTORY_COMPONENTS_CHANGED = 'FACTORY_COMPONENTS_CHANGED';
const REVERSE_EFFICIENCIES = [
    'sorterVertical',
    'sorterHorizontal',
    'garbageCollector',
];
const PLUGIN = {

}
const colors = [
    "#FF0000",
    "#FF8000",
    "#FFC000",
    "#FFFF00",
    "#C0FF00",
    "#00FF00",
];
class EfficiencyLayer {
    constructor(imageMap, factory, meta) {
        this.imageMap = imageMap;
        this.factory = factory;
        this.game = factory.getGame();
        this.tileSize = meta.tileSize;
        this.tilesX = factory.getMeta().tilesX;
        this.tilesY = factory.getMeta().tilesY;
        this.canvas = null;
        this.cache = [];
    }

    getCanvas() {
        return this.canvas;
    }

    display(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.width = this.tilesX * this.tileSize;
        this.canvas.height = this.tilesY * this.tileSize;
        this.canvas.style.pointerEvents = 'none';
        container.append(this.canvas);

        this.buildCache();
        this.redraw();

        this.factory.getEventManager().addListener("LayerEfficiency", FACTORY_TICK, () => {
            if (this.game.getTicker().getIsFocused()) {
                this.redraw();
            }
        });
        this.factory.getEventManager().addListener("LayerEfficiency", FACTORY_COMPONENTS_CHANGED, () => {
            this.buildCache();
            this.clear();
            this.redraw();
        });
    }

    buildCache() {
        this.cache = this.factory.getTiles()
            .filter(tile => tile.isMainComponentContainer())
            .map(tile => {
                return {
                    last: -1,
                    component: tile.getComponent()
                };
            });
    }

    clear() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    redraw() {
        const context = this.canvas.getContext('2d');
        this.cache.map(item => {
            const { last, component } = item;
            const data = component.getDescriptionData();
            const effectiveness = data.effectivenessStr;
            if (effectiveness === undefined) return;
            const efficiency = parseInt(effectiveness);
            if (isNaN(efficiency)) return;
            if (last == efficiency) return;
            item.last = efficiency;
            this.drawEfficiency(context, component, efficiency);
        });
    }

    drawEfficiency(context, component, efficiency) {
        const tile = component.getMainTile();
        const meta = component.getMeta();

        const reverse = REVERSE_EFFICIENCIES.indexOf(meta.id) !== -1;
        if (reverse) efficiency = 100 - efficiency;

        const size = this.tileSize;
        const iconSize = (size / 6);
        const x = tile.getX() * size + (iconSize * 1.5);
        const y = (tile.getY() + meta.height) * size - (iconSize * 1.5);

        context.fillStyle = colors[((colors.length - 1) * (efficiency / 100)).toFixed()];
        context.beginPath();
        context.arc(x, y, iconSize, 0, 2 * Math.PI);
        context.fill();
    }
}
//插件-效率-e
//插件-移动-s
function clamp(v, a, b) {
    return Math.min(Math.max(v, a), b);
}
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEPS = 25;
const ZOOM_LOG_MIN = Math.log(ZOOM_MIN);
const ZOOM_LOG_MAX = Math.log(ZOOM_MAX);
const ZOOM_LOG_STEP = (ZOOM_LOG_MAX - ZOOM_LOG_MIN) / ZOOM_STEPS;
const zoomAt = l => Math.pow(Math.E, ZOOM_LOG_MIN + ZOOM_LOG_STEP * (ZOOM_STEPS - l));

const FACTORY_MOUSE_DOWN = 'FACTORY_MOUSE_DOWN';
const FACTORY_MOUSE_UP = 'FACTORY_MOUSE_UP';
const FACTORY_MOUSE_MOVE = 'FACTORY_MOUSE_MOVE';
const FACTORY_MOUSE_OUT = 'FACTORY_MOUSE_OUT';
const FACTORY_SCROLL_END = 'FACTORY_SCROLL_END';
const FACTORY_SCROLL_START = 'FACTORY_SCROLL_START';
const COMPONENT_META_SELECTED = 'COMPONENT_META_SELECTED';

function constrainTo(point, coords) {
    return {
        top: clamp(coords.top, point.top - coords.height, point.top),
        left: clamp(coords.left, point.left - coords.width, point.left),
    };
}
//插件-移动-e
//插件-时间估计-s
function formatTime(seconds) {
    if (isNaN(seconds) || seconds === Infinity) {
        return '';
    }
    if (seconds < 0) {
        return '-';
    }
    const secs = Math.floor(seconds);
    if (secs < 60) {
        return `<span class='te-secs'>${secs}s</span>`;
    }
    const mins = Math.floor(secs / 60);
    if (mins < 60) {
        return `<span class='te-mins'>${mins}m ${secs % 60}s</span>`;
    }
    const hours = Math.floor(mins / 60);
    if (hours < 24) {
        return `<span class='te-hours'>${hours}h ${mins % 60}m</span>`;
    }
    const days = Math.floor(hours / 24);
    if (days < 365) {
        return `<span class='te-days'>${days}d ${hours % 24}h</span>`;
    }
    const years = Math.floor(days / 365);
    if (years < 100) {
        return `<span class='te-years'>${years}y ${days % 365}d</span>`;
    }
    return `<span class='te-years'>${years}y</span>`;
}
//插件-时间估计-e
//插件-键盘-s
const shortcuts = {
    69: { performAction: function () { Click("transportLine"); } },                       // e 传送带
    70: { performAction: function () { Toggle("playNormalButton", "playFastButton"); } }, // f 加速
    82: { performAction: function () { Toggle("playButton", "stopButton"); } }            // r 暂停
};

function Click(element) {
    $('[data-id="' + element + '"]').click();
}

function Toggle(element1, element2) {
    if (document.getElementById(element2).style.display === 'none') {
        document.getElementById(element1).click();
    } else {
        document.getElementById(element2).click();
    }
}
//插件-后台-s
const START_BACKGROUND_MODE = 'START_BACKGROUND_MODE';
const STOP_BACKGROUND_MODE = 'STOP_BACKGROUND_MODE';
const BACKGROUND_MODE_STARTED = 'BACKGROUND_MODE_STARTED';
const BACKGROUND_MODE_STOPPED = 'BACKGROUND_MODE_STOPPED';
//插件-后台-e

function arrayToHumanStr(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) n > 0 && (n == e.length - 1 ? t += "和" : t += ", "),
        t += e[n];
    return t
}

function dateToStr(e, t) {
    if (!e) return "";
    var n = e.getFullYear(),
        r = e.getMonth() + 1,
        i = e.getDate(),
        s = e.getHours(),
        o = e.getMinutes(),
        u = e.getSeconds();
    return t && (n = e.getUTCFullYear(), r = e.getUTCMonth() + 1, i = e.getUTCDate(), s = e.getUTCHours(), o = e.getUTCMinutes(), u = e.getUTCSeconds()),
        r = (r < 10 ? "0" : "") + r,
        i = (i < 10 ? "0" : "") + i,
        s = (s < 10 ? "0" : "") + s,
        o = (o < 10 ? "0" : "") + o,
        u = (u < 10 ? "0" : "") + u,
        n + "." + r + "." + i + " " + s + ":" + o + ":" + u
}

var productsE = 3,
    products = {
        timeTravelTicketValue: productsE,
        layout: {
            specials: ["researchproduction", "researchproduction2", "extraticks", "extraprofit"],
            bonusTicks: ["bonusticks1", "bonusticks2", "bonusticks3", "bonusticks4", "bonusticks5"],
            timeTravelTickets: ["timetravel1", "timetravel2", "timetravel3", "timetravel4", "timetravel5"]
        },
        items: [{
            id: "bonusticks1",
            idNum: 1,
            name: "80 000滴答奖励",
            description: "更快到达目的地",
            consumable: true,
            strategy: {
                type: "bonusTicks",
                amount: 8e4
            },
            priceStr: {
                local: "1u",
                web: "$2.99"
            }
        },
        {
            id: "bonusticks2",
            idNum: 2,
            name: "240 000滴答奖励",
            description: "+50%增量",
            consumable: true,
            strategy: {
                type: "bonusTicks",
                amount: 24e4
            },
            priceStr: {
                local: "2u",
                web: "$5.99"
            }
        },
        {
            id: "bonusticks3",
            idNum: 3,
            name: "800 000滴答奖励",
            description: "+200%增量",
            consumable: true,
            strategy: {
                type: "bonusTicks",
                amount: 8e5
            },
            priceStr: {
                local: "3u",
                web: "$9.99"
            }
        },
        {
            id: "bonusticks4",
            idNum: 4,
            name: "2 400 000滴答奖励",
            description: "+350%增量",
            consumable: true,
            strategy: {
                type: "bonusTicks",
                amount: 24e5
            },
            priceStr: {
                local: "4u",
                web: "$19.99"
            }
        },
        {
            id: "bonusticks5",
            idNum: 5,
            name: "12 000 000滴答奖励",
            description: "+650%增量",
            consumable: true,
            strategy: {
                type: "bonusTicks",
                amount: 12e6
            },
            priceStr: {
                local: "5u",
                web: "$59.99"
            }
        },
        {
            id: "bonusticks6",
            idNum: 6,
            name: "40 000 000滴答奖励",
            description: "+1145%增量",
            consumable: true,
            strategy: {
                type: "bonusTicks",
                amount: 4e7
            },
            priceStr: {
                local: "6u",
                web: "$119.99"
            }
        },
        {
            id: "timetravel1",
            idNum: 7,
            name: "1滴答券(" + productsE + "小时)",
            description: "哇,真的?",
            consumable: true,
            strategy: {
                type: "timeTravelTickets",
                amount: 1
            },
            priceStr: {
                local: "1u",
                web: "$2.99"
            }
        },
        {
            id: "timetravel2",
            idNum: 8,
            name: "3滴答券(3x" + productsE + "小时)",
            description: "50%折扣!",
            consumable: true,
            strategy: {
                type: "timeTravelTickets",
                amount: 3
            },
            priceStr: {
                local: "2u",
                web: "$5.99"
            }
        },
        {
            id: "timetravel3",
            idNum: 9,
            name: "8滴答券(8x" + productsE + "小时)",
            description: "140%折扣!",
            consumable: true,
            strategy: {
                type: "timeTravelTickets",
                amount: 8
            },
            priceStr: {
                local: "3u",
                web: "$9.99"
            }
        },
        {
            id: "timetravel4",
            idNum: 10,
            name: "25滴答券(25x" + productsE + "小时)",
            description: "270%折扣!",
            consumable: true,
            strategy: {
                type: "timeTravelTickets",
                amount: 25
            },
            priceStr: {
                local: "4u",
                web: "$19.99"
            }
        },
        {
            id: "timetravel5",
            idNum: 11,
            name: "100滴答券(100x" + productsE + "小时)",
            description: "400%折扣!",
            consumable: true,
            strategy: {
                type: "timeTravelTickets",
                amount: 100
            },
            priceStr: {
                local: "5u",
                web: "$59.99"
            }
        },
        {
            id: "timetravel6",
            idNum: 12,
            name: "300滴答券(300x" + productsE + "小时)",
            description: "650%折扣!",
            consumable: true,
            strategy: {
                type: "timeTravelTickets",
                amount: 300
            },
            priceStr: {
                local: "6u",
                web: "$119.99"
            }
        },
        {
            id: "researchproduction",
            idNum: 13,
            name: "进化大脑",
            description: "3x 研究点数产出",
            consumable: false,
            strategy: {
                type: "researchProductionBonus",
                bonus: 3
            },
            priceStr: {
                local: "6u",
                web: "$9.99"
            }
        },
        {
            id: "researchproduction2",
            idNum: 14,
            name: "外星大脑",
            description: "4x 研究点数产出",
            consumable: false,
            requiresProduct: "researchproduction",
            strategy: {
                type: "researchProductionBonus",
                bonus: 4
            },
            priceStr: {
                local: "6u",
                web: "$9.99"
            }
        },
        {
            id: "extraticks",
            idNum: 15,
            name: "慢性助推器",
            description: "+8额外滴答每秒",
            consumable: false,
            strategy: {
                type: "extraTicks",
                bonus: 8
            },
            priceStr: {
                local: "7u",
                web: "$19.99"
            }
        },
        {
            id: "extraprofit",
            idNum: 16,
            name: "逃税",
            description: "3x利润!",
            consumable: false,
            requiresProduct: "extraticks",
            strategy: {
                type: "extraProfit",
                bonus: 3
            },
            priceStr: {
                local: "7u",
                web: "$19.99"
            }
        },
        {
            id: "starter1",
            idNum: 18,
            name: "小礼包",
            description: "8时间旅行滴答券 + 300 000滴答奖励 &nbsp; &nbsp; &nbsp;",
            consumable: true,
            special: true,
            strategy: {
                type: "starter",
                timeTravelTickets: 8,
                bonusTicks: 3e5
            },
            priceStr: {
                local: "3u",
                web: "$9.99"
            }
        },
        {
            id: "starter2",
            idNum: 17,
            name: "趣味包",
            description: "3时间旅行滴答券 + 60 000滴答奖励 &nbsp; &nbsp; &nbsp;",
            consumable: true,
            special: true,
            strategy: {
                type: "starter",
                timeTravelTickets: 3,
                bonusTicks: 6e4
            },
            priceStr: {
                local: "2u",
                web: "$5.99"
            }
        }
        ]
    }

function getSumOfProduction(e) {
    var t = 0;
    for (var n in e) n != "waste" && !e[n].bonus && (t += e[n].amount);
    return t
}
class ProductionCostCalculator {
    constructor(componentsById, sourceBuildings) {
        this.componentsById = componentsById
        this.sourceBuildings = sourceBuildings
        this.strategies = {
            buyer: {
                selfCost(t, n) {
                    var r = t.strategy.interval * t.runningCostPerTick,
                        i = getSumOfProduction(t.strategy.purchaseResources);
                    return r / i + t.strategy.purchaseResources[n].price;
                },
                inputCost(e, t) {
                    return 1;
                }
            },
            converter: {
                selfCost(t) {
                    var n = t.strategy.interval * t.runningCostPerTick,
                        r = getSumOfProduction(t.strategy.production);
                    return n / r;
                },
                inputCost(t, n) {
                    var r = getSumOfProduction(t.strategy.production);
                    if (!t.strategy.inputResources[n])
                        throw new Error(t.id + " can't handle resources: " + n);
                    return t.strategy.inputResources[n].perOutputResource / r;
                }
            },
            seller: {
                selfCost(t) {
                    var n = t.strategy.interval * t.runningCostPerTick,
                        r = getSumOfProduction(t.strategy.resources);
                    return n / r;
                },
                inputCost(e, t) {
                    return 1;
                }
            }
        };
    }
    calculateCostFor(e, t, n) {
        var r = this.componentsById[e],
            i = this.sourceBuildings[e] || [];
        var s = this.strategies[r.strategy.type],
            o = 0,
            u = s.selfCost(r, t);
        if (r.strategy.type == "seller") {
            o += this.calculateCostFor(i[t], t, n)
            r.strategy.resources[t].bonus && (u = 0);
        } else {
            for (var a in i) {
                o += this.calculateCostFor(i[a], a, n) * s.inputCost(r, a);
            }
        }

        var f = u + o;
        n[e + "-" + t] = {
            self: u,
            input: o,
            total: f
        }
        return f;
    }
}
function ForComponents() {
    var t = {};
    for (var n in components.components) {
        var r = components.components[n];
        t[r.id] = r
    }
    var s = new ProductionCostCalculator(t, components.productionTree);
    for (var n in components.components) {
        var r = components.components[n];
        if (r.strategy.type == "seller")
            for (var o in r.strategy.resources) {
                var u = {},
                    a = s.calculateCostFor(r.id, o, u);
                a > 0 && (r.strategy.resources[o].sellPrice = Math.ceil(a))
            }
    }
    var f = 20;
    for (var n in components.components) {
        var r = components.components[n];
        if (r.strategy.type == "buyer")
            for (var n in r.strategy.purchaseResources) r.strategy.purchaseResources[n].max = r.strategy.purchaseResources[n].amount * f;
        else if (r.strategy.type == "converter") {
            for (var n in r.strategy.inputResources) r.strategy.inputResources[n].max = r.strategy.inputResources[n].perOutputResource * f;
            for (var n in r.strategy.production) r.strategy.production[n].max = r.strategy.production[n].amount * f
        } else if (r.strategy.type == "seller")
            for (var n in r.strategy.resources) r.strategy.resources[n].max = r.strategy.resources[n].amount * f
    }
}
function pow1e3(e, t) {
    return e * Math.pow(1e3, t)
}
const components = {
    selection: [
        ["noComponent", "transportLine", "garbageCollector", "sorterVertical", "sorterHorizontal"],
        ["ironBuyer", "ironFoundry", "ironSeller", null, "coalBuyer", "steelFoundry", "steelSeller"],
        ["oilBuyer", "gasBuyer", "plasticMaker", "plasticSeller", "siliconBuyer", "electronicsMaker", "electronicsSeller"],
        ["explosivesBuyer", "bulletMaker", "gunMaker", "gunSeller"],
        ["aluminiumBuyer", "engineMaker", "engineSeller"],
        ["tankHullMaker", "tankTurretMaker", "tankAssembler", "tankSeller", "dieselRefinery"],
        ["jetFuelRefinery", "rocketHullMaker", "rocketWarheadMaker", "rocketAssembler"],
        ["droneMaker", "droneControlRoom", "droneSeller"],
        ["metalsLab", "gasAndOilLab", "analystCenter", "qualityLab"],
        ["researchCenter", "researchCenter2", "researchCenter3", "researchCenter4"]
    ],
    productionTree: {
        ironFoundry: {
            ironOre: "ironBuyer"
        },
        ironSeller: {
            iron: "ironFoundry"
        },
        steelFoundry: {
            iron: "ironFoundry",
            coal: "coalBuyer"
        },
        steelSeller: {
            steel: "steelFoundry"
        },
        plasticMaker: {
            oil: "oilBuyer",
            coal: "coalBuyer",
            gas: "gasBuyer"
        },
        plasticSeller: {
            plastic: "plasticMaker"
        },
        electronicsMaker: {
            silicon: "siliconBuyer",
            plastic: "plasticMaker"
        },
        electronicsSeller: {
            electronics: "electronicsMaker"
        },
        engineMaker: {
            aluminium: "aluminiumBuyer",
            steel: "steelFoundry",
            electronics: "electronicsMaker"
        },
        engineSeller: {
            engine: "engineMaker"
        },
        bulletMaker: {
            steel: "steelFoundry",
            explosives: "explosivesBuyer"
        },
        gunMaker: {
            steel: "steelFoundry",
            bullets: "bulletMaker"
        },
        gunSeller: {
            guns: "gunMaker"
        },
        tankHullMaker: {
            steel: "steelFoundry",
            aluminium: "aluminiumBuyer",
            electronics: "electronicsMaker"
        },
        tankTurretMaker: {
            steel: "steelFoundry",
            guns: "gunMaker"
        },
        tankAssembler: {
            tankHull: "tankHullMaker",
            tankTurret: "tankTurretMaker",
            engine: "engineMaker"
        },
        tankSeller: {
            tank: "tankAssembler",
            diesel: "dieselRefinery",
            rocket: "rocketAssembler"
        },
        dieselRefinery: {
            oil: "oilBuyer"
        },
        rocketHullMaker: {
            aluminium: "aluminiumBuyer",
            engine: "engineMaker"
        },
        rocketWarheadMaker: {
            aluminium: "aluminiumBuyer",
            electronics: "electronicsMaker",
            explosives: "explosivesBuyer"
        },
        rocketAssembler: {
            warhead: "rocketWarheadMaker",
            rocketHull: "rocketHullMaker",
            jetFuel: "jetFuelRefinery"
        },
        droneMaker: {
            aluminium: "aluminiumBuyer",
            plastic: "plasticMaker",
            electronics: "electronicsMaker",
            engine: "engineMaker",
            guns: "gunMaker"
        },
        droneControlRoom: {
            steel: "steelFoundry",
            electronics: "electronicsMaker"
        },
        droneSeller: {
            drone: "droneMaker",
            droneControlRoom: "droneControlRoom",
            jetFuel: "jetFuelRefinery",
            rocket: "rocketAssembler"
        },
        jetFuelRefinery: {
            gas: "gasBuyer"
        }
    },
    components: [{
        id: "transportLine",
        idNum: 1,
        name: "传送带",
        width: 1,
        height: 1,
        spriteX: 0,
        spriteY: 0,
        iconX: 1,
        iconY: 0,
        drawStrategy: "track",
        buildByDragging: true,
        canBuildToPartial: true,
        runningCostPerTick: 0,
        price: 10,
        priceRefund: 1,
        strategy: {
            type: "transport",
            queueSize: 2
        }
    },
    {
        id: "garbageCollector",
        idNum: 25,
        name: "废物",
        description: "接收任何物品并将其作为废物丢弃.",
        width: 1,
        height: 1,
        spriteX: 3,
        spriteY: 2,
        iconX: 2,
        iconY: 3,
        runningCostPerTick: 0,
        requiresResearch: "metalsLab",
        price: 2500,
        priceRefund: .5,
        strategy: {
            type: "garbage",
            max: 15,
            removeAmount: 5,
            interval: 10
        }
    },
    {
        id: "sorterVertical",
        idNum: 36,
        name: "分选机",
        width: 1,
        height: 3,
        spriteX: 6,
        spriteY: 8,
        iconX: 7,
        iconY: 3,
        runningCostPerTick: 2,
        requiresResearch: "sorter",
        price: 4e5,
        priceRefund: 1,
        allowedInputs: {
            "0:1:left": true,
            "0:1:right": true
        },
        allowedOutputs: {
            "0:0": true,
            "0:1": true,
            "0:2": true
        },
        strategy: {
            type: "sorter",
            interval: 1
        }
    },
    {
        id: "sorterHorizontal",
        idNum: 37,
        name: "分选机",
        width: 3,
        height: 1,
        spriteX: 3,
        spriteY: 8,
        iconX: 6,
        iconY: 3,
        runningCostPerTick: 2,
        requiresResearch: "sorter",
        price: 4e5,
        priceRefund: 1,
        allowedInputs: {
            "1:0:top": true,
            "1:0:bottom": true
        },
        allowedOutputs: {
            "0:0": true,
            "1:0": true,
            "2:0": true
        },
        strategy: {
            type: "sorter",
            interval: 1
        }
    },
    {
        id: "ironBuyer",
        idNum: 2,
        name: "铁矿石购买机",
        width: 2,
        height: 2,
        spriteX: 4,
        spriteY: 0,
        iconX: 2,
        iconY: 0,
        runningCostPerTick: 0,
        price: 50,
        priceRefund: 1,
        strategy: {
            type: "buyer",
            purchaseResources: {
                ironOre: {
                    price: 0,
                    amount: 1
                }
            },
            outputResourcesOrder: ["ironOre"],
            interval: 10
        }
    },
    {
        id: "ironFoundry",
        idNum: 3,
        name: "铸铁厂",
        width: 4,
        height: 2,
        spriteX: 0,
        spriteY: 0,
        iconX: 3,
        iconY: 0,
        runningCostPerTick: 0,
        price: 150,
        priceRefund: 1,
        requiresResearch: null,
        strategy: {
            type: "converter",
            inputResources: {
                ironOre: {
                    perOutputResource: 2
                }
            },
            production: {
                iron: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["iron"],
            interval: 10
        }
    },
    {
        id: "ironSeller",
        idNum: 4,
        name: "铁售卖机",
        width: 1,
        height: 2,
        spriteX: 6,
        spriteY: 0,
        iconX: 4,
        iconY: 0,
        runningCostPerTick: 0,
        price: 100,
        priceRefund: 1,
        requiresResearch: null,
        strategy: {
            type: "seller",
            resources: {
                iron: {
                    amount: 2,
                    sellPrice: 2.5,
                    sellMargin: 0
                }
            },
            interval: 10
        }
    },
    {
        id: "coalBuyer",
        idNum: 5,
        name: "煤购买机",
        width: 2,
        height: 1,
        spriteX: 0,
        spriteY: 2,
        iconX: 5,
        iconY: 0,
        runningCostPerTick: 1,
        price: 1e3,
        priceRefund: 1,
        requiresResearch: "steelComponents",
        strategy: {
            type: "buyer",
            purchaseResources: {
                coal: {
                    price: 5,
                    amount: 2
                }
            },
            outputResourcesOrder: ["coal"],
            interval: 10
        }
    },
    {
        id: "steelFoundry",
        idNum: 6,
        name: "铸钢厂",
        width: 3,
        height: 3,
        spriteX: 0,
        spriteY: 3,
        iconX: 6,
        iconY: 0,
        runningCostPerTick: 4,
        price: 4e3,
        priceRefund: 1,
        requiresResearch: "steelComponents",
        strategy: {
            type: "converter",
            inputResources: {
                iron: {
                    perOutputResource: 4
                },
                coal: {
                    perOutputResource: 4
                }
            },
            production: {
                steel: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["steel"],
            interval: 10
        }
    },
    {
        id: "steelSeller",
        idNum: 7,
        name: "钢售卖机",
        width: 2,
        height: 2,
        spriteX: 3,
        spriteY: 3,
        iconX: 7,
        iconY: 0,
        runningCostPerTick: 1,
        price: 1500,
        priceRefund: 1,
        requiresResearch: "steelComponents",
        strategy: {
            type: "seller",
            resources: {
                steel: {
                    amount: 2,
                    sellPrice: 0,
                    sellMargin: .6
                }
            },
            interval: 10
        }
    },
    {
        id: "oilBuyer",
        idNum: 8,
        name: "原油购买机",
        width: 1,
        height: 3,
        spriteX: 0,
        spriteY: 6,
        iconX: 8,
        iconY: 0,
        runningCostPerTick: 8,
        price: 4e4,
        priceRefund: 1,
        requiresResearch: "plasticComponents",
        strategy: {
            type: "buyer",
            purchaseResources: {
                oil: {
                    price: 200,
                    amount: 1
                }
            },
            outputResourcesOrder: ["oil"],
            interval: 10
        }
    },
    {
        id: "gasBuyer",
        idNum: 30,
        name: "燃气购买机",
        width: 2,
        height: 1,
        spriteX: 6,
        spriteY: 15,
        iconX: 0,
        iconY: 3,
        runningCostPerTick: 6,
        price: 6e4,
        priceRefund: 1,
        requiresResearch: "plasticComponents",
        strategy: {
            type: "buyer",
            purchaseResources: {
                gas: {
                    price: 80,
                    amount: 1
                }
            },
            outputResourcesOrder: ["gas"],
            interval: 10
        }
    },
    {
        id: "plasticMaker",
        idNum: 9,
        name: "塑料制造机",
        width: 2,
        height: 3,
        spriteX: 1,
        spriteY: 6,
        iconX: 9,
        iconY: 0,
        runningCostPerTick: 20,
        price: 24e4,
        priceRefund: 1,
        requiresResearch: "plasticComponents",
        strategy: {
            type: "converter",
            inputResources: {
                oil: {
                    perOutputResource: 4
                },
                coal: {
                    perOutputResource: 4
                },
                gas: {
                    perOutputResource: 2
                }
            },
            production: {
                plastic: {
                    amount: 1
                },
                waste: {
                    amount: 1
                }
            },
            productionRemoveResearch: {
                waste: "cleanPlastic"
            },
            outputResourcesOrder: ["plastic", "waste"],
            interval: 10
        }
    },
    {
        id: "plasticSeller",
        idNum: 10,
        name: "塑料售卖机",
        width: 2,
        height: 2,
        spriteX: 3,
        spriteY: 6,
        iconX: 0,
        iconY: 1,
        runningCostPerTick: 12,
        price: 18e4,
        priceRefund: 1,
        requiresResearch: "plasticComponents",
        strategy: {
            type: "seller",
            resources: {
                plastic: {
                    amount: 1,
                    sellPrice: 0,
                    sellMargin: .6
                }
            },
            interval: 10
        }
    },
    {
        id: "siliconBuyer",
        idNum: 11,
        name: "硅购买机",
        width: 1,
        height: 2,
        spriteX: 0,
        spriteY: 9,
        iconX: 1,
        iconY: 1,
        runningCostPerTick: 120,
        price: pow1e3(50, 2),
        priceRefund: 1,
        requiresResearch: "electronicsComponents",
        strategy: {
            type: "buyer",
            purchaseResources: {
                silicon: {
                    price: 400,
                    amount: 1
                }
            },
            outputResourcesOrder: ["silicon"],
            interval: 10
        }
    },
    {
        id: "electronicsMaker",
        idNum: 12,
        name: "电子元件制造机",
        width: 2,
        height: 2,
        spriteX: 1,
        spriteY: 9,
        iconX: 2,
        iconY: 1,
        runningCostPerTick: 300,
        price: pow1e3(200, 2),
        priceRefund: 1,
        requiresResearch: "electronicsComponents",
        strategy: {
            type: "converter",
            inputResources: {
                silicon: {
                    perOutputResource: 2
                },
                plastic: {
                    perOutputResource: 4
                }
            },
            production: {
                electronics: {
                    amount: 1
                },
                waste: {
                    amount: 1
                }
            },
            productionRemoveResearch: {
                waste: "cleanElectronics"
            },
            outputResourcesOrder: ["electronics", "waste"],
            interval: 10
        }
    },
    {
        id: "electronicsSeller",
        idNum: 13,
        name: "电子元件售卖机",
        width: 2,
        height: 2,
        spriteX: 3,
        spriteY: 9,
        iconX: 3,
        iconY: 1,
        runningCostPerTick: 90,
        price: pow1e3(80, 2),
        priceRefund: 1,
        requiresResearch: "electronicsComponents",
        strategy: {
            type: "seller",
            resources: {
                electronics: {
                    amount: 1,
                    sellPrice: 0,
                    sellMargin: 2.1
                }
            },
            interval: 10
        }
    },
    {
        id: "explosivesBuyer",
        idNum: 17,
        name: "爆炸物购买机",
        width: 2,
        height: 1,
        spriteX: 0,
        spriteY: 13,
        iconX: 7,
        iconY: 1,
        runningCostPerTick: 1900,
        price: pow1e3(500, 2),
        priceRefund: 1,
        requiresResearch: "gunComponents",
        strategy: {
            type: "buyer",
            purchaseResources: {
                explosives: {
                    price: 900,
                    amount: 1
                }
            },
            outputResourcesOrder: ["explosives"],
            interval: 20
        }
    },
    {
        id: "bulletMaker",
        idNum: 18,
        name: "子弹制造机",
        width: 1,
        height: 1,
        spriteX: 2,
        spriteY: 2,
        iconX: 8,
        iconY: 1,
        runningCostPerTick: 3900,
        price: pow1e3(800, 2),
        priceRefund: 1,
        requiresResearch: "gunComponents",
        strategy: {
            type: "converter",
            inputResources: {
                steel: {
                    perOutputResource: 3
                },
                explosives: {
                    perOutputResource: 2
                }
            },
            production: {
                bullets: {
                    amount: 2
                }
            },
            outputResourcesOrder: ["bullets"],
            interval: 20
        }
    },
    {
        id: "gunMaker",
        idNum: 19,
        name: "枪械制造机",
        width: 3,
        height: 2,
        spriteX: 0,
        spriteY: 14,
        iconX: 9,
        iconY: 1,
        runningCostPerTick: 5900,
        price: pow1e3(1, 3),
        priceRefund: 1,
        requiresResearch: "gunComponents",
        strategy: {
            type: "converter",
            inputResources: {
                steel: {
                    perOutputResource: 3
                },
                bullets: {
                    perOutputResource: 2
                }
            },
            production: {
                guns: {
                    amount: 2
                }
            },
            outputResourcesOrder: ["guns"],
            interval: 20
        }
    },
    {
        id: "gunSeller",
        idNum: 20,
        name: "枪械售卖机",
        width: 2,
        height: 2,
        spriteX: 3,
        spriteY: 14,
        iconX: 0,
        iconY: 2,
        runningCostPerTick: 1100,
        price: pow1e3(400, 2),
        priceRefund: 1,
        requiresResearch: "gunComponents",
        strategy: {
            type: "seller",
            resources: {
                guns: {
                    amount: 2,
                    sellPrice: 0,
                    sellMargin: 2.1
                }
            },
            interval: 20
        }
    },
    {
        id: "aluminiumBuyer",
        idNum: 14,
        name: "铝购买机",
        width: 2,
        height: 2,
        spriteX: 0,
        spriteY: 11,
        iconX: 4,
        iconY: 1,
        runningCostPerTick: 48e3,
        price: pow1e3(3, 3),
        priceRefund: 1,
        requiresResearch: "engineComponents",
        strategy: {
            type: "buyer",
            purchaseResources: {
                aluminium: {
                    price: 1400,
                    amount: 1
                }
            },
            outputResourcesOrder: ["aluminium"],
            interval: 10
        }
    },
    {
        id: "engineMaker",
        idNum: 15,
        name: "引擎制造机",
        width: 4,
        height: 3,
        spriteX: 2,
        spriteY: 11,
        iconX: 5,
        iconY: 1,
        runningCostPerTick: 12e4,
        price: pow1e3(32, 3),
        priceRefund: 1,
        requiresResearch: "engineComponents",
        strategy: {
            type: "converter",
            inputResources: {
                aluminium: {
                    perOutputResource: 4
                },
                steel: {
                    perOutputResource: 6
                },
                electronics: {
                    perOutputResource: 3
                }
            },
            production: {
                engine: {
                    amount: 1
                },
                waste: {
                    amount: 1
                }
            },
            productionRemoveResearch: {
                waste: "cleanEngines"
            },
            outputResourcesOrder: ["engine", "waste"],
            interval: 10
        }
    },
    {
        id: "engineSeller",
        idNum: 16,
        name: "引擎售卖机",
        width: 2,
        height: 2,
        spriteX: 6,
        spriteY: 11,
        iconX: 6,
        iconY: 1,
        runningCostPerTick: 8e4,
        price: pow1e3(8, 3),
        priceRefund: 1,
        requiresResearch: "engineComponents",
        strategy: {
            type: "seller",
            resources: {
                engine: {
                    amount: 1,
                    sellPrice: 0,
                    sellMargin: 2.1
                }
            },
            interval: 10
        }
    },
    {
        id: "tankHullMaker",
        idNum: 21,
        name: "坦克舱体制造机",
        width: 5,
        height: 3,
        spriteX: 0,
        spriteY: 16,
        iconX: 1,
        iconY: 2,
        runningCostPerTick: 16e5,
        price: pow1e3(400, 3),
        priceRefund: 1,
        requiresResearch: "tankComponents",
        strategy: {
            type: "converter",
            inputResources: {
                electronics: {
                    perOutputResource: 3
                },
                steel: {
                    perOutputResource: 6
                },
                aluminium: {
                    perOutputResource: 2
                }
            },
            production: {
                tankHull: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["tankHull"],
            interval: 10
        }
    },
    {
        id: "tankTurretMaker",
        idNum: 22,
        name: "坦克机枪制造机",
        width: 3,
        height: 2,
        spriteX: 5,
        spriteY: 16,
        iconX: 2,
        iconY: 2,
        runningCostPerTick: 2e6,
        price: pow1e3(800, 3),
        priceRefund: 1,
        requiresResearch: "tankComponents",
        strategy: {
            type: "converter",
            inputResources: {
                guns: {
                    perOutputResource: 4
                },
                steel: {
                    perOutputResource: 6
                }
            },
            production: {
                tankTurret: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["tankTurret"],
            interval: 10
        }
    },
    {
        id: "tankAssembler",
        idNum: 23,
        name: "坦克装配线",
        width: 2,
        height: 4,
        spriteX: 8,
        spriteY: 16,
        iconX: 3,
        iconY: 2,
        runningCostPerTick: 18e5,
        price: pow1e3(700, 3),
        priceRefund: 1,
        requiresResearch: "tankComponents",
        strategy: {
            type: "converter",
            inputResources: {
                tankHull: {
                    perOutputResource: 1
                },
                tankTurret: {
                    perOutputResource: 1
                },
                engine: {
                    perOutputResource: 1
                }
            },
            production: {
                tank: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["tank"],
            interval: 10
        }
    },
    {
        id: "tankSeller",
        idNum: 26,
        name: "坦克售卖机",
        width: 2,
        height: 2,
        spriteX: 5,
        spriteY: 18,
        iconX: 4,
        iconY: 2,
        runningCostPerTick: 24e5,
        price: pow1e3(500, 3),
        priceRefund: 1,
        requiresResearch: "tankComponents",
        strategy: {
            type: "seller",
            resources: {
                tank: {
                    amount: 1,
                    sellPrice: 0,
                    sellMargin: 2.1
                },
                diesel: {
                    amount: 8,
                    sellPrice: 0,
                    sellMargin: 2.6,
                    bonus: true,
                    requiresResearch: "dieselRefinery"
                },
                rocket: {
                    amount: 1,
                    sellPrice: 0,
                    sellMargin: 2.6,
                    bonus: true,
                    requiresResearch: "rocketComponents"
                }
            },
            interval: 10
        }
    },
    {
        id: "dieselRefinery",
        idNum: 32,
        name: "柴油精炼厂",
        width: 3,
        height: 2,
        spriteX: 5,
        spriteY: 6,
        iconX: 5,
        iconY: 2,
        runningCostPerTick: 18e6,
        price: pow1e3(15, 4),
        priceRefund: 1,
        requiresResearch: "dieselRefinery",
        strategy: {
            type: "converter",
            inputResources: {
                oil: {
                    perOutputResource: 96
                }
            },
            production: {
                diesel: {
                    amount: 16
                },
                waste: {
                    amount: 8
                }
            },
            outputResourcesOrder: ["diesel", "diesel", "waste"],
            interval: 10
        }
    },
    {
        id: "jetFuelRefinery",
        idNum: 31,
        name: "航空燃料精炼厂",
        width: 2,
        height: 2,
        spriteX: 6,
        spriteY: 13,
        iconX: 1,
        iconY: 3,
        runningCostPerTick: 1e8,
        price: pow1e3(35, 4),
        priceRefund: 1,
        requiresResearch: "rocketComponents",
        strategy: {
            type: "converter",
            inputResources: {
                gas: {
                    perOutputResource: 24
                }
            },
            production: {
                jetFuel: {
                    amount: 8
                },
                waste: {
                    amount: 4
                }
            },
            outputResourcesOrder: ["jetFuel", "jetFuel", "waste"],
            interval: 10
        }
    },
    {
        id: "rocketHullMaker",
        idNum: 27,
        name: "火箭舱体制造机",
        width: 3,
        height: 2,
        spriteX: 0,
        spriteY: 19,
        iconX: 6,
        iconY: 2,
        runningCostPerTick: 15e7,
        price: pow1e3(60, 4),
        priceRefund: 1,
        requiresResearch: "rocketComponents",
        strategy: {
            type: "converter",
            inputResources: {
                aluminium: {
                    perOutputResource: 8
                },
                engine: {
                    perOutputResource: 1
                }
            },
            production: {
                rocketHull: {
                    amount: 1,
                    max: 3
                }
            },
            outputResourcesOrder: ["rocketHull"],
            interval: 10
        }
    },
    {
        id: "rocketWarheadMaker",
        idNum: 28,
        name: "弹头制造机",
        width: 2,
        height: 3,
        spriteX: 3,
        spriteY: 19,
        iconX: 7,
        iconY: 2,
        runningCostPerTick: 12e7,
        price: pow1e3(130, 4),
        priceRefund: 1,
        requiresResearch: "rocketComponents",
        strategy: {
            type: "converter",
            inputResources: {
                aluminium: {
                    perOutputResource: 4
                },
                electronics: {
                    perOutputResource: 3
                },
                explosives: {
                    perOutputResource: 8
                }
            },
            production: {
                warhead: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["warhead"],
            interval: 10
        }
    },
    {
        id: "rocketAssembler",
        idNum: 29,
        name: "火箭装配线",
        width: 2,
        height: 2,
        spriteX: 5,
        spriteY: 20,
        iconX: 8,
        iconY: 2,
        runningCostPerTick: 19e6,
        price: pow1e3(110, 4),
        priceRefund: 1,
        requiresResearch: "rocketComponents",
        strategy: {
            type: "converter",
            inputResources: {
                rocketHull: {
                    perOutputResource: 2
                },
                warhead: {
                    perOutputResource: 2
                },
                jetFuel: {
                    perOutputResource: 8
                }
            },
            production: {
                rocket: {
                    amount: 2
                }
            },
            outputResourcesOrder: ["rocket"],
            interval: 10
        }
    },
    {
        id: "droneMaker",
        idNum: 41,
        name: "无人机制造器",
        width: 2,
        height: 6,
        spriteX: 8,
        spriteY: 9,
        iconX: 5,
        iconY: 4,
        runningCostPerTick: 1e9,
        price: pow1e3(6, 5),
        priceRefund: 1,
        requiresResearch: "droneComponents",
        strategy: {
            type: "converter",
            inputResources: {
                aluminium: {
                    perOutputResource: 64
                },
                plastic: {
                    perOutputResource: 48
                },
                electronics: {
                    perOutputResource: 24
                },
                engine: {
                    perOutputResource: 8
                },
                guns: {
                    perOutputResource: 32
                }
            },
            production: {
                drone: {
                    amount: 8
                }
            },
            outputResourcesOrder: ["drone"],
            interval: 20
        }
    },
    {
        id: "droneControlRoom",
        idNum: 42,
        name: "无人机控制室",
        width: 3,
        height: 5,
        spriteX: 10,
        spriteY: 11,
        iconX: 6,
        iconY: 4,
        runningCostPerTick: 15e8,
        price: pow1e3(6, 5),
        priceRefund: 1,
        requiresResearch: "droneComponents",
        strategy: {
            type: "converter",
            inputResources: {
                steel: {
                    perOutputResource: 96
                },
                electronics: {
                    perOutputResource: 24
                }
            },
            production: {
                droneControlRoom: {
                    amount: 4
                }
            },
            outputResourcesOrder: ["droneControlRoom"],
            interval: 20
        }
    },
    {
        id: "droneSeller",
        idNum: 43,
        name: "无人售卖机",
        width: 2,
        height: 2,
        spriteX: 10,
        spriteY: 16,
        iconX: 7,
        iconY: 4,
        runningCostPerTick: 3e9,
        price: pow1e3(4, 5),
        priceRefund: 1,
        requiresResearch: "droneComponents",
        strategy: {
            type: "seller",
            resources: {
                drone: {
                    amount: 4,
                    sellPrice: 0,
                    sellMargin: 1.9
                },
                droneControlRoom: {
                    amount: 2,
                    sellPrice: 0,
                    sellMargin: 1.9
                },
                rocket: {
                    amount: 8,
                    sellPrice: 0,
                    bonus: true,
                    sellMargin: 6
                },
                jetFuel: {
                    amount: 32,
                    sellPrice: 0,
                    bonus: true,
                    sellMargin: 3
                }
            },
            interval: 20
        }
    },
    {
        id: "researchCenter",
        idNum: 33,
        name: "研究中心",
        width: 4,
        height: 4,
        spriteX: 5,
        spriteY: 2,
        iconX: 3,
        iconY: 3,
        runningCostPerTick: 4,
        price: 1e3,
        priceRefund: 1,
        requiresResearch: "researchCenter",
        strategy: {
            type: "researchCenter",
            researchProduction: 1,
            resources: {
                report1: {
                    max: 4,
                    bonus: 2
                }
            },
            interval: 10
        }
    },
    {
        id: "metalsLab",
        idNum: 34,
        name: "金属实验室",
        width: 3,
        height: 2,
        spriteX: 7,
        spriteY: 0,
        iconX: 5,
        iconY: 3,
        runningCostPerTick: 8,
        price: 4e4,
        priceRefund: 1,
        requiresResearch: "metalsLab",
        strategy: {
            type: "lab",
            inputResources: {
                iron: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 4
                },
                steel: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 6
                },
                aluminium: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 5
                }
            },
            production: {
                report1: {
                    amount: 1,
                    max: 25
                }
            },
            outputResourcesOrder: ["report1"],
            interval: 20
        }
    },
    {
        id: "gasAndOilLab",
        idNum: 35,
        name: "燃气&原油实验室",
        width: 2,
        height: 3,
        spriteX: 8,
        spriteY: 6,
        iconX: 4,
        iconY: 3,
        runningCostPerTick: 200,
        price: 6e5,
        priceRefund: 1,
        requiresResearch: "gasAndOilLab",
        strategy: {
            type: "lab",
            inputResources: {
                gas: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 2
                },
                oil: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 3
                },
                plastic: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 10
                },
                diesel: {
                    perOutputResource: 1,
                    max: 3,
                    bonus: 8
                },
                jetFuel: {
                    perOutputResource: 1,
                    max: 3,
                    bonus: 8
                }
            },
            production: {
                report2: {
                    amount: 1,
                    max: 25
                }
            },
            outputResourcesOrder: ["report2"],
            interval: 20
        }
    },
    {
        id: "researchCenter2",
        idNum: 38,
        name: "研究中心2",
        width: 4,
        height: 4,
        spriteX: 10,
        spriteY: 0,
        iconX: 2,
        iconY: 4,
        runningCostPerTick: 200,
        price: 6e5,
        priceRefund: 1,
        requiresResearch: "gasAndOilLab",
        applyUpgradesFrom: "researchCenter",
        strategy: {
            type: "researchCenter",
            researchProduction: 4,
            resources: {
                report2: {
                    max: 4,
                    bonus: 3
                }
            },
            interval: 20
        }
    },
    {
        id: "analystCenter",
        idNum: 39,
        name: "分析中心",
        width: 3,
        height: 3,
        spriteX: 10,
        spriteY: 8,
        iconX: 4,
        iconY: 4,
        runningCostPerTick: 12e3,
        price: pow1e3(2, 3),
        priceRefund: 1,
        requiresResearch: "analystCenter",
        strategy: {
            type: "converter",
            inputResources: {
                report1: {
                    perOutputResource: 32,
                    max: 256,
                    bonus: 10
                },
                report2: {
                    perOutputResource: 32,
                    max: 256,
                    bonus: 10
                }
            },
            production: {
                report3: {
                    amount: 20,
                    max: 100
                },
                waste: {
                    amount: 20,
                    max: 100
                }
            },
            outputResourcesOrder: ["report3", "waste"],
            interval: 40
        }
    },
    {
        id: "researchCenter3",
        idNum: 40,
        name: "研究中心3",
        width: 4,
        height: 4,
        spriteX: 10,
        spriteY: 4,
        iconX: 3,
        iconY: 4,
        runningCostPerTick: 35e3,
        price: pow1e3(6, 3),
        priceRefund: 1,
        requiresResearch: "analystCenter",
        applyUpgradesFrom: "researchCenter",
        strategy: {
            type: "researchCenter",
            researchProduction: 20,
            resources: {
                report3: {
                    max: 4,
                    bonus: 16
                }
            },
            interval: 40
        }
    },
    {
        id: "qualityLab",
        idNum: 44,
        name: "质量实验室",
        width: 4,
        height: 2,
        spriteX: 12,
        spriteY: 16,
        iconX: 0,
        iconY: 4,
        runningCostPerTick: pow1e3(400, 2),
        price: pow1e3(3, 5),
        priceRefund: 1,
        requiresResearch: "qualityCenter",
        strategy: {
            type: "lab",
            inputResources: {
                tank: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 21
                },
                rocket: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 16
                },
                engine: {
                    perOutputResource: 1,
                    max: 25,
                    bonus: 10
                },
                guns: {
                    perOutputResource: 1,
                    max: 3,
                    bonus: 6
                },
                drone: {
                    perOutputResource: 1,
                    max: 3,
                    bonus: 24
                }
            },
            production: {
                report4: {
                    amount: 1,
                    max: 1e3
                }
            },
            outputResourcesOrder: ["report4"],
            interval: 5
        }
    },
    {
        id: "researchCenter4",
        idNum: 45,
        name: "研究中心4",
        width: 4,
        height: 4,
        spriteX: 10,
        spriteY: 18,
        iconX: 1,
        iconY: 4,
        runningCostPerTick: pow1e3(50, 2),
        price: pow1e3(2, 5),
        priceRefund: 1,
        requiresResearch: "qualityCenter",
        applyUpgradesFrom: "researchCenter",
        strategy: {
            type: "researchCenter",
            researchProduction: 100,
            resources: {
                report4: {
                    max: 64,
                    bonus: 100
                }
            },
            interval: 40
        }
    }
    ]
};
ForComponents()
const resources = [{
    id: "ironOre",
    idNum: 1,
    name: "铁矿石",
    nameShort: "铁矿石",
    spriteX: 0,
    spriteY: 0
},
{
    id: "iron",
    idNum: 2,
    name: "铁",
    nameShort: "铁",
    spriteX: 1,
    spriteY: 0
},
{
    id: "coal",
    idNum: 3,
    name: "煤",
    nameShort: "煤",
    spriteX: 2,
    spriteY: 0
},
{
    id: "steel",
    idNum: 4,
    name: "钢",
    nameShort: "钢",
    spriteX: 3,
    spriteY: 0
},
{
    id: "oil",
    idNum: 5,
    name: "原油",
    nameShort: "原油",
    spriteX: 4,
    spriteY: 0
},
{
    id: "plastic",
    idNum: 6,
    name: "塑料",
    nameShort: "塑料",
    spriteX: 5,
    spriteY: 0
},
{
    id: "silicon",
    idNum: 7,
    name: "硅",
    nameShort: "硅",
    spriteX: 6,
    spriteY: 0
},
{
    id: "electronics",
    idNum: 8,
    name: "电子元件",
    nameShort: "电子元件",
    spriteX: 7,
    spriteY: 0
},
{
    id: "aluminium",
    idNum: 9,
    name: "铝",
    nameShort: "铝",
    spriteX: 0,
    spriteY: 1
},
{
    id: "engine",
    idNum: 10,
    name: "引擎",
    nameShort: "引擎",
    spriteX: 1,
    spriteY: 1
},
{
    id: "explosives",
    idNum: 11,
    name: "爆炸物",
    nameShort: "爆炸物",
    spriteX: 2,
    spriteY: 1
},
{
    id: "bullets",
    idNum: 12,
    name: "子弹",
    nameShort: "子弹",
    spriteX: 3,
    spriteY: 1
},
{
    id: "guns",
    idNum: 13,
    name: "枪械",
    nameShort: "枪械",
    spriteX: 4,
    spriteY: 1
},
{
    id: "tankHull",
    idNum: 14,
    name: "坦克舱体",
    nameShort: "坦克舱体",
    spriteX: 5,
    spriteY: 1
},
{
    id: "tankTurret",
    idNum: 15,
    name: "坦克机枪",
    nameShort: "坦克机枪",
    spriteX: 6,
    spriteY: 1
},
{
    id: "tank",
    idNum: 16,
    name: "坦克",
    nameShort: "坦克",
    spriteX: 7,
    spriteY: 1
},
{
    id: "rocketHull",
    idNum: 17,
    name: "火箭舱体",
    nameShort: "火箭舱体",
    spriteX: 1,
    spriteY: 2
},
{
    id: "warhead",
    idNum: 18,
    name: "弹头",
    nameShort: "弹头",
    spriteX: 2,
    spriteY: 2
},
{
    id: "rocket",
    idNum: 19,
    name: "火箭",
    nameShort: "火箭",
    spriteX: 3,
    spriteY: 2
},
{
    id: "waste",
    idNum: 20,
    name: "废料",
    nameShort: "废料",
    spriteX: 4,
    spriteY: 2
},
{
    id: "gas",
    idNum: 21,
    name: "燃气",
    nameShort: "燃气",
    spriteX: 6,
    spriteY: 2
},
{
    id: "jetFuel",
    idNum: 22,
    name: "航空燃料",
    nameShort: "航空燃料",
    spriteX: 7,
    spriteY: 2
},
{
    id: "diesel",
    idNum: 23,
    name: "内燃机",
    nameShort: "内燃机",
    spriteX: 5,
    spriteY: 2
},
{
    id: "drone",
    idNum: 27,
    name: "无人机",
    nameShort: "无人机",
    spriteX: 4,
    spriteY: 3
},
{
    id: "droneControlRoom",
    idNum: 28,
    name: "无人机控制室",
    nameShort: "无人机控制室",
    spriteX: 5,
    spriteY: 3
},
{
    id: "report1",
    idNum: 24,
    name: "金属报告",
    nameShort: "金属报告",
    spriteX: 0,
    spriteY: 3
},
{
    id: "report2",
    idNum: 25,
    name: "燃气&原油报告",
    nameShort: "燃气&原油报告",
    spriteX: 1,
    spriteY: 3
},
{
    id: "report3",
    idNum: 26,
    name: "大报告",
    nameShort: "大报告",
    spriteX: 2,
    spriteY: 3
},
{
    id: "report4",
    idNum: 29,
    name: "质量报告",
    nameShort: "质量报告",
    spriteX: 3,
    spriteY: 3
}
]
const factories = [{
    id: "level1",
    idNum: 1,
    name: "小型工厂",
    tilesX: 68,
    tilesY: 38,
    startX: 8,
    startY: 10,
    price: 100,
    terrains: {
        G: "grass",
        X: "wall",
        ".": "road",
        " ": "floor"
    },
    buildableTerrains: {
        floor: true
    },
    terrainMap: "XXXXXXXXXXXX.GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG.GGGGGGGGGG.GGGGGGGGGGX          X.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXG.GXXXXXXXXX.XXXXXXXXXGX          X.X        X         X           XG.GX        .        XGX           .         X         X            G.G         .        XGX           .         X                      G.G       XX.XX      XGX          X.X        X                     XG.GX      XG.GX      XGX          X.X        X                     XG.GXXX XXXXG.GX      XGX          X.X      X XX X                  XG.GX      XXXXX      XGX           .       X    X      X           XG.GX                 XGXXXX    XXXX.X      X    X      X           XG.GX                 XG.............X      X    X      XXXXXXXXXXXXXG.GXXXXXXXXXX  XXX  XXGXXXX    XXXX.X      X    X      X...................................X          X.X      X    X      X.GGGGGGXXXXXXXXXXXXXXX.XX  XXX  XXXX          X.X                  X.GGGGGGX              .           XX          X.XXX   XXXXXXXXX   XX.GGGGGGX             X.X          XX          X......................GGGGGGXX           XX.XX         XX          X.XXX   XXXXXXXXX   XX.GGGGGGGX           XG.GX         XX     X    X.X                  X.GGGGGGXX           XX.XX         XX     X    X.X                  X.GGGGGGX              .           XX     X    X.X            X     X.GGGGGGX             X.X          XX     XXXXXX.X            X     X.GGGGGGXX           XX.XX         XX         XG.X            X     X.GGGGGGGX           XG.GX         XXX         G.             X     X.GGGGGGXX           XX.XX         XGX         G.             X     X.GGGGGGX              .           XGX         G.             X     X.XXXGXXX             X.X          XGX         G.             X     X.X XXX              XX.XX         XGX        XG.X                   .                   XG.GX         XGXXXX  XXXXG.X                   .                   XX.XX         XGGGGGGGGGGGG.XXXXXXXX   XXX   XXX.X                    .           X...................GGGGGGGGGGGGGG.X                    .           XGGGGX  XXXXG.XXXXX................X                    .           XGXXXX     XX.X   XXXX   XXX   XXX.X                    .           XGX          .       X           X.X                  XX.X          XGX          .                    .                   X..X          XGX          .                    .      XXXXXXXX     X.XX          XGX        XX.X      X            .      XGGGGGGX     X.X           XGXXXXXXXXXXG.X      X           X.XXXXXXXGGGGGGXXXXXXX.X           XGGGGGGGGGGGG.XXXXXXXXXXXXXXXXXXXX.GGGGGGGGGGGGGGGGGGGG.XXXXXXXXXXXXX",
    buildMap: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX          XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX          XXX        X         X           XXXXX        -        XXX           -         X         X            ---         -        XXX           -         X                      ---       XXXXX      XXX          XXX        X                     XXXXX      XXXXX      XXX          XXX        X                     XXXXXXX XXXXXXXX      XXX          XXX      X XX X                  XXXXX      XXXXX      XXX           -       X    X      X           XXXXX                 XXXXXX    XXXXXX      X    X      X           XXXXX                 XXXXXX----XXXXXX      X    X      XXXXXXXXXXXXXXXXXXXXXXXXXX  XXX  XXXXXXX    XXXXXX      X    X      XXXXXXXXXXXXXXXXXXXXXXXXXX--XXX--XXXX          XXX      X    X      XXXXXXXXXXXXXXXXXXXXXXXXXX  XXX  XXXX          XXX                  XXXXXXXXX              -           XX          XXXXX   XXXXXXXXX   XXXXXXXXXX             XXX          XX          XXXXX---XXXXXXXXX---XXXXXXXXXXX           XXXXX         XX          XXXXX   XXXXXXXXX   XXXXXXXXXXX           XXXXX         XX     X    XXX                  XXXXXXXXXX           XXXXX         XX     X    XXX                  XXXXXXXXX              -           XX     X    XXX            X     XXXXXXXXX             XXX          XX     XXXXXXXX            X     XXXXXXXXXX           XXXXX         XX         XXXX            X     XXXXXXXXXX           XXXXX         XXX         --             X     XXXXXXXXXX           XXXXX         XXX         --             X     XXXXXXXXX              -           XXX         --             X     XXXXXXXXX             XXX          XXX         --             X     XXX XXX              XXXXX         XXX        X-XX                   -                   XXXXX         XXXXXX  XXXX-XX                   -                   XXXXX         XXXXXX-------XXXXXXXXX   XXX   XXXXX                    -           XXXXXX--XXXXXXXXXXXX--------------XX                    -           XXXXXX  XXXXXXXXXXXXXX---XXX---XXXXX                    -           XXXXXX     XXXX   XXXX   XXX   XXXXX                    -           XXX          -       X           XXX                  XXXX          XXX          -                    -                   XXXX          XXX          -                    -      XXXXXXXX     XXXX          XXX        XXXX      X            -      XXXXXXXX     XXX           XXXXXXXXXXXXXXX      X           XXXXXXXXXXXXXXXXXXXXXXXX           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    areas: [{
        id: "a2",
        name: "A2",
        idNum: 1,
        price: 1200,
        locations: [{
            x: 0,
            y: 0,
            x2: 11,
            y2: 9
        }]
    },
    {
        id: "a4",
        name: "A4",
        idNum: 2,
        price: 25e4,
        locations: [{
            x: 0,
            y: 11,
            x2: 11,
            y2: 27
        }]
    },
    {
        id: "a1",
        name: "A1",
        idNum: 3,
        price: 700,
        locations: [{
            x: 0,
            y: 30,
            x2: 11,
            y2: 37
        }]
    },
    {
        id: "a5",
        name: "A5",
        idNum: 4,
        price: 26e6,
        locations: [{
            x: 13,
            y: 1,
            x2: 32,
            y2: 14
        }]
    },
    {
        id: "a6",
        name: "A6",
        idNum: 5,
        price: 32e6,
        locations: [{
            x: 33,
            y: 1,
            x2: 44,
            y2: 10
        }]
    },
    {
        id: "a3",
        name: "A3",
        idNum: 6,
        price: 12e3,
        locations: [{
            x: 13,
            y: 31,
            x2: 32,
            y2: 37
        },
        {
            x: 13,
            y: 30,
            x2: 17,
            y2: 30
        }
        ]
    },
    {
        id: "a7",
        name: "A7",
        idNum: 7,
        price: 14e7,
        locations: [{
            x: 48,
            y: 1,
            x2: 66,
            y2: 10
        }]
    },
    {
        id: "a9",
        name: "A9",
        idNum: 8,
        price: 4e10,
        locations: [{
            x: 34,
            y: 12,
            x2: 53,
            y2: 36
        },
        {
            x: 54,
            y: 12,
            x2: 54,
            y2: 32
        }
        ]
    },
    {
        id: "a8",
        name: "A8",
        idNum: 9,
        price: 29e8,
        locations: [{
            x: 56,
            y: 12,
            x2: 67,
            y2: 37
        },
        {
            x: 55,
            y: 34,
            x2: 55,
            y2: 37
        }
        ]
    }
    ],
    startComponents: [{
        id: "ironBuyer",
        x: 15,
        y: 18
    },
    {
        id: "ironFoundry",
        x: 19,
        y: 18
    },
    {
        id: "ironSeller",
        x: 25,
        y: 18
    },
    {
        id: "transportLine",
        x: 17,
        y: 18
    },
    {
        id: "transportLine",
        x: 18,
        y: 18
    },
    {
        id: "transportLine",
        x: 23,
        y: 18
    },
    {
        id: "transportLine",
        x: 24,
        y: 18
    }
    ],
    transportLineConnections: [{
        fromX: 16,
        fromY: 18,
        toX: 17,
        toY: 18
    },
    {
        fromX: 17,
        fromY: 18,
        toX: 18,
        toY: 18
    },
    {
        fromX: 18,
        fromY: 18,
        toX: 19,
        toY: 18
    },
    {
        fromX: 22,
        fromY: 18,
        toX: 23,
        toY: 18
    },
    {
        fromX: 23,
        fromY: 18,
        toX: 24,
        toY: 18
    },
    {
        fromX: 24,
        fromY: 18,
        toX: 25,
        toY: 18
    }
    ]
},
{
    id: "level2",
    idNum: 2,
    name: "中型工厂",
    tilesX: 50,
    tilesY: 35,
    startX: 12,
    startY: 0,
    price: 1e9,
    terrains: {
        G: "grass",
        X: "wall",
        ".": "road",
        " ": "floor"
    },
    buildableTerrains: {
        floor: true
    },
    terrainMap: "GGGGGGGGGGGGGGG.GGGGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGGXXXXXXXXXXXXGG.GXXXXXXXXXXXXXXXXXXX.XXXXXXXXXXXXGGX          XGG.GX                 X.X          XGGX          XGG.GX                 X.X          XGGX          XGG.GX                 X.X          XGGX          XGG.GX                 X.X          XGGX           GG.G                   .           XGGX          XGG.GX                 X.X          XGGX           GG.G                   .           XGGX          XGG.GX                 X.X          XGGX           GG.G                   .           XGGX          XGG.GX                 X.X          XGGX           GG.G                   .           XGGX          XGG.GX                 X.X          XGGX           GG.G                   .           XGGX          XGG.GX                 X.X          XGGX          XGG.GX                 X.X          XGGX          XGG.GX                 X.X          XGGXXXX    XXXXGG.GXXXXX  X  XXX  X  X.XXXXXXXXXXXXG................GGGGGG  G  GGG  G  G.GGGGGGGGGGGGGGXXXX    XXXXGG.GGGGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGGX          XGG......................GGGGGGG GGGGGGX          XGG.GGGGGG  G  G.G  G  GGGGGGGG   GGGGGX          XGG.GXXXXX  X  X.X  X  XXXXXGGGG GGGGGGX          XGG.GX         X.X         XGGGGGGGGGGGX          XGG.GX         X.X         XGGGGGGGGGGGX          XGG.GX         X.X         XGGGG GGGGGGX          XGG.GX         X.X         XGGG   GGGGGX          XGG.GX         X.X         XGGGG GGGGGGX          XGG.GX         X.X         XGGGGGGGGGGGX          XGG.GX         X.X         XGGGGGGGGGGGX          XGG.GX        XX.XX        XGGGG GGGGGGX          XGG.GX        XG.GX        XGGG   GGGGGXXXXXXXXXXXXGG.GXXXXXXXXXXG.GXXXXXXXXXXGGGG GGGGGGGGGGGGGGGGGGGG.GGGGGGGGGGGG.GGGGGGGGGGGGGGGGGGGGG",
    buildMap: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX          XXXXXX                 XXX          XXXX          XXXXXX                 XXX          XXXX          XXXXXX                 XXX          XXXX          XXXXXX                 XXX          XXXX           ----                   -           XXXX          X----X                 X-X          XXXX           ----                   -           XXXX          X----X                 X-X          XXXX           ----                   -           XXXX          X----X                 X-X          XXXX           ----                   -           XXXX          X----X                 X-X          XXXX           ----                   -           XXXX          XXXXXX                 XXX          XXXX          XXXXXX                 XXX          XXXX          XXXXXX                 XXX          XXXXXXX    XXXXXXXXXXXXX  X  XXX  X  XXXXXXXXXXXXXXXXXXXX----XXXXXXXXXXXXX  -  XXX  -  XXXXXXXXXXXXXXXXXXXX    XXXXXXXXXXXXX-----XXX-----XXXXXXXXXXXXXXXXX          XXXXXXXXXX-----XXX-----XXXXXXXXX XXXXXXX          XXXXXXXXXX  -  XXX  -  XXXXXXXX   XXXXXX          XXXXXXXXXX  X  XXX  X  XXXXXXXXX XXXXXXX          XXXXXX         XXX         XXXXXXXXXXXXX          XXXXXX         XXX         XXXXXXXXXXXXX          XXXXXX         XXX         XXXXX XXXXXXX          XXXXXX         XXX         XXXX   XXXXXX          XXXXXX         XXX         XXXXX XXXXXXX          XXXXXX         XXX         XXXXXXXXXXXXX          XXXXXX         XXX         XXXXXXXXXXXXX          XXXXXX        XXXXX        XXXXX XXXXXXX          XXXXXX        XXXXX        XXXX   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    areas: [{
        id: "b3",
        name: "B3",
        idNum: 1,
        price: 12e9,
        locations: [{
            x: 1,
            y: 1,
            x2: 12,
            y2: 18
        }]
    },
    {
        id: "b1",
        name: "B1",
        idNum: 2,
        price: 25e8,
        locations: [{
            x: 16,
            y: 22,
            x2: 27,
            y2: 34
        }]
    },
    {
        id: "b2",
        name: "B2",
        idNum: 3,
        price: 25e8,
        locations: [{
            x: 29,
            y: 22,
            x2: 39,
            y2: 34
        }]
    },
    {
        id: "b5",
        name: "B5",
        idNum: 4,
        price: 8e11,
        locations: [{
            x: 37,
            y: 1,
            x2: 48,
            y2: 18
        }]
    },
    {
        id: "b4",
        name: "B4",
        idNum: 5,
        price: 26e10,
        locations: [{
            x: 1,
            y: 20,
            x2: 12,
            y2: 33
        }]
    }
    ]
},
{
    id: "level3",
    idNum: 3,
    name: "大型工厂",
    tilesX: 68,
    tilesY: 42,
    startX: 10,
    startY: 3,
    price: 5e12,
    terrains: {
        G: "grass",
        X: "wall",
        ".": "road",
        " ": "floor"
    },
    buildableTerrains: {
        floor: true
    },
    terrainMap: "GGGGGGGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGXXXXXXXXXXXXXXXXXXXXXX.GXXXXXXXXXXXXXXXXXXGGXXXXXXXXXXXXXXXXXXXXXXGGX                     .G                 XGGX                    XGGX                     .G                  GG                     XGGX                    X.GX                 GG                     XGGX                    X.GX                 GG                     XGGX                    X.GX                 GG                     XGGX                    X.GX                 GG                     XGGX                    X.GX                 GG                     XGGX                    X.GX                 GG                     XGGX                    X.GX                XGGX                    XGGX                    X.GX          XXXXXXXGGXXX                  XGGX                    X.GX          XGGGGGGGGGGX                  XGGX             XXX    X.GX          XGGGGGGGGGGX                  XGGX             X........GX          XGGGGGGGGGGX                  XGGX             X.X    XXXX          XGGGGGGGGGGX                  XGGX             X.X                  XGGGGGGGGGGXXXX   XXX  XXX   XXGGX             X.X                  XGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGX             X.X                  XGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGXXXX   XXXXXXXX.X                  XGG..............................................X                  XGG.GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG.X                  XGG.GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG.X                  XGG.GGXXXXXXXXX   XXX  XXX   XXGGGGGGGGGGGGGGGGG.X                  XGG.GGX                       XGGXXXX   XXXXXGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X    XXXXXXXXXX    XGG.GGX                       XGGX          XGGG........................GGX                       XGGX          XGGG.X    XXXXXXXXXX    XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                   GG.GG                        XGGX          XGGG.X                   GG.GG                        XGGX          XGGG.X                  XGG.GGX                       XGGX          XGGG.X                  XGG.GGX                       XGGXXXXXXXXXXXXGGG.X                  XGG.GGXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGG.XXXXXXXXXXXXXXXXXXXXGG.GGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    buildMap: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                     --                 XXXX                    XXXX                     --                  --                     XXXX                    XXXX                 --                     XXXX                    XXXX                 --                     XXXX                    XXXX                 --                     XXXX                    XXXX                 --                     XXXX                    XXXX                 --                     XXXX                    XXXX                 --                     XXXX                    XXXX                XXXX                    XXXX                    XXXX          XXXXXXXXXXXX                  XXXX                    XXXX          XXXXXXXXXXXX                  XXXX             XXX    XXXX          XXXXXXXXXXXX                  XXXX             XXX----XXXX          XXXXXXXXXXXX                  XXXX             XXX    XXXX          XXXXXXXXXXXX                  XXXX             XXX                  XXXXXXXXXXXXXXX   XXX  XXX   XXXXX             XXX                  XXXXXXXXXXXXXXX--------------XXXXX             XXX                  XXXXXXXXXXXXXXX---XXX--XXX---XXXXXXXX   XXXXXXXXXX                  XXXXXXXXXXXXXXX---XXX--XXX---XXXXXXXX---XXXXXXXXXX                  XXXXXXXXXXXXXXX---XXX--XXX---XXXXXXXX---XXXXXXXXXX                  XXXXXXXXXXXXXXX--------------XXXXXXXX---XXXXXXXXXX                  XXXXXXXXXXXXXXX   XXX  XXX   XXXXXXXX---XXXXXXXXXX                  XXXXXXX                       XXXXXXX   XXXXXXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX    XXXXXXXXXX    XXXXXXX                       XXXX          XXXXXX----XXXXXXXXXX----XXXXXXX                       XXXX          XXXXXX    XXXXXXXXXX    XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                   -----                        XXXX          XXXXXX                   -----                        XXXX          XXXXXX                  XXXXXXX                       XXXX          XXXXXX                  XXXXXXX                       XXXXXXXXXXXXXXXXXXXX                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    areas: [{
        id: "c3",
        name: "C3",
        idNum: 1,
        price: 2e12,
        locations: [{
            x: 1,
            y: 1,
            x2: 15,
            y2: 19
        },
        {
            x: 16,
            y: 1,
            x2: 22,
            y2: 13
        }
        ]
    },
    {
        id: "c2",
        name: "C2",
        idNum: 2,
        price: 15e12,
        locations: [{
            x: 1,
            y: 24,
            x2: 12,
            y2: 40
        }]
    },
    {
        id: "c1",
        name: "C1",
        idNum: 3,
        price: 7e12,
        locations: [{
            x: 17,
            y: 31,
            x2: 36,
            y2: 41
        }]
    },
    {
        id: "c4",
        name: "C4",
        idNum: 4,
        price: 15e13,
        locations: [{
            x: 42,
            y: 22,
            x2: 66,
            y2: 40
        }]
    },
    {
        id: "c5",
        name: "C5",
        idNum: 5,
        price: 6e13,
        locations: [{
            x: 47,
            y: 1,
            x2: 66,
            y2: 16
        },
        {
            x: 45,
            y: 1,
            x2: 46,
            y2: 11
        }
        ]
    }
    ]
},
{
    id: "level4",
    idNum: 4,
    name: "巨型工厂",
    tilesX: 50,
    tilesY: 40,
    startX: 9,
    startY: 8,
    price: 1e15,
    terrains: {
        G: "grass",
        X: "wall",
        ".": "road",
        " ": "floor"
    },
    buildableTerrains: {
        floor: true
    },
    terrainMap: "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGXX   X    X    X    X    X    X    X    X   XXGGGXX                                            XXGGX                                              XGGX                                              XGGX                                              XGGXX                                            XXGGX                                              XGGX                                              XGGX                                              XGGX                                              XGGXX                                            XXGGX                                              XGGX                                              XGGX                                              XGGX                                              XGGXX                                            XXGGX                XXX        XXX                XGGX                XGX        XGX                XGGX                XGX        XGX                XGGX                XXX        XXX                XGGXX                                            XXGGX                                              XGGX                                              XGGX                                              XGGX                                              XGGXX                                            XXGGX                                              XGGX                                              XGGX                                              XGGX                                              XGGXX                                            XXGGX                                              XGGX                                              XGGX                                              XGGXX                                            XXGGGXX   X    X    X    X    X    X    X    X   XXGGGGGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    buildMap: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   X    X    X    X    X    X    X    X   XXXXXXX                                            XXXXX                                              XXXX                                              XXXX                                              XXXXX                                            XXXXX                                              XXXX                                              XXXX                                              XXXX                                              XXXXX                                            XXXXX                                              XXXX                                              XXXX                                              XXXX                                              XXXXX                                            XXXXX                XXX        XXX                XXXX                XXX        XXX                XXXX                XXX        XXX                XXXX                XXX        XXX                XXXXX                                            XXXXX                                              XXXX                                              XXXX                                              XXXX                                              XXXXX                                            XXXXX                                              XXXX                                              XXXX                                              XXXX                                              XXXXX                                            XXXXX                                              XXXX                                              XXXX                                              XXXXX                                            XXXXXXX   X    X    X    X    X    X    X    X   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    areas: []
},
{
    id: "level5",
    idNum: 5,
    name: "全球工厂",
    tilesX: 80,
    tilesY: 41,
    startX: 9,
    startY: 8,
    price: 1e18,
    terrains: {
        G: "grass",
        X: "wall",
        ".": "road",
        " ": "floor"
    },
    buildableTerrains: {
        floor: true
    },
    terrainMap: "XXXXXXXXXXXXXXXXXXXXXXXXXG.GGGGGGGGGGGGGGGGGGGGGGGGGG.GXXXXXXXXXXXXXXXXXXXXXXXXXX                       XG............................GX                       XX                       XG.GXXXXXXXXXX.XX.XXXXXXXXXXG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                        G.G                        G.G                        XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                        G.G                        G.G                        XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                        G.G                        G.G                        XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GX                      XG.GX                       XX                       XG.GXXXXXXXXXXXXXXXXXXXXXXXXG.GX                       XX                       XG.GGGGGGGGGGGGGGGGGGGGGGGGGG.GX                       XXXXXXXXXXXXXXXXXXXXXXXXXXG.GGGGGGGGGGGGGGGGGGGGGGGGGG.GXXXXXXXXXXXXXXXXXXXXXXXXX",
    buildMap: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                       XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                       XX                       XXXXXXXXXXXXXX-XX-XXXXXXXXXXXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                        ---                        ---                        XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                        ---                        ---                        XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                        ---                        ---                        XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXX                      XXXXX                       XX                       XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                       XX                       XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                       XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    areas: []
}
];
const research = [{
    id: "researchCenter",
    idNum: 13,
    name: "研究中心",
    iconX: 0,
    iconY: 0,
    description: "允许研究更多的技术",
    price: 900,
    priceIncrease: 1,
    max: 1,
    requiresResearch: ""
},
{
    id: "chronometer",
    idNum: 1,
    name: "精密记时表",
    iconX: 1,
    iconY: 0,
    description: "每级给予 +1 滴答/秒",
    priceResearchPoints: 50,
    priceIncrease: 50,
    max: 10,
    requiresResearch: "researchCenter"
},
{
    id: "steelComponents",
    idNum: 2,
    name: "钢组件",
    iconX: 2,
    iconY: 0,
    description: "允许生产钢",
    priceResearchPoints: 200,
    priceIncrease: 1,
    max: 1,
    requiresResearch: "researchCenter"
},
{
    id: "metalsLab",
    idNum: 14,
    name: "金属实验室",
    iconX: 3,
    iconY: 0,
    description: "允许研究金属",
    priceResearchPoints: 2e3,
    priceIncrease: 1,
    max: 1,
    requiresResearch: "steelComponents"
},
{
    id: "plasticComponents",
    idNum: 3,
    name: "塑料组件",
    iconX: 4,
    iconY: 0,
    description: "允许生产塑料",
    priceResearchPoints: pow1e3(160, 1),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "steelComponents"
},
{
    id: "sorter",
    idNum: 16,
    name: "分选机",
    iconX: 5,
    iconY: 0,
    description: "将线上的资源分选到不同的路径",
    priceResearchPoints: pow1e3(120, 1),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "plasticComponents"
},
{
    id: "electronicsComponents",
    idNum: 4,
    name: "电子元件组件",
    iconX: 6,
    iconY: 0,
    description: "允许生产电子元件",
    priceResearchPoints: pow1e3(20, 2),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "plasticComponents"
},
{
    id: "gasAndOilLab",
    idNum: 15,
    name: "燃气&原油实验室",
    iconX: 7,
    iconY: 0,
    description: "允许研究燃气和原油",
    priceResearchPoints: pow1e3(300, 1),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "plasticComponents"
},
{
    id: "gunComponents",
    idNum: 8,
    name: "枪械组件",
    iconX: 0,
    iconY: 1,
    description: "允许生产枪械",
    priceResearchPoints: pow1e3(150, 2),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "electronicsComponents"
},
{
    id: "cleanPlastic",
    idNum: 5,
    name: "清洁塑料生产",
    iconX: 1,
    iconY: 1,
    description: "塑料生产不会产生废料",
    priceResearchPoints: pow1e3(15, 2),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "electronicsComponents"
},
{
    id: "engineComponents",
    idNum: 6,
    name: "引擎组件",
    iconX: 2,
    iconY: 1,
    description: "允许生产引擎",
    priceResearchPoints: pow1e3(2.5, 3),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "gunComponents"
},
{
    id: "analystCenter",
    idNum: 17,
    name: "分析中心",
    iconX: 3,
    iconY: 0,
    description: "提供更高质量的研究",
    priceResearchPoints: pow1e3(250, 2),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "gunComponents"
},
{
    id: "tankComponents",
    idNum: 9,
    name: "坦克组件",
    iconX: 4,
    iconY: 1,
    description: "允许生产坦克",
    priceResearchPoints: pow1e3(20, 3),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "engineComponents"
},
{
    id: "cleanElectronics",
    idNum: 7,
    name: "清洁电子元件",
    iconX: 5,
    iconY: 1,
    description: "电子元件生产将不会产生废料",
    priceResearchPoints: pow1e3(700, 2),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "engineComponents"
},
{
    id: "dieselRefinery",
    idNum: 10,
    name: "柴油精炼厂",
    iconX: 5,
    iconY: 1,
    description: "柴油提高坦克价值.",
    priceResearchPoints: pow1e3(75, 3),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "tankComponents"
},
{
    id: "rocketComponents",
    idNum: 11,
    name: "火箭组件",
    iconX: 6,
    iconY: 1,
    description: "允许生产火箭",
    priceResearchPoints: pow1e3(1, 4),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "dieselRefinery"
},
{
    id: "qualityCenter",
    idNum: 19,
    name: "质量中心",
    iconX: 9,
    iconY: 1,
    description: "提供更高质量的研究",
    priceResearchPoints: pow1e3(2, 4),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "rocketComponents"
},
{
    id: "cleanEngines",
    idNum: 12,
    name: "清洁引擎",
    iconX: 7,
    iconY: 1,
    description: "引擎生产时不会产生废料",
    priceResearchPoints: pow1e3(1, 4),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "rocketComponents"
},
{
    id: "droneComponents",
    idNum: 18,
    name: "无人机组件",
    iconX: 8,
    iconY: 1,
    description: "允许生产无人机",
    priceResearchPoints: pow1e3(99, 4),
    priceIncrease: 1,
    max: 1,
    requiresResearch: "rocketComponents"
}
]
function pow10(e, t) {
    return e * Math.pow(10, t)
}
const upgrades = {
    layout: [{
        name: "传送带",
        iconX: 1,
        iconY: 0,
        items: ["packageSize"]
    },
    {
        name: "研究中心",
        iconX: 3,
        iconY: 3,
        items: ["analystCenterConvertMore", "researchCenterBonus", "researchCenterMaxStock"]
    },
    {
        name: "废物",
        iconX: 2,
        iconY: 3,
        items: ["garbageRemoveAmount"]
    },
    {
        type: "break"
    },
    {
        type: "break"
    },
    {
        name: "铁购买机",
        iconX: 2,
        iconY: 0,
        items: ["ironBuyerBuyAmount"]
    },
    {
        name: "煤购买机",
        iconX: 5,
        iconY: 0,
        items: ["coalBuyerRunningCost", "_", "coalBuyerBuyAmount"]
    },
    {
        name: "原油购买机",
        iconX: 8,
        iconY: 0,
        items: ["oilBuyerRunningCost", "_", "oilBuyerBuyAmount"]
    },
    {
        name: "燃气购买机",
        iconX: 0,
        iconY: 3,
        items: ["gasBuyerRunningCost", "_", "gasBuyerBuyAmount"]
    },
    {
        name: "硅购买机",
        iconX: 1,
        iconY: 1,
        items: ["siliconBuyerRunningCost", "_", "siliconBuyerBuyAmount"]
    },
    {
        name: "爆炸物购买机",
        iconX: 7,
        iconY: 1,
        items: ["explosivesBuyerRunningCost", "_", "explosivesBuyerBuyAmount"]
    },
    {
        name: "铝购买机",
        iconX: 4,
        iconY: 1,
        items: ["aluminiumBuyerRunningCost", "_", "aluminiumBuyerBuyAmount"]
    },
    {
        type: "break"
    },
    {
        type: "break"
    },
    {
        name: "铸铁厂",
        iconX: 3,
        iconY: 0,
        items: ["ironFoundryConvertAmount"]
    },
    {
        name: "铸钢厂",
        iconX: 6,
        iconY: 0,
        items: ["steelFoundryConvertMoreAmount", "_", "steelFoundryRunningCost", "_", "steelFoundryConvertAmount"]
    },
    {
        name: "塑料制造机",
        iconX: 9,
        iconY: 0,
        items: ["plasticMakerConvertMoreAmount", "_", "plasticMakerRunningCost", "_", "plasticMakerConvertAmount"]
    },
    {
        name: "电子元件制造机",
        iconX: 2,
        iconY: 1,
        items: ["electronicsMakerConvertMoreAmount", "_", "electronicsMakerRunningCost", "_", "electronicsMakerConvertAmount"]
    },
    {
        name: "子弹制造机",
        iconX: 8,
        iconY: 1,
        items: ["bulletMakerRunningCost", "_", "bulletMakerConvertAmount"]
    },
    {
        name: "枪械制造机",
        iconX: 9,
        iconY: 1,
        items: ["gunMakerRunningCost", "_", "gunMakerConvertAmount"]
    },
    {
        name: "引擎制造机",
        iconX: 5,
        iconY: 1,
        items: ["engineMakerRunningCost", "_", "engineMakerConvertAmount"]
    },
    {
        name: "坦克舱体制造机",
        iconX: 1,
        iconY: 2,
        items: ["tankHullMakerRunningCost", "_", "tankHullMakerConvertAmount"]
    },
    {
        name: "坦克机枪制造机",
        iconX: 2,
        iconY: 2,
        items: ["tankTurretMakerRunningCost", "_", "tankTurretMakerConvertAmount"]
    },
    {
        name: "坦克装配线",
        iconX: 3,
        iconY: 2,
        items: ["tankAssemblerRunningCost", "_", "tankAssemblerConvertAmount"]
    },
    {
        name: "柴油精炼厂",
        iconX: 5,
        iconY: 2,
        items: ["dieselRefineryRunningCost", "_", "dieselRefineryConvertAmount"]
    },
    {
        name: "航空燃料精炼厂",
        iconX: 1,
        iconY: 3,
        items: ["jetFuelRefineryRunningCost", "_", "jetFuelRefineryConvertAmount"]
    },
    {
        name: "火箭舱体制造机",
        iconX: 6,
        iconY: 2,
        items: ["rocketHullMakerRunningCost", "_", "rocketHullMakerConvertAmount"]
    },
    {
        name: "火箭弹头制造机",
        iconX: 7,
        iconY: 2,
        items: ["rocketWarheadMakerRunningCost", "_", "rocketWarheadMakerConvertAmount"]
    },
    {
        name: "火箭装配线",
        iconX: 8,
        iconY: 2,
        items: ["rocketAssemblerRunningCost", "_", "rocketAssemblerConvertAmount"]
    },
    {
        type: "break"
    },
    {
        type: "break"
    },
    {
        name: "铁售卖机",
        iconX: 4,
        iconY: 0,
        items: ["ironSellerSellPrice", "_", "ironSellerSellAmount"]
    },
    {
        name: "钢售卖机",
        iconX: 7,
        iconY: 0,
        items: ["steelSellerSellPrice", "steelSellerRunningCost", "_", "steelSellerSellAmount"]
    },
    {
        name: "塑料售卖机",
        iconX: 0,
        iconY: 1,
        items: ["plasticSellerSellPrice", "plasticSellerRunningCost", "_", "plasticSellerSellAmount"]
    },
    {
        name: "电子元件售卖机",
        iconX: 3,
        iconY: 1,
        items: ["electronicsSellerSellPrice", "electronicsSellerRunningCost", "_", "electronicsSellerSellAmount"]
    },
    {
        name: "枪械售卖机",
        iconX: 0,
        iconY: 2,
        items: ["gunSellerSellPrice", "gunSellerRunningCost", "_", "gunSellerSellAmount"]
    },
    {
        name: "引擎售卖机",
        iconX: 6,
        iconY: 1,
        items: ["engineSellerSellPrice", "engineSellerRunningCost", "_", "engineSellerSellAmount"]
    },
    {
        name: "坦克售卖机",
        iconX: 4,
        iconY: 2,
        items: ["tankSellerSellPrice", "tankSellerRunningCost", "_", "tankSellerSellAmount"]
    }
    ],
    upgrades: [{
        id: "packageSize",
        idNum: 66,
        iconX: 1,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "packageSize",
        refund: .8,
        levels: [{
            price: pow10(1, 12),
            bonus: 1
        },
        {
            price: pow10(1, 14),
            bonus: 1
        },
        {
            price: pow10(1, 16),
            bonus: 1
        },
        // ++ 增加一层奖励
        {
            price: pow10(1, 18),
            bonus: 6
        }
            // ++ 
        ]
    },
    {
        id: "ironBuyerBuyAmount",
        idNum: 1,
        iconX: 0,
        iconY: 0,
        type: "buyer",
        componentId: "ironBuyer",
        refund: .8,
        noRunningCost: true,
        levels: [{
            price: pow10(8, 2),
            bonus: 1
        },
        {
            price: pow10(8, 3),
            bonus: 2
        },
        {
            price: pow10(8, 4),
            bonus: 4
        },
        {
            price: pow10(5, 5),
            bonus: 4
        },
        {
            price: pow10(12, 9),
            bonus: 12
        },
        {
            price: pow10(1.5, 11),
            bonus: 12
        },
        {
            price: pow10(4, 13),
            bonus: 12
        },
        {
            price: pow10(60, 13),
            bonus: 16
        },
        {
            price: pow10(10, 14),
            bonus: 32
        }
        ]
    },
    {
        id: "ironFoundryConvertAmount",
        idNum: 2,
        iconX: 1,
        iconY: 0,
        type: "converter",
        componentId: "ironFoundry",
        refund: .8,
        noRunningCost: true,
        levels: [{
            price: pow10(8, 2),
            bonus: 1
        },
        {
            price: pow10(8, 4),
            bonus: 2
        },
        {
            price: pow10(8, 5),
            bonus: 2
        },
        {
            price: pow10(7, 9),
            bonus: 6
        },
        {
            price: pow10(2, 11),
            bonus: 6
        },
        {
            price: pow10(6, 13),
            bonus: 6
        },
        {
            price: pow10(60, 13),
            bonus: 24
        },
        {
            price: pow10(20, 14),
            bonus: 48
        }
        ]
    },
    {
        id: "ironSellerSellAmount",
        idNum: 3,
        iconX: 2,
        iconY: 0,
        type: "sellerSellAmount",
        componentId: "ironSeller",
        refund: .8,
        noRunningCost: true,
        levels: [{
            price: pow10(5, 2),
            bonus: 1
        },
        {
            price: pow10(2, 3),
            bonus: 2
        }
        ]
    },
    {
        id: "ironSellerSellPrice",
        idNum: 4,
        iconX: 3,
        iconY: 0,
        type: "sellerSellPrice",
        componentId: "ironSeller",
        levels: [{
            price: pow10(5, 2),
            bonus: .25
        },
        {
            price: pow10(4, 3),
            bonus: .25
        }
        ]
    },
    {
        id: "coalBuyerBuyAmount",
        idNum: 5,
        iconX: 0,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "buyer",
        componentId: "coalBuyer",
        refund: .8,
        levels: [{
            price: pow10(4, 4),
            bonus: 1
        },
        {
            price: pow10(18, 5),
            bonus: 2
        },
        {
            price: pow10(1, 9),
            bonus: 4
        },
        {
            price: pow10(6, 9),
            bonus: 4
        },
        {
            price: pow10(3, 11),
            bonus: 6
        },
        {
            price: pow10(12.5, 13),
            bonus: 6
        }
        ]
    },
    {
        id: "steelFoundryConvertAmount",
        idNum: 7,
        iconX: 1,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "converter",
        componentId: "steelFoundry",
        refund: .8,
        levels: [{
            price: pow10(15, 4),
            bonus: 1
        },
        {
            price: pow10(9, 5),
            bonus: 1
        },
        {
            price: pow10(6, 11),
            bonus: 3
        },
        {
            price: pow10(15, 13),
            bonus: 6
        },
        {
            price: pow10(25, 14),
            bonus: 12
        }
        ]
    },
    {
        id: "steelFoundryConvertMoreAmount",
        idNum: 64,
        iconX: 1,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "converterProduceMore",
        componentId: "steelFoundry",
        refund: .8,
        levels: [{
            price: pow10(4, 11),
            bonus: 1
        },
        {
            price: pow10(90, 13),
            bonus: 2
        }
        ]
    },
    {
        id: "steelSellerSellAmount",
        idNum: 9,
        iconX: 2,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "sellerSellAmount",
        componentId: "steelSeller",
        refund: .8,
        levels: [{
            price: pow10(5, 4),
            bonus: 1
        },
        {
            price: pow10(3, 5),
            bonus: 1
        }
        ]
    },
    {
        id: "coalBuyerRunningCost",
        idNum: 6,
        iconX: 0,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "runningCost",
        componentId: "coalBuyer",
        levels: [{
            price: pow10(2, 4),
            bonus: .05
        },
        {
            price: pow10(9, 4),
            bonus: .1
        }
        ]
    },
    {
        id: "steelFoundryRunningCost",
        idNum: 8,
        iconX: 4,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "runningCost",
        componentId: "steelFoundry",
        levels: [{
            price: pow10(3, 4),
            bonus: .05
        },
        {
            price: pow10(1, 5),
            bonus: .1
        }
        ]
    },
    {
        id: "steelSellerRunningCost",
        idNum: 11,
        iconX: 4,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "runningCost",
        componentId: "steelSeller",
        levels: [{
            price: pow10(10, 4),
            bonus: .05
        },
        {
            price: pow10(50, 4),
            bonus: .1
        }
        ]
    },
    {
        id: "steelSellerSellPrice",
        idNum: 10,
        iconX: 3,
        iconY: 0,
        requiresResearch: "steelComponents",
        type: "sellerSellPrice",
        componentId: "steelSeller",
        levels: [{
            price: pow10(9, 4),
            bonus: .1
        },
        {
            price: pow10(4, 5),
            bonus: .1
        }
        ]
    },
    {
        id: "oilBuyerBuyAmount",
        idNum: 12,
        iconX: 0,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "buyer",
        componentId: "oilBuyer",
        refund: .8,
        levels: [{
            price: pow10(9, 5),
            bonus: 1
        },
        {
            price: pow10(3, 8),
            bonus: 6
        },
        {
            price: pow10(4, 9),
            bonus: 4
        },
        {
            price: pow10(3, 11),
            bonus: 12
        }
        ]
    },
    {
        id: "gasBuyerBuyAmount",
        idNum: 14,
        iconX: 0,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "buyer",
        componentId: "gasBuyer",
        refund: .8,
        levels: [{
            price: pow10(1.2, 6),
            bonus: 1
        },
        {
            price: pow10(4, 8),
            bonus: 2
        },
        {
            price: pow10(8, 8),
            bonus: 4
        },
        {
            price: pow10(2, 9),
            bonus: 4
        },
        {
            price: pow10(2, 11),
            bonus: 12
        }
        ]
    },
    {
        id: "plasticMakerConvertAmount",
        idNum: 16,
        iconX: 1,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "converter",
        componentId: "plasticMaker",
        refund: .8,
        levels: [{
            price: pow10(12, 6),
            bonus: 1
        },
        {
            price: pow10(5, 9),
            bonus: 1
        },
        {
            price: pow10(6, 11),
            bonus: 3
        }
        ]
    },
    {
        id: "plasticMakerConvertMoreAmount",
        idNum: 63,
        iconX: 1,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "converterProduceMore",
        componentId: "plasticMaker",
        refund: .8,
        levels: [{
            price: pow10(1, 12),
            bonus: 1
        }]
    },
    {
        id: "plasticSellerSellAmount",
        idNum: 18,
        iconX: 2,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "sellerSellAmount",
        componentId: "plasticSeller",
        refund: .8,
        levels: [{
            price: pow10(1.2, 7),
            bonus: 3
        },
        {
            price: pow10(9.5, 9),
            bonus: 2
        }
        ]
    },
    {
        id: "oilBuyerRunningCost",
        idNum: 13,
        iconX: 4,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "runningCost",
        componentId: "oilBuyer",
        levels: [{
            price: pow10(6, 5),
            bonus: .05
        },
        {
            price: pow10(5, 8),
            bonus: .05
        }
        ]
    },
    {
        id: "gasBuyerRunningCost",
        idNum: 15,
        iconX: 4,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "runningCost",
        componentId: "gasBuyer",
        levels: [{
            price: pow10(4, 5),
            bonus: .05
        },
        {
            price: pow10(1, 8),
            bonus: .1
        }
        ]
    },
    {
        id: "plasticMakerRunningCost",
        idNum: 17,
        iconX: 4,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "runningCost",
        componentId: "plasticMaker",
        levels: [{
            price: pow10(9, 5),
            bonus: .05
        },
        {
            price: pow10(6, 8),
            bonus: .1
        }
        ]
    },
    {
        id: "plasticSellerRunningCost",
        idNum: 20,
        iconX: 4,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "runningCost",
        componentId: "plasticSeller",
        levels: [{
            price: pow10(7, 5),
            bonus: .05
        },
        {
            price: pow10(3, 8),
            bonus: .05
        }
        ]
    },
    {
        id: "plasticSellerSellPrice",
        idNum: 19,
        iconX: 3,
        iconY: 0,
        requiresResearch: "plasticComponents",
        type: "sellerSellPrice",
        componentId: "plasticSeller",
        levels: [{
            price: pow10(9, 6),
            bonus: .1
        },
        {
            price: pow10(1, 9),
            bonus: .05
        }
        ]
    },
    {
        id: "siliconBuyerBuyAmount",
        idNum: 21,
        iconX: 0,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "buyer",
        componentId: "siliconBuyer",
        refund: .8,
        levels: [{
            price: pow10(8, 8),
            bonus: 1
        },
        {
            price: pow10(1, 9),
            bonus: 1
        },
        {
            price: pow10(5, 11),
            bonus: 3
        },
        {
            price: pow10(3, 13),
            bonus: 6
        }
        ]
    },
    {
        id: "electronicsMakerConvertAmount",
        idNum: 23,
        iconX: 1,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "converter",
        componentId: "electronicsMaker",
        refund: .8,
        levels: [{
            price: pow10(4, 8),
            bonus: 1
        },
        {
            price: pow10(3, 9),
            bonus: 1
        }
        ]
    },
    {
        id: "electronicsMakerConvertMoreAmount",
        idNum: 65,
        iconX: 1,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "converterProduceMore",
        componentId: "electronicsMaker",
        refund: .8,
        levels: [{
            price: pow10(1.5, 12),
            bonus: 1
        }]
    },
    {
        id: "electronicsSellerSellAmount",
        idNum: 25,
        iconX: 2,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "sellerSellAmount",
        componentId: "electronicsSeller",
        refund: .8,
        levels: [{
            price: pow10(2, 8),
            bonus: 1
        },
        {
            price: pow10(2, 9),
            bonus: 1
        }
        ]
    },
    {
        id: "siliconBuyerRunningCost",
        idNum: 22,
        iconX: 4,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "runningCost",
        componentId: "siliconBuyer",
        levels: [{
            price: pow10(8, 8),
            bonus: .05
        }]
    },
    {
        id: "electronicsMakerRunningCost",
        idNum: 24,
        iconX: 4,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "runningCost",
        componentId: "electronicsMaker",
        levels: [{
            price: pow10(8, 8),
            bonus: .05
        }]
    },
    {
        id: "electronicsSellerRunningCost",
        idNum: 26,
        iconX: 4,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "runningCost",
        componentId: "electronicsSeller",
        levels: [{
            price: pow10(12, 8),
            bonus: .05
        }]
    },
    {
        id: "electronicsSellerSellPrice",
        idNum: 27,
        iconX: 3,
        iconY: 0,
        requiresResearch: "electronicsComponents",
        type: "sellerSellPrice",
        componentId: "electronicsSeller",
        levels: [{
            price: pow10(2, 8),
            bonus: .05
        },
        {
            price: pow10(4, 8),
            bonus: .05
        },
        {
            price: pow10(6, 8),
            bonus: .05
        },
        {
            price: pow10(1, 10),
            bonus: .05
        }
        ]
    },
    {
        id: "explosivesBuyerBuyAmount",
        idNum: 35,
        iconX: 0,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "buyer",
        componentId: "explosivesBuyer",
        refund: .8,
        levels: [{
            price: pow10(99, 9),
            bonus: 1
        },
        {
            price: pow10(500, 9),
            bonus: 2
        },
        {
            price: pow10(80, 13),
            bonus: 4
        },
        {
            price: pow10(120, 14),
            bonus: 8
        }
        ]
    },
    {
        id: "bulletMakerConvertAmount",
        idNum: 37,
        iconX: 1,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "converter",
        componentId: "bulletMaker",
        refund: .8,
        levels: [{
            price: pow10(220, 9),
            bonus: 1
        },
        {
            price: pow10(600, 9),
            bonus: 2
        },
        {
            price: pow10(35, 13),
            bonus: 4
        }
        ]
    },
    {
        id: "gunMakerConvertAmount",
        idNum: 39,
        iconX: 1,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "converter",
        componentId: "gunMaker",
        refund: .8,
        levels: [{
            price: pow10(450, 9),
            bonus: 1
        },
        {
            price: pow10(250, 10),
            bonus: 6
        },
        {
            price: pow10(90, 13),
            bonus: 8
        }
        ]
    },
    {
        id: "gunSellerSellAmount",
        idNum: 41,
        iconX: 2,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "sellerSellAmount",
        componentId: "gunSeller",
        refund: .8,
        levels: [{
            price: pow10(120, 9),
            bonus: 1
        }]
    },
    {
        id: "explosivesBuyerRunningCost",
        idNum: 36,
        iconX: 4,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "runningCost",
        componentId: "explosivesBuyer",
        levels: [{
            price: pow10(15, 9),
            bonus: .05
        }]
    },
    {
        id: "bulletMakerRunningCost",
        idNum: 38,
        iconX: 4,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "runningCost",
        componentId: "bulletMaker",
        levels: [{
            price: pow10(20, 9),
            bonus: .1
        }]
    },
    {
        id: "gunMakerRunningCost",
        idNum: 40,
        iconX: 4,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "runningCost",
        componentId: "gunMaker",
        levels: [{
            price: pow10(25, 9),
            bonus: .1
        }]
    },
    {
        id: "gunSellerRunningCost",
        idNum: 42,
        iconX: 4,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "runningCost",
        componentId: "gunSeller",
        levels: [{
            price: pow10(15, 9),
            bonus: .1
        }]
    },
    {
        id: "gunSellerSellPrice",
        idNum: 43,
        iconX: 3,
        iconY: 0,
        requiresResearch: "gunComponents",
        type: "sellerSellPrice",
        componentId: "gunSeller",
        levels: [{
            price: pow10(15, 9),
            bonus: .05
        }]
    },
    {
        id: "aluminiumBuyerBuyAmount",
        idNum: 28,
        iconX: 0,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "buyer",
        componentId: "aluminiumBuyer",
        refund: .8,
        levels: [{
            price: pow10(300, 9),
            bonus: 1
        },
        {
            price: pow10(600, 9),
            bonus: 2
        },
        {
            price: pow10(150, 10),
            bonus: 4
        },
        {
            price: pow10(1, 14),
            bonus: 24
        },
        {
            price: pow10(60, 14),
            bonus: 32
        }
        ]
    },
    {
        id: "engineMakerConvertAmount",
        idNum: 30,
        iconX: 1,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "converter",
        componentId: "engineMaker",
        refund: .8,
        levels: [{
            price: pow10(1300, 9),
            bonus: 1
        },
        {
            price: pow10(40, 14),
            bonus: 2
        }
        ]
    },
    {
        id: "engineSellerSellAmount",
        idNum: 32,
        iconX: 2,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "sellerSellAmount",
        componentId: "engineSeller",
        refund: .8,
        levels: [{
            price: pow10(800, 9),
            bonus: 1
        }]
    },
    {
        id: "aluminiumBuyerRunningCost",
        idNum: 29,
        iconX: 4,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "runningCost",
        componentId: "aluminiumBuyer",
        levels: [{
            price: pow10(150, 9),
            bonus: .05
        },
        {
            price: pow10(450, 9),
            bonus: .05
        }
        ]
    },
    {
        id: "engineMakerRunningCost",
        idNum: 31,
        iconX: 4,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "runningCost",
        componentId: "engineMaker",
        levels: [{
            price: pow10(100, 9),
            bonus: .1
        },
        {
            price: pow10(200, 9),
            bonus: .1
        }
        ]
    },
    {
        id: "engineSellerRunningCost",
        idNum: 33,
        iconX: 4,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "runningCost",
        componentId: "engineSeller",
        levels: [{
            price: pow10(50, 9),
            bonus: .1
        },
        {
            price: pow10(150, 9),
            bonus: .1
        }
        ]
    },
    {
        id: "engineSellerSellPrice",
        idNum: 34,
        iconX: 3,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "sellerSellPrice",
        componentId: "engineSeller",
        levels: [{
            price: pow10(150, 9),
            bonus: .05
        },
        {
            price: pow10(250, 9),
            bonus: .05
        },
        {
            price: pow10(450, 9),
            bonus: .05
        }
        ]
    },
    {
        id: "tankHullMakerConvertAmount",
        idNum: 44,
        iconX: 1,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "converter",
        componentId: "tankHullMaker",
        refund: .8,
        levels: [{
            price: pow10(600, 9),
            bonus: 3
        },
        {
            price: pow10(150, 10),
            bonus: 4
        }
        ]
    },
    {
        id: "tankTurretMakerConvertAmount",
        idNum: 46,
        iconX: 1,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "converter",
        componentId: "tankTurretMaker",
        refund: .8,
        levels: [{
            price: pow10(450, 9),
            bonus: 3
        },
        {
            price: pow10(100, 10),
            bonus: 4
        }
        ]
    },
    {
        id: "tankAssemblerConvertAmount",
        idNum: 48,
        iconX: 1,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "converter",
        componentId: "tankAssembler",
        refund: .8,
        levels: [{
            price: pow10(300, 9),
            bonus: 1
        },
        {
            price: pow10(200, 10),
            bonus: 2
        }
        ]
    },
    {
        id: "tankSellerSellAmount",
        idNum: 50,
        iconX: 2,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "sellerSellAmount",
        componentId: "tankSeller",
        refund: .8,
        levels: [{
            price: pow10(400, 9),
            bonus: 3
        },
        {
            price: pow10(620, 10),
            bonus: 4
        }
        ]
    },
    {
        id: "tankHullMakerRunningCost",
        idNum: 45,
        iconX: 4,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "runningCost",
        componentId: "tankHullMaker",
        levels: [{
            price: pow10(400, 9),
            bonus: .05
        },
        {
            price: pow10(200, 10),
            bonus: .05
        }
        ]
    },
    {
        id: "tankTurretMakerRunningCost",
        idNum: 47,
        iconX: 4,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "runningCost",
        componentId: "tankTurretMaker",
        levels: [{
            price: pow10(300, 9),
            bonus: .05
        },
        {
            price: pow10(200, 10),
            bonus: .05
        }
        ]
    },
    {
        id: "tankAssemblerRunningCost",
        idNum: 49,
        iconX: 4,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "runningCost",
        componentId: "tankAssembler",
        levels: [{
            price: pow10(500, 9),
            bonus: .05
        },
        {
            price: pow10(100, 10),
            bonus: .05
        }
        ]
    },
    {
        id: "tankSellerRunningCost",
        idNum: 51,
        iconX: 4,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "runningCost",
        componentId: "tankSeller",
        levels: [{
            price: pow10(350, 9),
            bonus: .05
        },
        {
            price: pow10(150, 10),
            bonus: .05
        }
        ]
    },
    {
        id: "tankSellerSellPrice",
        idNum: 52,
        iconX: 3,
        iconY: 0,
        requiresResearch: "tankComponents",
        type: "sellerSellPrice",
        componentId: "tankSeller",
        levels: [{
            price: pow10(400, 9),
            bonus: .1
        },
        {
            price: pow10(240, 10),
            bonus: .1
        }
        ]
    },
    {
        id: "dieselRefineryConvertAmount",
        idNum: 53,
        iconX: 1,
        iconY: 0,
        requiresResearch: "dieselRefinery",
        type: "converter",
        componentId: "dieselRefinery",
        refund: .8,
        levels: [{
            price: pow10(700, 9),
            bonus: 1
        }]
    },
    {
        id: "dieselRefineryRunningCost",
        idNum: 54,
        iconX: 4,
        iconY: 0,
        requiresResearch: "dieselRefinery",
        type: "runningCost",
        componentId: "dieselRefinery",
        levels: [{
            price: pow10(900, 9),
            bonus: .05
        }]
    },
    {
        id: "jetFuelRefineryConvertAmount",
        idNum: 55,
        iconX: 1,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "converter",
        componentId: "jetFuelRefinery",
        refund: .8,
        levels: [{
            price: pow10(100, 10),
            bonus: 1
        }]
    },
    {
        id: "rocketHullMakerConvertAmount",
        idNum: 57,
        iconX: 1,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "converter",
        componentId: "rocketHullMaker",
        refund: .8,
        levels: [{
            price: pow10(150, 10),
            bonus: 1
        }]
    },
    {
        id: "rocketWarheadMakerConvertAmount",
        idNum: 59,
        iconX: 1,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "converter",
        componentId: "rocketWarheadMaker",
        refund: .8,
        levels: [{
            price: pow10(200, 10),
            bonus: 1
        }]
    },
    {
        id: "rocketAssemblerConvertAmount",
        idNum: 61,
        iconX: 1,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "converter",
        componentId: "rocketAssembler",
        refund: .8,
        levels: [{
            price: pow10(250, 10),
            bonus: 1
        }]
    },
    {
        id: "jetFuelRefineryRunningCost",
        idNum: 56,
        iconX: 4,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "runningCost",
        componentId: "jetFuelRefinery",
        levels: [{
            price: pow10(300, 10),
            bonus: .05
        }]
    },
    {
        id: "rocketHullMakerRunningCost",
        idNum: 58,
        iconX: 4,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "runningCost",
        componentId: "rocketHullMaker",
        levels: [{
            price: pow10(350, 10),
            bonus: .05
        }]
    },
    {
        id: "rocketWarheadMakerRunningCost",
        idNum: 60,
        iconX: 4,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "runningCost",
        componentId: "rocketWarheadMaker",
        levels: [{
            price: pow10(250, 10),
            bonus: .05
        }]
    },
    {
        id: "rocketAssemblerRunningCost",
        idNum: 62,
        iconX: 4,
        iconY: 0,
        requiresResearch: "rocketComponents",
        type: "runningCost",
        componentId: "rocketAssembler",
        levels: [{
            price: pow10(300, 10),
            bonus: .05
        }]
    },
    {
        id: "garbageRemoveAmount",
        idNum: 99,
        iconX: 5,
        iconY: 0,
        description: "",
        requiresResearch: "metalsLab",
        type: "garbage",
        componentId: "garbageCollector",
        levels: [{
            price: pow10(5, 4),
            bonus: 1
        },
        {
            price: pow10(3, 9),
            bonus: 2
        }
        ]
    },
    {
        id: "researchCenterBonus",
        idNum: 100,
        iconX: 6,
        iconY: 0,
        description: "researchCenter",
        requiresResearch: "metalsLab",
        type: "researchCenterBonus",
        componentId: "researchCenter",
        levels: [{
            price: pow10(5, 5),
            bonus: .1
        },
        {
            price: pow10(5, 7),
            bonus: .2
        },
        {
            price: pow10(5, 8),
            bonus: .2
        },
        {
            price: pow10(1.1, 10),
            bonus: .25
        },
        {
            price: pow10(2.8, 10),
            bonus: .25
        },
        {
            price: pow10(1.2, 11),
            bonus: .5
        },
        {
            price: pow10(9.4, 11),
            bonus: .5
        },
        {
            price: pow10(200, 12),
            bonus: 1.5
        },
        {
            price: pow10(100, 13),
            bonus: 1.5
        },
        {
            price: pow10(10, 14),
            bonus: 6
        }
        ]
    },
    {
        id: "researchCenterMaxStock",
        idNum: 101,
        iconX: 7,
        iconY: 0,
        description: "研究中心max papers",
        requiresResearch: "metalsLab",
        type: "researchCenterMaxStock",
        componentId: "researchCenter",
        levels: [{
            price: pow10(5, 5),
            bonus: 1
        },
        {
            price: pow10(1, 8),
            bonus: 1
        },
        {
            price: pow10(1, 9),
            bonus: 1
        },
        {
            price: pow10(3, 9),
            bonus: 2
        },
        {
            price: pow10(9, 9),
            bonus: 2
        },
        {
            price: pow10(4, 11),
            bonus: 4
        },
        {
            price: pow10(5, 13),
            bonus: 3
        },
        {
            price: pow10(6, 14),
            bonus: 5
        }
        ]
    },
    {
        id: "analystCenterConvertMore",
        idNum: 102,
        iconX: 1,
        iconY: 0,
        requiresResearch: "engineComponents",
        type: "converterProduceMore",
        componentId: "analystCenter",
        refund: .8,
        levels: [{
            price: pow10(2, 11),
            bonus: 1
        },
        {
            price: pow10(400, 13),
            bonus: 2
        }
        ]
    }
    ]
}
const achievements = [{
    id: "makingProfit",
    idNum: 1,
    name: "盈利!",
    spriteX: 3,
    spriteY: 0,
    bonus: {
        type: "custom",
        description: "解锁研究"
    },
    tests: [{
        type: "avgMoneyIncome",
        amount: 1.4
    }]
},
{
    id: "collectingCash",
    idNum: 2,
    name: "收集一些现金",
    spriteX: 2,
    spriteY: 0,
    bonus: {
        type: "custom",
        description: "解锁额外"
    },
    tests: [{
        type: "amountOfMoney",
        amount: 25e3
    }]
},
{
    id: "gettingSmarter",
    idNum: 3,
    name: "变得更聪明",
    spriteX: 2,
    spriteY: 0,
    bonus: {
        type: "custom",
        description: "解锁升级"
    },
    tests: [{
        type: "researched",
        researchId: "researchCenter"
    }]
}
];
for (var t = 1; t <= 20; t++) achievements.push({
    id: "money" + t,
    idNum: 4 + t,
    name: "赚钱",
    spriteX: 2,
    spriteY: 0,
    requiresAchievement: t > 1 ? "money" + (t - 1) : null,
    bonus: {
        type: "money",
        amount: 250 * Math.pow(10, t)
    },
    tests: [{
        type: "amountOfMoney",
        amount: 1e3 * Math.pow(10, t)
    }]
});
const main = {
    id: 0,
    name: "Main idle",
    version: 1,
    startingMoney: 2e3,
    minNegativeMoney: -1e4,
    startingResearchPoints: 0,
    maxBonusTicks: 7200,
    minBonusTicks: 50,
    offlineSlower: 5,
    resources: resources,
    components: components.components,
    componentsSelection: components.selection,
    productionTree: components.productionTree,
    factories: factories,
    research: research,
    upgrades: upgrades.upgrades,
    upgradesLayout: upgrades.layout,
    achievements: achievements
}
const Ruleset = {
    prepareMeta(e) {
        e.componentsById = {}
        e.componentsByIdNum = [];
        for (var t in e.components) {
            if (e.componentsById[e.components[t].id])
                throw new Error("Component with id " + e.components[t].id + " 已存在!");
            if (e.componentsByIdNum[e.components[t].idNum])
                throw new Error("Component with idNum " + e.components[t].idNum + " 已存在!");
            e.componentsById[e.components[t].id] = e.components[t],
                e.componentsByIdNum[e.components[t].idNum] = e.components[t];
        }
        e.factoriesById = {}
        e.factoriesByIdNum = [];
        for (var t in e.factories) {
            if (e.factoriesById[e.factories[t].id])
                throw new Error("Factory with id " + e.factories[t].id + " 已存在!");
            if (e.factoriesByIdNum[e.factories[t].idNum])
                throw new Error("Factory with idNum " + e.factories[t].idNum + " 已存在!");
            e.factoriesById[e.factories[t].id] = e.factories[t],
                e.factoriesByIdNum[e.factories[t].idNum] = e.factories[t];
            var n = e.factories[t];
            n.areasById = {}
            n.areasByIdNum = [];
            for (var t in n.areas) {
                if (n.areasById[n.areas[t].id])
                    throw new Error("Factory " + t + " area with id " + n.areas[t].id + " 已存在!");
                if (n.areasByIdNum[n.areas[t].idNum])
                    throw new Error("Factory " + t + " area with idNum " + n.areas[t].idNum + " 已存在!");
                n.areasById[n.areas[t].id] = n.areas[t],
                    n.areasByIdNum[n.areas[t].idNum] = n.areas[t];
                for (var r in n.areas[t].locations) {
                    var i = n.areas[t].locations[r];
                    i.width = i.x2 - i.x + 1
                    i.height = i.y2 - i.y + 1;
                }
            }
        }
        e.resourcesById = {}
        e.resourcesByIdNum = [];
        for (var t in e.resources) {
            if (e.resourcesById[e.resources[t].id])
                throw new Error("Resource with id " + e.resources[t].id + " 已存在!");
            if (e.resourcesByIdNum[e.resources[t].idNum])
                throw new Error("Resource with idNum " + e.resources[t].idNum + " 已存在!");
            e.resourcesById[e.resources[t].id] = e.resources[t]
            e.resourcesByIdNum[e.resources[t].idNum] = e.resources[t]
        }
        e.researchById = {}
        e.researchByIdNum = [];
        for (var t in e.research) {
            if (e.researchById[e.research[t].id])
                throw new Error("Research with id " + e.research[t].id + " 已存在!");
            if (e.researchByIdNum[e.research[t].idNum])
                throw new Error("Research with idNum " + e.research[t].idNum + " 已存在!");
            e.researchById[e.research[t].id] = e.research[t]
            e.researchByIdNum[e.research[t].idNum] = e.research[t]
        }
        e.upgradesById = {}
        e.upgradesByIdNum = [];
        for (var t in e.upgrades) {
            if (e.upgradesById[e.upgrades[t].id])
                throw new Error("Upgrade with id " + e.upgrades[t].id + " 已存在!");
            if (e.upgradesByIdNum[e.upgrades[t].idNum])
                throw new Error("Upgrade with idNum " + e.upgrades[t].idNum + " 已存在!");
            e.upgradesById[e.upgrades[t].id] = e.upgrades[t]
            e.upgradesByIdNum[e.upgrades[t].idNum] = e.upgrades[t]
        }
        e.achievementsById = {}
        e.achievementsByIdNum = [];
        for (var t in e.achievements) {
            if (e.achievementsById[e.achievements[t].id])
                throw new Error("Achievement with id " + e.achievements[t].id + " 已存在!");
            if (e.achievementsByIdNum[e.achievements[t].idNum])
                throw new Error("Achievement with idNum " + e.achievements[t].idNum + " 已存在!");
            e.achievementsById[e.achievements[t].id] = e.achievements[t]
            e.achievementsByIdNum[e.achievements[t].idNum] = e.achievements[t]
        }
        return e;
    }
}
const mission1 = {
    id: "mission1",
    name: "挑战 1",
    description: "把铁均匀地装入铁铸造厂",
    isMission: true,
    version: 1,
    startingMoney: 1e5,
    startingResearchPoints: 0,
    resources: [{
        id: "ironOre",
        idNum: 1,
        name: "铁矿石",
        nameShort: "铁矿石",
        spriteX: 0,
        spriteY: 0
    },
    {
        id: "iron",
        idNum: 2,
        name: "铁",
        nameShort: "铁",
        spriteX: 1,
        spriteY: 0
    }
    ],
    componentsSelection: [
        ["transportLine", "ironBuyer", "ironFoundry"]
    ],
    productionTree: [],
    components: [{
        id: "transportLine",
        idNum: 1,
        name: "传送带",
        width: 1,
        height: 1,
        spriteX: 0,
        spriteY: 0,
        iconX: 1,
        iconY: 0,
        drawStrategy: "track",
        buildByDragging: true,
        canBuildToPartial: true,
        runningCostPerTick: 0,
        price: 10,
        priceRefund: 1,
        strategy: {
            type: "transport",
            queueSize: 2
        }
    },
    {
        id: "ironBuyer",
        idNum: 2,
        name: "铁矿石购买机",
        width: 2,
        height: 2,
        spriteX: 4,
        spriteY: 0,
        iconX: 2,
        iconY: 0,
        runningCostPerTick: 0,
        price: 50,
        priceRefund: 1,
        strategy: {
            type: "buyer",
            purchaseResources: {
                ironOre: {
                    price: 0,
                    amount: 1
                }
            },
            outputResourcesOrder: ["ironOre"],
            interval: 10
        }
    },
    {
        id: "ironFoundry",
        idNum: 3,
        name: "铸铁厂",
        width: 4,
        height: 2,
        spriteX: 0,
        spriteY: 0,
        iconX: 3,
        iconY: 0,
        runningCostPerTick: 0,
        price: 150,
        priceRefund: 1,
        requiresResearch: null,
        strategy: {
            type: "converter",
            inputResources: {
                ironOre: {
                    perOutputResource: 2
                }
            },
            production: {
                iron: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["iron"],
            interval: 10
        }
    }
    ],
    factories: [{
        id: "mission",
        idNum: 1,
        name: "Mission",
        tilesX: 15,
        tilesY: 15,
        terrains: {
            G: "grass",
            X: "wall",
            ".": "road",
            " ": "floor"
        },
        buildableTerrains: {
            floor: true
        },
        terrainMap: "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGXX XGGX XXGGGGGX  XGGX  XGGGGGX  XXXX  XGGGGGXX      XXGGGGGX        XGGGGGX        XGGGGGX        XGGGGGX        XGGGGGXXXXXXXXXXGGG...............GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
        buildMap: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX XXXX XXXXXXXX  XXXX  XXXXXXX  XXXX  XXXXXXXX      XXXXXXXX        XXXXXXX        XXXXXXX        XXXXXXX        XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        areas: [],
        startComponents: [{
            id: "ironBuyer",
            x: 3,
            y: 4
        },
        {
            id: "ironBuyer",
            x: 9,
            y: 4
        },
        {
            id: "ironFoundry",
            x: 5,
            y: 7
        },
        {
            id: "ironFoundry",
            x: 3,
            y: 9
        },
        {
            id: "ironFoundry",
            x: 7,
            y: 9
        }
        ],
        transportLineConnections: []
    }],
    research: [],
    upgrades: [],
    achievements: []
}
const mission2 = {
    id: "mission2",
    name: "挑战 2",
    description: "迅速得到很多钱!",
    isMission: true,
    version: 1,
    startingMoney: 1e5,
    startingResearchPoints: 0,
    resources: [{
        id: "ironOre",
        idNum: 1,
        name: "铁矿石",
        nameShort: "铁矿石",
        spriteX: 0,
        spriteY: 0
    },
    {
        id: "iron",
        idNum: 2,
        name: "铁",
        nameShort: "铁",
        spriteX: 1,
        spriteY: 0
    }
    ],
    componentsSelection: [
        ["transportLine", "ironBuyer", "ironFoundry"]
    ],
    productionTree: [],
    components: [{
        id: "transportLine",
        idNum: 1,
        name: "传送带",
        width: 1,
        height: 1,
        spriteX: 0,
        spriteY: 0,
        iconX: 1,
        iconY: 0,
        drawStrategy: "track",
        buildByDragging: true,
        canBuildToPartial: true,
        runningCostPerTick: 0,
        price: 10,
        priceRefund: 1,
        strategy: {
            type: "transport",
            queueSize: 2
        }
    },
    {
        id: "ironBuyer",
        idNum: 2,
        name: "铁矿石购买机",
        width: 2,
        height: 2,
        spriteX: 4,
        spriteY: 0,
        iconX: 2,
        iconY: 0,
        runningCostPerTick: 0,
        price: 50,
        priceRefund: 1,
        strategy: {
            type: "buyer",
            purchaseResources: {
                ironOre: {
                    price: 0,
                    amount: 1
                }
            },
            outputResourcesOrder: ["ironOre"],
            interval: 10
        }
    },
    {
        id: "ironFoundry",
        idNum: 3,
        name: "铸铁厂",
        width: 4,
        height: 2,
        spriteX: 0,
        spriteY: 0,
        iconX: 3,
        iconY: 0,
        runningCostPerTick: 0,
        price: 150,
        priceRefund: 1,
        requiresResearch: null,
        strategy: {
            type: "converter",
            inputResources: {
                ironOre: {
                    perOutputResource: 2
                }
            },
            production: {
                iron: {
                    amount: 1
                }
            },
            outputResourcesOrder: ["iron"],
            interval: 10
        }
    }
    ],
    factories: [{
        id: "mission",
        idNum: 1,
        name: "Mission",
        tilesX: 15,
        tilesY: 15,
        terrains: {
            G: "grass",
            X: "wall",
            ".": "road",
            " ": "floor"
        },
        buildableTerrains: {
            floor: true
        },
        terrainMap: "                                                                                                                                                                                                                                 ",
        buildMap: "                                                                                                                                                                                                                                 ",
        areas: [],
        startComponents: [{
            id: "ironBuyer",
            x: 3,
            y: 4
        },
        {
            id: "ironBuyer",
            x: 9,
            y: 4
        },
        {
            id: "ironFoundry",
            x: 5,
            y: 7
        },
        {
            id: "ironFoundry",
            x: 3,
            y: 9
        },
        {
            id: "ironFoundry",
            x: 7,
            y: 9
        }
        ],
        transportLineConnections: []
    }],
    research: [],
    upgrades: [],
    achievements: []
}
const Meta = {
    main: Ruleset.prepareMeta(main),
    missions: {
        mission1: Ruleset.prepareMeta(mission1),
        mission2: Ruleset.prepareMeta(mission2)
    },
    productsLayout: products.layout,
    products: products.items,
    timeTravelTicketValue: products.timeTravelTicketValue,
    productsById: {},
    productsByIdNum: []
};
for (var o in Meta.products) {
    if (Meta.productsById[Meta.products[o].id]) throw new Error("Purchase with id " + Meta.products[o].id + " 已存在!");
    if (Meta.productsByIdNum[Meta.products[o].idNum]) throw new Error("Purchase with idNum " + Meta.products[o].idNum + " 已存在!");
    Meta.productsById[Meta.products[o].id] = Meta.products[o]
    Meta.productsByIdNum[Meta.products[o].idNum] = Meta.products[o]
}
const config = {
    userHash: {
        key: "FactoryIdleUserHash"
    },
    imageMap: {
        path: ""
    },
    //devicePixelRatio: window.devicePixelRatio || 1,
    api: {
        server: {
            url: "https://api.baldurans.com/factoryIdle"
        },
        armorGames: {
            gameKey: ""
        },
        local: {
            storageKey: "FactoryIdleLocal"
        }
    },
    saveManager: {
        cloudSaveIntervalMs: 9e5,
        localSaveIntervalMs: 5e3
    },
    main: {
        warnToStoreUserHashAfterTicks: {
            1e4: true,
            1e5: true,
            1e6: true
        }
    }
}
const GlobalUiEvent = {
    KEY_PRESS: "KEY_PRESS",
    FOCUS: "FOCUS",
    BLUR: "BLUR",
    SHOW_MAIN_GAME: "SHOW_MAIN_GAME",
    SHOW_MISSIONS: "SHOW_MISSIONS",
    SHOW_MISSION: "SHOW_MISSION"
}
const GameUiEvent = {
    SHOW_FACTORY: "SHOW_FACTORY",
    SHOW_FACTORIES: "SHOW_FACTORIES",
    SHOW_RESEARCH: "SHOW_RESEARCH",
    SHOW_UPGRADES: "SHOW_UPGRADES",
    SHOW_ACHIEVEMENTS: "SHOW_ACHIEVEMENTS",
    SHOW_HELP: "SHOW_HELP",
    SHOW_STATISTICS: "SHOW_STATISTICS",
    SHOW_PURCHASES: "SHOW_PURCHASES",
    SHOW_SETTINGS: "SHOW_SETTINGS",
    SHOW_TIME_TRAVEL: "SHOW_TIME_TRAVEL"
}
const GameEvent = {
    GAME_TICK: "GAME_TICK",
    MONEY_UPDATED: "MONEY_UPDATED",
    RESEARCH_POINTS_UPDATED: "RESEARCH_POINTS_UPDATED",
    ACHIEVEMENT_RECEIVED: "ACHIEVEMENT_RECEIVED",
    TOGGLE_TICKS: "TOGGLE_TICKS",
    TICKS_STOPPED: "TICKS_STOPPED",
    TICKS_STARTED: "TICKS_STARTED",
    BONUS_TICKS_UPDATED: "BONUS_TICKS_UPDATED",
    TIME_TRAVEL_TICKETS_UPDATED: "TIME_TRAVEL_TICKETS_UPDATED",
    FOCUS: "FOCUS",
    BLUR: "BLUR",
    RESEARCH_BOUGHT: "RESEARCH_BOUGHT",
    BACKGROUND_MODE_ACTIVATED: "BACKGROUND_MODE_ACTIVATED",
    BACKGROUND_MODE_DISABLED: "BACKGROUND_MODE_DISABLED"
}
const FactoryEvent = {
    FACTORY_COMPONENTS_CHANGED: "FACTORY_COMPONENTS_CHANGED",
    TILE_TYPE_CHANGED: "TILE_TYPE_CHANGED",
    FACTORY_TICK: "FACTORY_TICK",
    FACTORY_MOUSE_OUT: "FACTORY_MOUSE_OUT",
    FACTORY_MOUSE_MOVE: "FACTORY_MOUSE_MOVE",
    FACTORY_MOUSE_DOWN: "FACTORY_MOUSE_DOWN",
    FACTORY_MOUSE_UP: "FACTORY_MOUSE_UP",
    FACTORY_SCROLL_START: "FACTORY_SCROLL_START",
    FACTORY_SCROLL_END: "FACTORY_SCROLL_END",
    COMPONENT_META_SELECTED: "COMPONENT_META_SELECTED",
    HOVER_COMPONENT_META: "HOVER_COMPONENT_META",
    MAP_TOOL_SELECTED: "MAP_TOOL_SELECTED",
    COMPONENT_SELECTED: "COMPONENT_SELECTED",
    REFRESH_COMPONENT_INFO: "REFRESH_COMPONENT_INFO",
    UPGRADE_BOUGHT: "UPGRADE_BOUGHT",
    OPEN_SCREENSHOT_VIEW: "OPEN_SCREENSHOT_VIEW"
}
const ApiEvent = {}
const InputOutput = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left"
};
class InputOutputManager {
    constructor(tile, cb) {
        this.tile = tile
        this.changedCallback = cb
        this.inputsList = []
        this.inputsByDirection = {
            top: null,
            right: null,
            bottom: null,
            left: null
        }
        this.outputsList = []
        this.outputsByDirection = {
            top: null,
            right: null,
            bottom: null,
            left: null
        }
        this.reset()
    }
    reset() {
        this.clearInput("top")
        this.clearInput("right")
        this.clearInput("bottom")
        this.clearInput("left")
        this.clearOutput("top")
        this.clearOutput("right")
        this.clearOutput("bottom")
        this.clearOutput("left")
    }
    setInput(t) {
        if (this.inputsByDirection[t]) return;
        this.clearOutput(t);
        var n = this.tile.getTileInDirection(t);
        this.inputsByDirection[t] = n
        this._updateInputOutputLists()
        n.getInputOutputManager().setOutput(InputOutput[t])
        this.changedCallback()
    }
    setOutput(t) {
        if (this.outputsByDirection[t]) return;
        this.clearInput(t)
        var n = this.tile.getTileInDirection(t)
        this.outputsByDirection[t] = n
        this._updateInputOutputLists()
        n.getInputOutputManager().setInput(InputOutput[t])
        this.changedCallback()
    }
    clearInput(t) {
        if (!this.inputsByDirection[t]) return;
        var n = this.inputsByDirection[t]
        this.inputsByDirection[t] = null
        n.getInputOutputManager().clearOutput(InputOutput[t])
        this._updateInputOutputLists()
        this.changedCallback()
    }
    clearOutput(t) {
        if (!this.outputsByDirection[t]) return;
        var n = this.outputsByDirection[t]
        this.outputsByDirection[t] = null
        n.getInputOutputManager().clearInput(InputOutput[t])
        this._updateInputOutputLists()
        this.changedCallback()
    }
    _updateInputOutputLists() {
        this.inputsList = []
        this.inputsByDirection.top && this.inputsList.push(this.inputsByDirection.top)
        this.inputsByDirection.right && this.inputsList.push(this.inputsByDirection.right)
        this.inputsByDirection.bottom && this.inputsList.push(this.inputsByDirection.bottom)
        this.inputsByDirection.left && this.inputsList.push(this.inputsByDirection.left)
        this.outputsList = []
        this.outputsByDirection.top && this.outputsList.push(this.outputsByDirection.top)
        this.outputsByDirection.right && this.outputsList.push(this.outputsByDirection.right)
        this.outputsByDirection.bottom && this.outputsList.push(this.outputsByDirection.bottom)
        this.outputsByDirection.left && this.outputsList.push(this.outputsByDirection.left)
    }
    getInputsList() {
        return this.inputsList;
    }
    getInputsByDirection() {
        return this.inputsByDirection;
    }
    getOutputsList() {
        return this.outputsList;
    }
    getOutputsByDirection() {
        return this.outputsByDirection;
    }
    exportToWriter(e) {
        var t = (new BinaryBoolean).writeAll(this.inputsByDirection.top, this.inputsByDirection.right, this.inputsByDirection.bottom, this.inputsByDirection.left, this.outputsByDirection.top, this.outputsByDirection.right, this.outputsByDirection.bottom, this.outputsByDirection.left);
        e.writeBooleanMap(t);
    }
    importFromReader(e, t) {
        var n = e.readBooleanMap();
        n.readBoolean() && this.setInput("top")
        n.readBoolean() && this.setInput("right")
        n.readBoolean() && this.setInput("bottom")
        n.readBoolean() && this.setInput("left")
        n.readBoolean() && this.setOutput("top")
        n.readBoolean() && this.setOutput("right")
        n.readBoolean() && this.setOutput("bottom")
        n.readBoolean() && this.setOutput("left")
    }
}
const Packages = [];
class Package {
    constructor(resourceId, amount, n) {
        this.resourceId = resourceId
        if (!n) throw new Error("Missing argument factory");
        this.meta = n.getGame().getMeta().resourcesById[resourceId]
        this.offset = Math.round(Math.random() * 4) - 2
        this.amount = amount
    }
    static getNew(n, r, i) {
        return Packages.length > 0 ? Packages.pop() : new Package(n, r, i);
    }
    static free(t) {
        Packages.push(t);
    }
    static staticExportData(e, t) {
        e ? (t.writeUint8(e.getResourceIdNum()), t.writeUint8(e.getAmount())) : t.writeUint8(0);
    }
    static createFromExport(e, n, r) {
        var i = n.readUint8();
        if (i == 0) return null;
        var s = r >= 6 ? n.readUint8() : 1, o = e.getGame().getMeta().resourcesByIdNum[i];
        return o ? Package.getNew(o.id, s, e) : null;
    }
    getResourceId() {
        return this.resourceId;
    }
    getResourceIdNum() {
        return this.meta.idNum;
    }
    toString() {
        return this.resourceId;
    }
    getOffset() {
        return this.offset;
    }
    getAmount() {
        return this.amount;
    }
}
class ResourceOutput {
    constructor(component, handledResources, outputResourcesOrder) {
        this.component = component
        this.handledResources = handledResources
        this.outputResourcesOrder = outputResourcesOrder
        this.reset()
    }
    static getMetaOutputAmount(e, t) {
        return 1 + t.getUpgradesManager().getBonuses().packageSizeBonus + t.getUpgradesManager().getComponentBonuses(e.id).packageSizeBonus;
    }
    reset() {
        this.resources = {};
        for (var e = 0; e < this.outputResourcesOrder.length; e++) {
            this.resources[this.outputResourcesOrder[e]] = 0;
        }
        this.outResourceSelectionIndex = 0
        this.distributeTileIndex = 0;
    }
    updateWithDescriptionData(e) {
        e.stock || (e.stock = []);
        var t = this.component.getFactory().getGame().getMeta().resourcesById;
        for (var resourceId in this.resources) {
            e.stock.push({
                resourceId: resourceId,
                resourceName: t[resourceId].nameShort,
                amount: this.resources[resourceId],
                max: this.getMax(resourceId)
            });
        }

    }
    getMax(e) {
        var t = this.component.getMeta();
        return this.handledResources[e].max * this.component.getFactory().getUpgradesManager().getComponentBonuses(t.applyUpgradesFrom ? t.applyUpgradesFrom : t.id).maxStorageBonus;
    }
    getOutputAmount() {
        return ResourceOutput.getMetaOutputAmount(this.component.getMeta(), this.component.getFactory());
    }
    distribute() {
        var t = this.component.getSurroundedOutputTiles();
        for (var n = 0; n < t.length; n++) {
            var r = this._getNextOutputResource();
            if (!r) break;
            var i = t[this.distributeTileIndex];
            this.distributeTileIndex = (this.distributeTileIndex + 1) % t.length;
            var s = i.tile.getComponent().getStrategy().getInputQueue(i.oppositeDirection);
            if (s.getFirst() != null) continue;
            var o = this.getOutputAmount();
            s.setFirst(new Package(r, o, this.component.getFactory()))
            this.resources[r] -= o
            this.outResourceSelectionIndex = (this.outResourceSelectionIndex + 1) % this.outputResourcesOrder.length
        }
    }
    _getNextOutputResource() {
        for (var e = 0; e < this.outputResourcesOrder.length; e++) {
            var t = this.outputResourcesOrder[(this.outResourceSelectionIndex + e) % this.outputResourcesOrder.length];
            if (this.resources[t] >= this.getOutputAmount())
                return t;
        }
        this.outResourceSelectionIndex = 0
        return null;
    }
    addResource(e, t) {
        this.resources[e] += t;
    }
    getResource(e) {
        return this.resources[e];
    }
    toString() {
        var e = "OUT outIndex:" + this.distributeTileIndex + " resIndex:" + this.outResourceSelectionIndex + "<br />";
        for (var t in this.resources)
            e += t + ": " + this.resources[t] + "<br />";
        return e;
    }
    exportToWriter(e) {
        var t = 0;
        for (var n in this.resources) {
            t++;
        }
        e.writeUint8(t);
        for (var n in this.resources) {
            e.writeUint32(this.resources[n]);
        }
        e.writeUint8(this.outResourceSelectionIndex)
        e.writeUint8(this.distributeTileIndex);
    }
    importFromReader(e, t) {
        var n = e.readUint8(), r = 0;
        for (var i in this.resources) {
            if (r >= n)
                break;
            this.resources[i] = e.readUint32()
            r++;
        }
        this.outResourceSelectionIndex = e.readUint8()
        this.distributeTileIndex = e.readUint8()
    }
}
class DelayedAction {
    constructor(interval) {
        this.interval = interval
        this.reset()
        this.calculateEfficiencyInterval = 50
    }
    reset() {
        this.timer = 0
        this.efficiency = null
        this.workingTime = 0
        this.totalTime = 0
    }
    updateWithDescriptionData(e) {
        e.effectivenessStr = this.efficiency !== null ? Math.round(this.efficiency) + "%" : "-";
    }
    canStart() {
        throw new Error("canStart方法未重写");
    }
    start() {
        throw new Error("start方法未重写");
    }
    finished() {
        throw new Error("finished方法未重写");
    }
    getEfficiency() {
        return this.efficiency;
    }
    calculate(e) {
        this.timer > 0 && (this.timer >= this.interval && (this.finished(e), this.timer = -1), this.timer++)
        this.timer == 0 && this.canStart() && (this.start(e), this.timer = 1)
        this.totalTime >= this.calculateEfficiencyInterval && (this.efficiency = Math.round(this.workingTime * 100 / this.totalTime), this.totalTime = 0, this.workingTime = 0)
        this.totalTime++
        this.timer > 0 && this.workingTime++
    }
    toString() {
        var e = "PRODUCTION<br />";
        e += "Efficiency: " + (this.efficiency === null ? "..." : this.efficiency + "%") + "<br />"
        this.timer == 0 ? e += "Idle<br />" : e += this.timer + "/" + this.interval + "<br />"
        return e;
    }
    exportToWriter(e) {
        e.writeUint8(this.timer);
    }
    importFromReader(e, t) {
        this.timer = e.readUint8();
    }
}
class Buyer {
    constructor(component, meta) {
        this.component = component
        this.game = this.component.getFactory().getGame()
        this.meta = meta
        this.outResourcesManager = new ResourceOutput(component, meta.purchaseResources, meta.outputResourcesOrder)
        this.producer = new DelayedAction(this.meta.interval)
        this.producer.canStart = this.canBuy.bind(this)
        this.producer.start = this.preparePurchase.bind(this)
        this.producer.finished = this.finishPurchase.bind(this);
    }
    static getMetaBuyPrice(e, t, n) {
        return e.strategy.purchaseResources[t].price * n.getGame().getProfitMultiplier();
    }
    static getMetaBuyAmount(e, t, n) {
        return e.strategy.purchaseResources[t].amount * n.getUpgradesManager().getComponentBonuses(e.id).buyAmountBonus;
    }
    static getMetaDescriptionData(t, r, i) {
        var s = t.strategy,
            o = [],
            u = 0,
            a = r.getGame().getMeta().resourcesById,
            f = 0;
        for (var l in s.purchaseResources) {
            var c = Buyer.getMetaBuyAmount(t, l, r);
            u += c * Buyer.getMetaBuyPrice(t, l, r)
            o.push("<span class='" + l + "'><b>" + Buyer.getMetaBuyAmount(t, l, r) + "</b> " + a[l].name.lcFirst() + "</span>")
            f = Math.max(f, c);
        }
        return {
            interval: s.interval,
            purchasePrice: nf(u),
            buyStr: arrayToHumanStr(o),
            noOfOutputs: Math.ceil(f / s.interval / ResourceOutput.getMetaOutputAmount(t, r))
        };
    }
    getBuyPrice(e) {
        return Buyer.getMetaBuyPrice(this.component.getMeta(), e, this.component.getFactory());
    }
    getBuyAmount(e) {
        return Buyer.getMetaBuyAmount(this.component.getMeta(), e, this.component.getFactory());
    }
    getDescriptionData() {
        var e = Buyer.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        this.producer.updateWithDescriptionData(e)
        this.outResourcesManager.updateWithDescriptionData(e)
        return e;
    }
    clearContents() {
        this.outResourcesManager.reset()
        this.producer.reset()
    }
    calculateOutputTick(e) {
        this.producer.calculate(e)
        this.outResourcesManager.distribute()
    }
    calculatePurchasePrice() {
        var e = 0;
        for (var t in this.meta.purchaseResources) {
            e += this.getBuyAmount(t) * this.getBuyPrice(t);
        }
        return e;
    }
    canBuy() {
        for (var e in this.meta.purchaseResources)
            if (this.outResourcesManager.getResource(e) + this.getBuyAmount(e) > this.outResourcesManager.getMax(e))
                return false;
        return true;
    }
    preparePurchase(e) {
        e.resourceCosts += this.calculatePurchasePrice();
    }
    finishPurchase(e) {
        for (var t in this.meta.purchaseResources)
            this.outResourcesManager.addResource(t, this.getBuyAmount(t));
    }
    toString() {
        return this.outResourcesManager.toString() + "<br />" + this.producer.toString() + "<br />"
    }
    exportToWriter(e) {
        this.outResourcesManager.exportToWriter(e)
        this.producer.exportToWriter(e)
    }
    importFromReader(e, t) {
        this.outResourcesManager.importFromReader(e, t)
        this.producer.importFromReader(e, t)
    }
}
class TransportStackingQueue {
    constructor(e, tile) {
        this.queue = new Array(e)
        this.tile = tile
    }
    reset() {
        for (var e = 0; e < this.queue.length; e++)
            this.set(e, undefined);
    }
    forward() {
        for (var e = this.queue.length - 2; e >= 0; e--)
            this.queue[e + 1] || (this.queue[e + 1] = this.queue[e], this.queue[e] = undefined);
    }
    setFirst(e) {
        this.queue[0] = e;
    }
    unsetFirst() {
        this.setFirst(undefined);
    }
    setLast(e) {
        this.queue[this.queue.length - 1] = e;
    }
    unsetLast() {
        this.setLast(undefined);
    }
    getLast() {
        return this.queue[this.queue.length - 1];
    }
    getFirst() {
        return this.queue[0];
    }
    getQueue() {
        return this.queue;
    }
    get(e) {
        return this.queue[e];
    }
    set(e, t) {
        this.queue[e] = t ? t : undefined;
    }
    getLength() {
        return this.queue.length;
    }
    toString() {
        return this.queue.join(",");
    }
    exportToWriter(t) {
        for (var n = 0; n < this.queue.length; n++) {
            Package.staticExportData(this.queue[n], t);
        }
    }
    importFromReader(t, n) {
        for (var r = 0; r < this.queue.length; r++) {
            this.set(r, Package.createFromExport(this.tile.getFactory(), t, n));
        }
    }
}
class Transport {
    constructor(component, meta) {
        this.component = component
        this.meta = meta
        this.tile = this.component.getMainTile()
        this.reset()
    }
    static getMetaDescriptionData(e, t, n) {
        var r = e.strategy;
        return {};
    }
    clearContents() {
        this.updateInputsOutputs();
    }
    reset() {
        this.inputQueueOffset = 0
        this.inputQueuesList = []
        this.inputQueues = {}
        this.outputQueueOffset = 0
        this.outputQueuesList = []
        this.outputQueues = {}
        this.isBridge = false
    }
    getDescriptionData() {
        return Transport.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
    }
    updateInputsOutputs() {
        this.reset();
        var t = this.component.getMainTile(),
            n = t.getInputOutputManager().getInputsByDirection();
        for (var r in n) {
            if (n[r]) {
                var i = new TransportStackingQueue(this.meta.queueSize, this.tile);
                this.inputQueuesList.push(i)
                this.inputQueues[r] = i
            }
        }
        var s = t.getInputOutputManager().getOutputsByDirection();
        for (var o in s) {
            if (s[o]) {
                var i = new TransportStackingQueue(this.meta.queueSize, this.tile);
                this.outputQueuesList.push(i),
                    this.outputQueues[o] = i;
            }
        }
        var u = this.outputQueues.top && this.inputQueues.bottom || this.outputQueues.bottom && this.inputQueues.top,
            a = this.outputQueues.left && this.inputQueues.right || this.outputQueues.right && this.inputQueues.left;
        this.isBridge = u && a;
    }
    getOutputQueues(e) {
        return this.outputQueues;
    }
    getOutputQueue(e) {
        return this.outputQueues[e];
    }
    getInputQueues(e) {
        return this.inputQueues;
    }
    getInputQueue(e) {
        return this.inputQueues[e];
    }
    calculateTransport() {
        this.isBridge ? (this.moveInternalInputsToOutputsBridge("top", "bottom"), this.moveInternalInputsToOutputsBridge("left", "right")) : this.moveInternalInputsToOutputs()
        this.pullFromOutsideToInputs("top", this.inputQueues.top)
        this.pullFromOutsideToInputs("right", this.inputQueues.right)
        this.pullFromOutsideToInputs("bottom", this.inputQueues.bottom)
        this.pullFromOutsideToInputs("left", this.inputQueues.left)
    }
    moveInternalInputsToOutputsBridge(e, t) {
        if (this.inputQueues[t]) {
            var n = e;
            e = t
            t = n;
        }
        var r = this.inputQueues[e],
            i = this.outputQueues[t],
            s = r.getLast();
        s && !i.getFirst() && (i.setFirst(s), r.unsetLast())
        r.forward();
    }
    moveInternalInputsToOutputs() {
        var e = 0;
        for (var t = 0; t < this.inputQueuesList.length; t++) {
            var n = this.inputQueuesList[(this.inputQueueOffset + t) % this.inputQueuesList.length], r = n.getLast();
            if (r) {
                for (var i = 0; i < this.outputQueuesList.length; i++) {
                    var s = (this.outputQueueOffset + i) % this.outputQueuesList.length;
                    if (!this.outputQueuesList[s].getFirst()) {
                        this.outputQueueOffset = (this.outputQueueOffset + 1) % this.outputQueuesList.length
                        this.outputQueuesList[s].setFirst(r)
                        n.unsetLast()
                        e++;
                        break;
                    }
                }
            }
            n.forward();
        }
        this.inputQueueOffset = (this.inputQueueOffset + e) % this.inputQueuesList.length;
    }
    pullFromOutsideToInputs(e, n) {
        if (!n) return;
        var r = this.tile.getTileInDirection(e), i = r.getComponent();
        if (i.getMeta().strategy.type == "transport") {
            var s = i.getStrategy().getOutputQueue(InputOutput[e]);
            !n.getFirst() && s.getLast() && (n.setFirst(s.getLast()), s.unsetLast())
            s.forward()
        }
    }
    toString() {
        var e = "IN offset:" + this.inputQueueOffset + "<br />";
        for (var t in this.inputQueues) {
            var n = "", r = this.inputQueues[t].getQueue();
            for (var i = 0; i < r.length; i++)
                n += (r[i] ? r[i].getResourceId() : "") + ",";
            e += t + ": " + n + "<br />";
        }
        e += "<br />"
        e += "OUT offset:" + this.outputQueueOffset + "<br />";
        for (var t in this.outputQueues) {
            var r = this.outputQueues[t].getQueue(), n = "";
            for (var i = 0; i < r.length; i++)
                n += (r[i] ? r[i].getResourceId() : "") + ",";
            e += t + ": " + n + "<br />";
        }
        return e;
    }
    exportToWriter(e) {
        var t = function (t) {
            t && t.exportToWriter(e);
        };
        e.writeUint8(this.inputQueueOffset)
        e.writeUint8(this.outputQueueOffset)
        t(this.inputQueues.top)
        t(this.inputQueues.right)
        t(this.inputQueues.bottom)
        t(this.inputQueues.left)
        t(this.outputQueues.top)
        t(this.outputQueues.right)
        t(this.outputQueues.bottom)
        t(this.outputQueues.left)
    }
    importFromReader(e, t) {
        var n = function (n) {
            n && n.importFromReader(e, t);
        };
        this.inputQueueOffset = e.readUint8()
        this.outputQueueOffset = e.readUint8()
        n(this.inputQueues.top)
        n(this.inputQueues.right)
        n(this.inputQueues.bottom)
        n(this.inputQueues.left)
        n(this.outputQueues.top)
        n(this.outputQueues.right)
        n(this.outputQueues.bottom)
        n(this.outputQueues.left)
    }
}
class ResourceIntake {
    constructor(component, inputResources) {
        this.component = component
        this.inputResources = inputResources
        this.reset()
    }
    reset() {
        this.resources = {}
        this.inputTileIndex = [];
        for (var resource in this.inputResources) {
            this.resources[resource] = 0
            this.inputTileIndex.push({
                resource: resource,
                offset: 0
            });
        }

    }
    updateWithDescriptionData(e) {
        e.stock || (e.stock = []);
        var t = this.component.getFactory().getGame().getMeta().resourcesById;
        for (var resourceId in this.inputResources) {
            var r = this.inputResources[resourceId], i = true;
            r.requiresResearch && (i = this.component.getFactory().getGame().getResearchManager().getResearch(r.requiresResearch) > 0)
            i && e.stock.push({
                resourceId: resourceId,
                resourceName: t[resourceId].nameShort,
                amount: this.resources[resourceId],
                max: this.getMax(resourceId)
            });
        }
    }
    getMax(e) {
        var t = this.component.getMeta();
        return this.inputResources[e].max * this.component.getFactory().getUpgradesManager().getComponentBonuses(t.applyUpgradesFrom ? t.applyUpgradesFrom : t.id).maxStorageBonus;
    }
    takeIn() {
        var e = this.component.getSurroundedInputTiles();
        for (var t = 0; t < this.inputTileIndex.length; t++) {
            var n = this.inputTileIndex[t].resource, r = this.inputTileIndex[t].offset, i = r;
            for (var s = 0; s < e.length; s++) {
                if (this.resources[n] >= this.getMax(n))
                    break;
                var o = e[(r + s) % e.length], u = o.tile.getComponent().getStrategy().getOutputQueue(o.direction), a = u.getLast();
                a && a.getResourceId() == n && (u.unsetLast(), i = (r + s + 1) % e.length, this.resources[a.getResourceId()] += a.getAmount());
            }
            this.inputTileIndex[t].offset = i;
        }
        for (var f = 0; f < e.length; f++)
            e[f].tile.getComponent().getStrategy().getOutputQueue(e[f].direction).forward();
    }
    addResource(e, t) {
        this.resources[e] += t;
    }
    getResource(e) {
        return this.resources[e];
    }
    toString() {
        var e = "IN<br />";
        for (var t in this.inputTileIndex)
            e += this.inputTileIndex[t].resource + ": " + this.resources[this.inputTileIndex[t].resource] + " (offset:" + this.inputTileIndex[t].offset + " )<br />";
        return e;
    }
    exportToWriter(e) {
        e.writeUint8(this.inputTileIndex.length);
        for (var t = 0; t < this.inputTileIndex.length; t++)
            e.writeUint32(this.resources[this.inputTileIndex[t].resource]),
                e.writeUint8(this.inputTileIndex[t].offset);
    }
    importFromReader(e, t) {
        var n = Math.min(this.inputTileIndex.length, e.readUint8());
        for (var r = 0; r < n; r++)
            this.resources[this.inputTileIndex[r].resource] = e.readUint32(),
                this.inputTileIndex[r].offset = e.readUint8();
    }
}
class Converter {
    constructor(component, meta) {
        this.component = component
        this.meta = meta
        this.inResourcesManager = new ResourceIntake(component, meta.inputResources, meta.production)
        this.outResourcesManager = new ResourceOutput(component, meta.production, meta.outputResourcesOrder)
        this.producer = new DelayedAction(this.meta.interval)
        this.producer.canStart = this.canStartProduction.bind(this)
        this.producer.start = this.startProduction.bind(this)
        this.producer.finished = this.finishedProduction.bind(this)
    }
    static getMetaUseAmount(e, t, n) {
        return e.strategy.inputResources[t].perOutputResource * n.getUpgradesManager().getComponentBonuses(e.id).convertAmountBonus;
    }
    static getMetaProduceAmount(e, t, n) {
        return e.strategy.production[t].amount * n.getUpgradesManager().getComponentBonuses(e.id).convertAmountBonus * n.getUpgradesManager().getComponentBonuses(e.id).convertProduceMoreBonus;
    }
    static getMetaDescriptionData(e, n, i) {
        var s = e.strategy, o = n.getGame().getMeta().resourcesById, u = [], a = [], f = [];
        for (var l in s.inputResources)
            u.push("<span class='" + l + "'><b>" + Converter.getMetaUseAmount(e, l, n) + "</b> " + o[l].name.lcFirst() + "</span>");
        var c = 0;
        for (var l in s.production)
            if (Converter.isProducing(n.getGame(), s, l)) {
                var h = Converter.getMetaProduceAmount(e, l, n);
                a.push("<span class='" + l + "'><b>" + h + "</b> " + o[l].name.lcFirst() + "</span>"),
                    c = Math.max(c, h);
            }
        return {
            interval: s.interval,
            inputStr: arrayToHumanStr(u),
            outputStr: arrayToHumanStr(a),
            storageStr: arrayToHumanStr(f),
            noOfOutputs: Math.ceil(c / s.interval / ResourceOutput.getMetaOutputAmount(e, n))
        };
    }
    static isProducing(e, t, n) {
        return !t.productionRemoveResearch || !t.productionRemoveResearch[n] ? true : !e.getResearchManager().getResearch(t.productionRemoveResearch[n]);
    }
    clearContents() {
        this.inResourcesManager.reset(),
            this.outResourcesManager.reset(),
            this.producer.reset();
    }
    getUseAmount(e) {
        return Converter.getMetaUseAmount(this.component.getMeta(), e, this.component.getFactory());
    }
    getProduceAmount(e) {
        return Converter.getMetaProduceAmount(this.component.getMeta(), e, this.component.getFactory());
    }
    getDescriptionData() {
        var e = Converter.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        return this.producer.updateWithDescriptionData(e),
            this.inResourcesManager.updateWithDescriptionData(e),
            this.outResourcesManager.updateWithDescriptionData(e),
            e;
    }
    calculateInputTick() {
        this.inResourcesManager.takeIn();
    }
    calculateOutputTick() {
        this.producer.calculate(),
            this.outResourcesManager.distribute();
    }
    canStartProduction() {
        for (var e in this.meta.inputResources)
            if (this.inResourcesManager.getResource(e) < this.getUseAmount(e))
                return false;
        for (var e in this.meta.production)
            if (this.outResourcesManager.getResource(e) + this.getProduceAmount(e) > this.outResourcesManager.getMax(e))
                return false;
        return true;
    }
    startProduction() {
        for (var e in this.meta.inputResources)
            this.inResourcesManager.addResource(e, -this.getUseAmount(e));
    }
    finishedProduction() {
        for (var e in this.meta.production)
            Converter.isProducing(this.component.getFactory().getGame(), this.meta, e) && this.outResourcesManager.addResource(e, this.getProduceAmount(e));
    }
    toString() {
        var e = this.inResourcesManager.toString() + "<br />";
        return e += this.outResourcesManager.toString() + "<br />",
            e += this.producer.toString() + "<br />",
            e;
    }
    exportToWriter(e) {
        this.outResourcesManager.exportToWriter(e),
            this.inResourcesManager.exportToWriter(e),
            this.producer.exportToWriter(e);
    }
    importFromReader(e, t) {
        this.outResourcesManager.importFromReader(e, t),
            this.inResourcesManager.importFromReader(e, t),
            this.producer.importFromReader(e, t);
    }
}
class Seller {
    constructor(component, meta) {
        this.component = component
        this.meta = meta
        this.game = this.component.getFactory().getGame()
        this.inResourcesManager = new ResourceIntake(component, meta.resources)
        this.producer = new DelayedAction(this.meta.interval)
        this.producer.canStart = this.canStartSaleProcess.bind(this)
        this.producer.start = this.startSale.bind(this)
        this.producer.finished = this.finishSale.bind(this)
    }
    static getMetaSellAmount(e, t, n) {
        return e.strategy.resources[t].amount * n.getUpgradesManager().getComponentBonuses(e.id).sellAmountBonus;
    }
    static getMetaSellPrice(e, t, n) {
        return e.strategy.resources[t].sellPrice * (1 + e.strategy.resources[t].sellMargin) * n.getUpgradesManager().getComponentBonuses(e.id).sellPriceBonus * n.getGame().getProfitMultiplier();
    }
    static getMetaDescriptionData(e, t, r) {
        var i = e.strategy, s = [], o = [], u = 0, a = t.getGame().getMeta().resourcesById;
        for (var f in i.resources) {
            var l = Seller.getMetaSellAmount(e, f, t) * Seller.getMetaSellPrice(e, f, t), c = Seller.getMetaSellAmount(e, f, t), h = true;
            i.resources[f].requiresResearch && (h = t.getGame().getResearchManager().getResearch(i.resources[f].requiresResearch) > 0),
                i.resources[f].bonus ? h && o.push("<span class='" + f + "'><b>" + c + "</b> " + a[f].name.lcFirst() + "</span> adds <b class='money'>$" + nf(l) + "</b>") : (u += l, s.push("<span class='" + f + "'><b>" + c + "</b> " + a[f].name.lcFirst() + "</span>"));
        }
        return {
            isSeller: true,
            interval: i.interval,
            sellPrice: nf(u),
            sellStr: arrayToHumanStr(s),
            bonusStr: o.join(", ")
        };
    }
    clearContents() {
        this.inResourcesManager.reset(),
            this.producer.reset();
    }
    getSellAmount(e) {
        return Seller.getMetaSellAmount(this.component.getMeta(), e, this.component.getFactory());
    }
    getSellPrice(e) {
        return Seller.getMetaSellPrice(this.component.getMeta(), e, this.component.getFactory());
    }
    getDescriptionData() {
        var e = Seller.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        return this.producer.updateWithDescriptionData(e),
            this.inResourcesManager.updateWithDescriptionData(e),
            e;
    }
    calculateInputTick(e) {
        this.inResourcesManager.takeIn(),
            this.producer.calculate(e);
    }
    canStartSaleProcess() {
        for (var e in this.meta.resources)
            if (!this.meta.resources[e].bonus && this.inResourcesManager.getResource(e) < this.getSellAmount(e))
                return false;
        return true;
    }
    startSale(e) { }
    finishSale(e) {
        for (var t in this.meta.resources) {
            var n = this.getSellAmount(t);
            this.inResourcesManager.getResource(t) >= n && (this.inResourcesManager.addResource(t, -n), e.resourceSales += n * this.getSellPrice(t));
        }
    }
    toString() {
        var e = this.inResourcesManager.toString() + "<br />";
        return e += this.producer.toString() + "<br />",
            e;
    }
    exportToWriter(e) {
        this.inResourcesManager.exportToWriter(e),
            this.producer.exportToWriter(e);
    }
    importFromReader(e, t) {
        this.inResourcesManager.importFromReader(e, t),
            this.producer.importFromReader(e, t);
    }
}
class Garbage {
    constructor(component, meta) {
        this.component = component
        this.meta = meta
        this.game = this.component.getFactory().getGame()
        this.noOfItems = 0
        this.inputTileIndex = 0
        this.removeAmount = 0
        this.producer = new DelayedAction(this.meta.interval)
        this.producer.canStart = this.canRemove.bind(this)
        this.producer.start = this.startRemoval.bind(this)
        this.producer.finished = this.finishRemoval.bind(this)
    }
    static getMetaMax(e, t) {
        return e.strategy.max * t.getUpgradesManager().getComponentBonuses(e.id).maxStorageBonus;
    }
    static getMetaRemoveAmount(e, t) {
        return e.strategy.removeAmount * t.getUpgradesManager().getComponentBonuses(e.id).removeAmountBonus;
    }
    static getMetaDescriptionData(e, n, r) {
        var i = e.strategy;
        return {
            interval: i.interval,
            removeAmount: Garbage.getMetaRemoveAmount(e, n),
            max: r ? r.getMax() : Garbage.getMetaMax(e, n)
        };
    }
    clearContents() {
        this.noOfItems = 0
        this.inputTileIndex = 0
        this.removeAmount = 0
        this.producer.reset()
    }
    getMax() {
        return Garbage.getMetaMax(this.component.getMeta(), this.component.getFactory());
    }
    getRemoveAmount() {
        return Garbage.getMetaRemoveAmount(this.component.getMeta(), this.component.getFactory());
    }
    getDescriptionData() {
        var e = Garbage.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        return this.producer.updateWithDescriptionData(e),
            e.noOfItems = this.noOfItems,
            e;
    }
    calculateInputTick() {
        this.takeIn()
        this.producer.calculate();
    }
    takeIn() {
        var e = this.component.getSurroundedInputTiles(), t = this.inputTileIndex;
        for (var n = 0; n < e.length; n++) {
            var r = e[(this.inputTileIndex + n) % e.length], i = r.tile.getComponent().getStrategy().getOutputQueue(r.direction), s = i.getLast();
            s && this.noOfItems < this.getMax() && (i.unsetLast(), t = (this.inputTileIndex + n + 1) % e.length, this.noOfItems++),
                i.forward();
        }
        this.inputTileIndex = t;
    }
    canRemove() {
        return this.noOfItems >= this.getRemoveAmount();
    }
    startRemoval() {
        this.removeAmount = Math.min(this.noOfItems, this.getRemoveAmount());
    }
    finishRemoval() {
        this.noOfItems -= this.removeAmount,
            this.removeAmount = 0;
    }
    toString() {
        var e = "No of items: " + this.noOfItems + "<br />";
        e += this.producer.toString()
        this.removeAmount > 0 && (e += "Removing " + this.removeAmount + " items")
        e += "<br />"
        return e;
    }
    exportToWriter(e) {
        e.writeUint32(this.noOfItems)
        e.writeUint8(this.inputTileIndex)
        e.writeUint32(this.removeAmount)
        this.producer.exportToWriter(e)
    }
    importFromReader(e, t) {
        this.noOfItems = e.readUint32()
        this.inputTileIndex = e.readUint8()
        this.removeAmount = e.readUint32()
        this.producer.importFromReader(e, t)
    }
}
class Sorter {
    constructor(component, meta) {
        this.component = component
        this.meta = meta
        this.inputTileIndex = 0
        this.inItem = null
        this.inSortingItem = null
        this.outItem = null
        this.distributeTileIndexes = {
            "default": 0
        }
        this.sortingIndex = {};
        for (var r in this.component.getMeta().allowedOutputs)
            this.sortingIndex[r] = null;
        this.producer = new DelayedAction(this.meta.interval)
        this.producer.canStart = this.canStartSorting.bind(this)
        this.producer.start = this.startSorting.bind(this)
        this.producer.finished = this.finishedSorting.bind(this)
    }
    static getMetaDescriptionData(e, t, n) {
        return {};
    }
    clearContents() {
        this.inputTileIndex = 0,
            this.inItem = null,
            this.inSortingItem = null,
            this.outItem = null,
            this.distributeTileIndexes = {
                "default": 0
            };
        for (var e in this.sortingIndex)
            this.sortingIndex[e] && (this.distributeTileIndexes[this.sortingIndex[e]] = 0);
        this.producer.reset();
    }
    getDescriptionData() {
        var e = Sorter.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        this.producer.updateWithDescriptionData(e)
        return e;
    }
    getSortingIndex() {
        return this.sortingIndex;
    }
    setSortingResource(e, t, n) {
        this.sortingIndex[e + ":" + t] = n,
            this.clearContents();
    }
    getSortingResource(e, t) {
        return this.sortingIndex[e + ":" + t];
    }
    calculateInputTick() {
        if (this.inItem != null)
            return;
        var e = this.component.getSurroundedInputTiles(), t = this.inputTileIndex;
        for (var n = 0; n < e.length; n++) {
            var r = e[(this.inputTileIndex + n) % e.length], i = r.tile.getComponent().getStrategy().getOutputQueue(r.direction), s = i.getLast();
            s && !this.inItem && (i.unsetLast(), t = (this.inputTileIndex + n + 1) % e.length, this.inItem = s),
                i.forward();
        }
        this.inputTileIndex = t;
    }
    calculateOutputTick() {
        this.producer.calculate()
        this.moveItemOut()
    }
    moveItemOut() {
        if (!this.outItem)
            return;
        var e = this.outItem.getResourceId();
        this.distributeTileIndexes[e] === undefined && (e = "default");
        var t = this.component.getSurroundedOutputTiles();
        for (var n = 0; n < t.length; n++) {
            var r = t[this.distributeTileIndexes[e]];
            this.distributeTileIndexes[e] = (this.distributeTileIndexes[e] + 1) % t.length;
            var i = r.from.getX() - this.component.getX(), s = r.from.getY() - this.component.getY(), o = this.sortingIndex[i + ":" + s];
            if (o && o != this.outItem.getResourceId() || !o && this.distributeTileIndexes[this.outItem.getResourceId()] !== undefined)
                continue;
            var u = r.tile.getComponent().getStrategy().getInputQueue(r.oppositeDirection);
            if (u.getFirst() != null)
                continue;
            u.setFirst(this.outItem),
                this.outItem = null;
            break;
        }
    }
    canStartSorting() {
        return !this.outItem && this.inItem;
    }
    startSorting() {
        this.inSortingItem = this.inItem,
            this.inItem = null;
    }
    finishedSorting() {
        this.outItem = this.inSortingItem,
            this.inSortingItem = null,
            this.moveItemOut();
    }
    toString() {
        var e = "";
        e += "Next: " + (this.inItem ? this.inItem.getResourceId() : "-") + "<br />",
            e += "Sorting: " + (this.inSortingItem ? this.inSortingItem.getResourceId() : "-") + "<br />",
            e += "Out: " + (this.outItem ? this.outItem.getResourceId() : "-") + "<br />",
            e += this.producer.toString() + "<br />",
            e += "Sort rules: <br />";
        for (var t in this.sortingIndex)
            e += t + ": " + this.sortingIndex[t] + "<br />";
        e += "<br />",
            e += "Input index: " + this.inputTileIndex + "<br />",
            e += "Out indexes: <br />";
        for (var t in this.distributeTileIndexes)
            e += t + ": " + this.distributeTileIndexes[t] + "<br />";
        return e;
    }
    exportToWriter(e) {
        e.writeUint8(this.inputTileIndex),
            Package.staticExportData(this.inItem, e),
            Package.staticExportData(this.inSortingItem, e),
            Package.staticExportData(this.outItem, e),
            e.writeUint8(this.distributeTileIndexes.default);
        for (var t in this.sortingIndex) {
            var n = this.sortingIndex[t], i = 0, s = 0;
            n && (i = this.component.getFactory().getGame().getMeta().resourcesById[n].idNum, s = this.distributeTileIndexes[n]),
                e.writeUint8(i),
                e.writeUint8(s);
        }
        this.producer.exportToWriter(e);
    }
    importFromReader(e, t) {
        this.inputTileIndex = e.readUint8(),
            this.inItem = Package.createFromExport(this.component.getFactory(), e, t),
            this.inSortingItem = Package.createFromExport(this.component.getFactory(), e, t),
            this.outItem = Package.createFromExport(this.component.getFactory(), e, t),
            this.distributeTileIndexes = {},
            this.distributeTileIndexes.
                default = e.readUint8();
        for (var n in this.sortingIndex) {
            var i = e.readUint8();
            this.sortingIndex[n] = i ? this.component.getFactory().getGame().getMeta().resourcesByIdNum[i].id : null,
                this.distributeTileIndexes[this.sortingIndex[n]] = e.readUint8();
        }
        this.producer.importFromReader(e, t);
    }
}
class ResearchCenter {
    constructor(n, r) {
        this.component = n,
            this.meta = r,
            this.game = this.component.getFactory().getGame(),
            this.productionBonus = 0,
            this.inResourcesManager = new ResourceIntake(n, r.resources),
            this.producer = new DelayedAction(this.meta.interval),
            this.producer.canStart = this.canProduce.bind(this),
            this.producer.start = this.startProduction.bind(this),
            this.producer.finished = this.finishProduction.bind(this);
    }
    static getMetaBonus(e, t, n) {
        return e.strategy.resources[t].bonus * n.getUpgradesManager().getComponentBonuses(e.applyUpgradesFrom ? e.applyUpgradesFrom : e.id).researchPaperBonus;
    }
    static getResearchProduction(e, t) {
        return e.strategy.researchProduction * t.getGame().getResearchProductionMultiplier();
    }
    static getMetaDescriptionData(e, t, r) {
        var i = e.strategy, s = t.getGame().getMeta().resourcesById, o = [];
        for (var u in i.resources)
            o.push("<span class='" + u + "'>" + s[u].name.lcFirst() + ": <b>" + nf(ResearchCenter.getMetaBonus(e, u, t)) + "</b></span> ");
        return {
            interval: i.interval,
            bonusStr: arrayToHumanStr(o),
            productionStr: "<span class='research'><b>" + nf(ResearchCenter.getResearchProduction(e, t)) + "</b>研究点数 </span>"
        };
    }
    clearContents() {
        this.inResourcesManager.reset(),
            this.producer.reset();
    }
    getBonus(e) {
        return ResearchCenter.getMetaBonus(this.component.getMeta(), e, this.component.getFactory());
    }
    getDescriptionData() {
        var e = ResearchCenter.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        return this.producer.updateWithDescriptionData(e),
            this.inResourcesManager.updateWithDescriptionData(e),
            e;
    }
    calculateInputTick(e) {
        this.inResourcesManager.takeIn(),
            this.producer.calculate(e);
    }
    canProduce() {
        return true;
    }
    startProduction() {
        var e = 1;
        for (var t in this.meta.resources)
            e += this.inResourcesManager.getResource(t) * this.getBonus(t),
                this.inResourcesManager.addResource(t, -this.inResourcesManager.getResource(t));
        this.productionBonus = e;
    }
    finishProduction(e) {
        e.researchProduction += this.getResearchProduction() * this.productionBonus;
    }
    toString() {
        var e = "";
        return e += this.producer.toString(),
            e += "<br />",
            e;
    }
    exportToWriter(e) {
        e.writeUint32(this.productionBonus),
            this.producer.exportToWriter(e);
    }
    importFromReader(e, t) {
        this.noOfItems = e.readUint32(),
            this.producer.importFromReader(e, t);
    }
    getResearchProduction() {
        return ResearchCenter.getResearchProduction(this.component.getMeta(), this.component.getFactory())
    }
}
class Lab {
    constructor(component, meta) {
        this.component = component
        this.meta = meta
        this.inResourcesManager = new ResourceIntake(component, meta.inputResources)
        this.outResourcesManager = new ResourceOutput(component, meta.production, meta.outputResourcesOrder)
        this.productionBonus = 0
        this.producer = new DelayedAction(this.meta.interval)
        this.producer.canStart = this.canStartProduction.bind(this)
        this.producer.start = this.startProduction.bind(this)
        this.producer.finished = this.finishedProduction.bind(this)
    }
    static getMetaDescriptionData(e, t, n) {
        var i = e.strategy,
            s = t.getGame().getMeta().resourcesById,
            o = [],
            u = [],
            a = [],
            f = [],
            l = 0;
        for (var c in i.inputResources) {
            o.push("<span class='" + c + "'><b>" + i.inputResources[c].perOutputResource + "</b> " + s[c].nameShort.lcFirst() + "</span>")
            a.push("<span class='" + c + "'>" + s[c].nameShort.lcFirst() + ": <b>" + i.inputResources[c].max + "</b></span>")
            f.push("<span class='" + c + "'>" + s[c].nameShort.lcFirst() + ": <b>" + i.inputResources[c].bonus + "</b></span>")
            l += i.inputResources[c].bonus
        }

        for (var c in i.production) {
            if (Lab.isProducing(t.getGame(), i, c)) {
                u.push("<span class='" + c + "'><b>" + i.production[c].amount + "</b> " + s[c].nameShort.lcFirst() + "</span>")
                a.push("<span class='" + c + "'>" + s[c].nameShort.lcFirst() + ": <b>" + i.production[c].max + "</b></span>")
            }
        }

        return {
            interval: i.interval,
            inputStr: arrayToHumanStr(o),
            outputStr: arrayToHumanStr(u),
            storageStr: arrayToHumanStr(a),
            bonusStr: arrayToHumanStr(f),
            maxBonus: l
        };
    }
    static isProducing(e, t, n) {
        return !t.productionRemoveResearch || !t.productionRemoveResearch[n] ? true : !e.getResearchManager().getResearch(t.productionRemoveResearch[n]);
    }
    clearContents() {
        this.inResourcesManager.reset()
        this.outResourcesManager.reset()
        this.producer.reset();
    }
    getDescriptionData() {
        var e = Lab.getMetaDescriptionData(this.component.getMeta(), this.component.getFactory(), this);
        this.producer.updateWithDescriptionData(e)
        this.inResourcesManager.updateWithDescriptionData(e)
        this.outResourcesManager.updateWithDescriptionData(e)
        return e;
    }
    calculateInputTick() {
        this.inResourcesManager.takeIn();
    }
    calculateOutputTick() {
        this.producer.calculate()
        this.outResourcesManager.distribute();
    }
    canStartProduction() {
        for (var e in this.meta.production)
            if (this.outResourcesManager.getResource(e) + this.meta.production[e].amount > this.outResourcesManager.getMax(e))
                return false;
        return true;
    }
    startProduction() {
        var e = 1;
        for (var t in this.meta.inputResources)
            this.inResourcesManager.getResource(t) >= this.meta.inputResources[t].perOutputResource && (this.inResourcesManager.addResource(t, -this.meta.inputResources[t].perOutputResource), e += this.meta.inputResources[t].bonus);
        this.productionBonus = e;
    }
    finishedProduction() {
        for (var e in this.meta.production)
            Lab.isProducing(this.component.getFactory().getGame(), this.meta, e) && this.outResourcesManager.addResource(e, this.meta.production[e].amount * this.productionBonus);
    }
    toString() {
        var e = this.inResourcesManager.toString() + "<br />"
        e += this.outResourcesManager.toString() + "<br />"
        e += this.producer.toString() + "<br />"
        return e;
    }
    exportToWriter(e) {
        e.writeUint32(this.productionBonus)
        this.outResourcesManager.exportToWriter(e)
        this.inResourcesManager.exportToWriter(e)
        this.producer.exportToWriter(e)
    }
    importFromReader(e, t) {
        this.noOfItems = e.readUint32()
        this.outResourcesManager.importFromReader(e, t)
        this.inResourcesManager.importFromReader(e, t)
        this.producer.importFromReader(e, t)
    }
}
const ComponentStrategyFactorys = {
    buyer: Buyer,
    transport: Transport,
    converter: Converter,
    seller: Seller,
    garbage: Garbage,
    sorter: Sorter,
    researchCenter: ResearchCenter,
    lab: Lab
};
const ComponentStrategyFactory = {
    getStrategyClass: function (e) {
        var t = ComponentStrategyFactorys[e];
        if (!t) throw new Error("Unknown component strategy " + e);
        return t
    },
    getForComponent: function (e) {
        var t = this.getStrategyClass(e.getMeta().strategy.type);
        return new t(e, e.getMeta().strategy)
    },
    getMetaDescriptionData: function (e, t) {
        var n = this.getStrategyClass(e.strategy.type);
        return n.getMetaDescriptionData(e, t)
    }
}
class Component {
    constructor(factory, x, y, meta) {
        this.meta = meta
        this.factory = factory
        this.x = x
        this.y = y
        this.strategy = ComponentStrategyFactory.getForComponent(this)
        this.surroundedInputTiles = []
        this.surroundedOutputTiles = []
    }
    static getMetaDescriptionData(n, r, i) {
        var s = ComponentStrategyFactory.getMetaDescriptionData(n, r, i)
        Component._addCommonMetaDescriptionData(s, n, r, i)
        return s;
    }
    static _addCommonMetaDescriptionData(e, n, r, i) {
        e.name = n.name
        e["is" + n.strategy.type.ucFirst()] = true
        e.description = n.description
        e.priceStr = "$" + nf(n.price)
        n.runningCostPerTick && (e.runningCostStr = "$" + nf(Component.getMetaRunningCostPerTick(n, r)) + "/滴答")
    }
    static getMetaRunningCostPerTick(e, t) {
        return e.runningCostPerTick * t.getUpgradesManager().getComponentBonuses(e.applyUpgradesFrom ? e.applyUpgradesFrom : e.id).runningCostPerTickIncrease * t.getUpgradesManager().getComponentBonuses(e.applyUpgradesFrom ? e.applyUpgradesFrom : e.id).runningCostPerTickBonus * t.getGame().getProfitMultiplier();
    }
    getDescriptionData() {
        var e = this.strategy.getDescriptionData();
        Component._addCommonMetaDescriptionData(e, this.meta, this.factory, this.strategy)
        return e;
    }
    getRunningCostPerTick() {
        return Component.getMetaRunningCostPerTick(this.meta, this.factory);
    }
    _checkForSurroundedInputsOutputs(e, t, n) {
        var r = this.factory.getTile(e, t), i = r.getInputOutputManager().getOutputsByDirection()[n];
        i && this.surroundedOutputTiles.push({
            tile: i,
            from: r,
            direction: r.getDirection(i),
            oppositeDirection: i.getDirection(r)
        });
        var s = r.getInputOutputManager().getInputsByDirection()[n];
        s && this.surroundedInputTiles.push({
            tile: s,
            from: r,
            direction: s.getDirection(r),
            oppositeDirection: r.getDirection(s)
        });
    }
    _updateSurroundedTilesCache() {
        this.surroundedInputTiles = [],
            this.surroundedOutputTiles = [];
        for (var e = this.x; e < this.x + this.meta.width; e++)
            this._checkForSurroundedInputsOutputs(e, this.y, "top");
        for (var t = this.y; t < this.y + this.meta.height; t++)
            this._checkForSurroundedInputsOutputs(this.x + this.meta.width - 1, t, "right");
        for (e = this.x + this.meta.width - 1; e >= this.x; e--)
            this._checkForSurroundedInputsOutputs(e, this.y + this.meta.height - 1, "bottom");
        for (t = this.y + this.meta.height - 1; t >= this.y; t--)
            this._checkForSurroundedInputsOutputs(this.x, t, "left");
    }
    outputsInputsChanged() {
        this._updateSurroundedTilesCache()
        this.getStrategy().clearContents()
        this.getStrategy().updateInputsOutputs && this.getStrategy().updateInputsOutputs()
    }
    getSurroundedInputTiles() {
        return this.surroundedInputTiles;
    }
    getSurroundedOutputTiles() {
        return this.surroundedOutputTiles;
    }
    calculateInputTick(e) {
        this.meta.runningCostPerTick > 0 && (e.runningCosts += this.getRunningCostPerTick());
    }
    getFactory() {
        return this.factory;
    }
    getMeta() {
        return this.meta;
    }
    getStrategy() {
        return this.strategy;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getMainTile() {
        return this.factory.getTile(this.x, this.y);
    }
    exportToWriter(e) {
        this.strategy.exportToWriter(e);
    }
    importFromReader(e, t) {
        this.strategy.importFromReader(e, t);
    }
}
const Tile_n = {
    top: [0, -1],
    right: [1, 0],
    bottom: [0, 1],
    left: [-1, 0],
    top_right: [1, -1],
    top_left: [-1, -1],
    bottom_right: [1, 1],
    bottom_left: [-1, 1]
}
const Tile_r = {
    "-10": "top",
    "-1": "left",
    1: "right",
    10: "bottom"
}
class Tile {
    constructor(x, y, r, i, factory) {
        this.id = y * factory.getMeta().tilesX + x
        this.x = x
        this.y = y
        this.factory = factory
        this.setTerrain(i)
        this.setBuildableType(r)
        this.component = null
        this.inputOutputManager = new InputOutputManager(this, () => {
            this.component && this.component.outputsInputsChanged();
        });
    }
    static BUILDABLE_NO = "X"
    static BUILDABLE_YES = " "
    static BUILDABLE_PARTIAL = "-"
    getId() {
        return this.id;
    }
    getIdStr() {
        return this.x + ":" + this.y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    setBuildableType(e) {
        e != Tile.BUILDABLE_YES && e != Tile.BUILDABLE_PARTIAL && (e = Tile.BUILDABLE_NO)
        this.buildableType = e
    }
    getBuildableType() {
        return this.buildableType;
    }
    isPossibleToBuildOnType(e) {
        return this.buildableType == Tile.BUILDABLE_YES || e.canBuildToPartial && this.buildableType == Tile.BUILDABLE_PARTIAL;
    }
    setTerrain(e) {
        this.terrain = e || "grass"
    }
    getTerrain() {
        return this.terrain;
    }
    getInputOutputManager() {
        return this.inputOutputManager;
    }
    getDirection(e) {
        return Tile_r[String((e.getY() - this.y) * 10 + (e.getX() - this.x))];
    }
    getTileInDirection(e) {
        return this.factory.getTile(this.x + Tile_n[e][0], this.y + Tile_n[e][1]);
    }
    isMainComponentContainer() {
        return this.component ? this.component.getX() == this.x && this.component.getY() == this.y : false;
    }
    getFactory() {
        return this.factory;
    }
    getComponent() {
        return this.component;
    }
    setComponent(e) {
        if (e) {
            var n = new Component(this.factory, this.x, this.y, e);
            for (var r = 0; r < e.width; r++) {
                for (var i = 0; i < e.height; i++) {
                    var s = this.factory.getTile(this.x + r, this.y + i);
                    s.component = n;
                }
            }

        } else {
            this.component = null;
        }

        this.inputOutputManager.reset();
    }
    exportToWriter1(e) {
        this.inputOutputManager.exportToWriter(e);
    }
    exportToWriter2(e) {
        this.component.exportToWriter(e);
    }
    importFromReader1(e, t) {
        this.inputOutputManager.importFromReader(e, t);
    }
    importFromReader2(e, t) {
        this.component.importFromReader(e, t);
    }
}
class EventManager {
    constructor(handledEvents, eventTag) {
        this.handledEvents = handledEvents
        this.eventTag = eventTag
        this.events = {}
    }
    addListener(e, t, n) {
        this.handledEvents[t] || logger.warning(this.eventTag, "此事件管理器未配置为处理事件: " + t + ". " + e + " 尝试去监听它。")
        this.events[t] || (this.events[t] = {})
        this.events[t][e] = n
    }
    removeListener(e, t) {
        this.events[t] && this.events[t][e] && delete this.events[t][e];
    }
    removeListenerForType(e) {
        for (var t in this.events)
            for (var n in this.events[t])
                n == e && delete this.events[t][n];
    }
    invokeEvent(e, t, n, r, i, s) {
        if (this.events[e])
            for (var o in this.events[e])
                this.events[e][o] && this.events[e][o](t, n, r, i, s);
    }
}
class AbstractUpgrade {
    constructor(meta, amount, factory) {
        this.meta = meta
        this.amount = amount
        this.factory = factory
    }
    getNextMultiplier() {
        return this.meta.levels[this.amount] ? this.meta.levels[this.amount].bonus : 0
    }
    getTotalMultiplier() {
        var e = 0,
            t = null;
        for (var n = 0; n < this.amount; n++) t = this.meta.levels[n],
            t && (e += t.bonus);
        return e
    }
    getMultiplierStrings(e) {
        var t = this.getNextMultiplier(),
            n = 1 + this.getTotalMultiplier(),
            r = 0;
        t > 0 && (r = (n + t) / n - 1);
        var s = Math.round(r * 1e4) / 100;
        return e ? {
            total: Math.round((n - 1) * 1e4) / 100 + "%",
            next: "<b>" + s + "%</b>"
        } : {
            total: n + "x",
            next: "<b>" + s + "%</b>"
        }
    }
}
class BuyerUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        e.byComponent[this.meta.componentId].runningCostPerTickIncrease += t
        e.byComponent[this.meta.componentId].buyAmountBonus += t
        e.byComponent[this.meta.componentId].maxStorageBonus += t
    }
    getTitle() {
        return "资源组件购买数量";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>增量购买<span class="green">' + t.next + "</span>资源.<br />" + (this.meta.noRunningCost ? "" : '增加运行成本<b class="red">' + t.next + "</b><br />") + "<br />" + "每个组件的产量增加,但费用也按比例同等增加.每个组件的产量增加 => 出售更多资源.<br />" + "<br />" + '<b>当前总计购买资源加成: </b><b class="green">' + t.total + "</b> ";
    }
}

class ConverterUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        e.byComponent[this.meta.componentId].runningCostPerTickIncrease += t
        e.byComponent[this.meta.componentId].convertAmountBonus += t
        e.byComponent[this.meta.componentId].maxStorageBonus += t
    }
    getTitle() {
        return "资源使用和生产数量";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>增量使用和生产<b class="green">' + t.next + "</b>资源.<br />" + (this.meta.noRunningCost ? "" : '增加运行成本<b class="red">' + t.next + "</b><br />") + "<br />" + "每个组件的产量增加,但费用也按比例同等增加.每个组件的产量增加 => 出售更多资源.<br />" + "<br />" + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}

class ConverterProduceMoreUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        e.byComponent[this.meta.componentId].runningCostPerTickIncrease += t
        e.byComponent[this.meta.componentId].convertProduceMoreBonus += t
        e.byComponent[this.meta.componentId].maxStorageBonus += t
    }
    getTitle() {
        return "资源生产数量";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>增量生产<b class="green">' + t.next + "</b>资源.<br />" + (this.meta.noRunningCost ? "" : '增加运行成本<b class="red">' + t.next + "</b><br />") + "<br />" + "每个组件用更少的材料生产更多的资源,但费用也按比例同等增加.每个组件的产量增加 => 出售更多资源.<br />" + "<br />" + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}

class GarbageUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        e.byComponent[this.meta.componentId].removeAmountBonus += t
        e.byComponent[this.meta.componentId].maxStorageBonus += t
    }
    getTitle() {
        return "资源移除数量";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return e.name + "增量移除" + t.next + "物品<br />" + "<br />" + '<b>当前总计加成: </b><b class="green">' + t.total + "</b> ";
    }
}

class PackageSize extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        this.meta.componentId ? e.byComponent[this.meta.componentId].packageSizeBonus += t : e.packageSizeBonus += t;
    }
    getTitle() {
        return "包裹尺寸";
    }
    getDescription() {
        var e = null;
        this.meta.componentId && (e = this.factory.getGame().getMeta().componentsById[this.meta.componentId]);
        var t = this.getMultiplierStrings();
        return "<b>" + (e ? e.name + "增量输出" : "所有组件增量输出") + '</b> <span class="green">' + t.next + "</span>资源到单个包裹.<br />" + "<br />" + "使传送带更有效率,因为它们运输更多的资源.<br />" + "<br />" + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}

class ResearchCenterBonusUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        e.byComponent[this.meta.componentId].runningCostPerTickIncrease += t,
            e.byComponent[this.meta.componentId].researchPaperBonus += t;
    }
    getTitle() {
        return "研究报告加成";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>研究报告加成增加<b class="green">' + t.next + "</b><br />" + "<br />" + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}

class ResearchCenterMaxStock extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        e.byComponent[this.meta.componentId].maxStorageBonus += this.getTotalMultiplier();
    }
    getTitle() {
        return "库存上限";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>库存上限增加<b class="green">' + t.next + "</b><br />" + "<br /> " + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}

class RunningCostUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        e.byComponent[this.meta.componentId].runningCostPerTickBonus -= this.getTotalMultiplier();
    }
    getTitle() {
        return "降低运行成本";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings(true);
        return "<b>" + e.name + '</b>运行成本降低<b class="green">' + t.next + "</b><br />" + "<br />" + '<b>当前总计减少: </b><b class="green">' + t.total + "</b> ";
    }
}

class SellerSellAmountUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        var t = this.getTotalMultiplier();
        e.byComponent[this.meta.componentId].runningCostPerTickIncrease += t,
            e.byComponent[this.meta.componentId].sellAmountBonus += t,
            e.byComponent[this.meta.componentId].maxStorageBonus += t;
    }
    getTitle() {
        return "资源售卖数量";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>增量卖出<b class="green">' + t.next + "</b>资源.<br />" + (this.meta.noRunningCost ? "" : '增加运行成本<b class="red">' + t.next + "</b><br />") + "<br />" + "平均每滴答卖出更多资源 => 更多金钱<br />" + "<br />" + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}

class SellerSellPriceUpgrade extends AbstractUpgrade {
    constructor(meta, amount, factory) {
        super(meta, amount, factory)
    }
    updateMap(e) {
        e.byComponent[this.meta.componentId].sellPriceBonus += this.getTotalMultiplier();
    }
    getTitle() {
        return "资源售卖价格";
    }
    getDescription() {
        var e = this.factory.getGame().getMeta().componentsById[this.meta.componentId], t = this.getMultiplierStrings();
        return "<b>" + e.name + '</b>卖出价格提高<b class="green">' + t.next + "</b>. <br />" + "<br />" + '<b>当前总计增加: </b><b class="green">' + t.total + "</b> ";
    }
}
const upgradesFactorys = {
    buyer: BuyerUpgrade,
    converter: ConverterUpgrade,
    converterProduceMore: ConverterProduceMoreUpgrade,
    garbage: GarbageUpgrade,
    packageSize: PackageSize,
    researchCenterBonus: ResearchCenterBonusUpgrade,
    researchCenterMaxStock: ResearchCenterMaxStock,
    runningCost: RunningCostUpgrade,
    sellerSellAmount: SellerSellAmountUpgrade,
    sellerSellPrice: SellerSellPriceUpgrade
};
const upgradesFactory = {
    getStrategyClass: function (e) {
        var t = upgradesFactorys[e];
        if (!t) throw new Error("Unknown component strategy " + e);
        return t
    },
    getStrategy: function (e, t, n) {
        var r = this.getStrategyClass(e.type);
        return new r(e, t, n)
    }
}
class UpgradesManager {
    constructor(factory) {
        this.factory = factory
        this.game = factory.getGame()
        this.upgrades = {}
        this.isChanged = true
    }
    buildMap() {
        var e = {
            packageSizeBonus: 0,
            byComponent: {}
        };
        for (var t in this.factory.getGame().getMeta().componentsById) {
            e.byComponent[t] = {
                runningCostPerTickIncrease: 1,
                runningCostPerTickBonus: 1,
                buyAmountBonus: 1,
                maxStorageBonus: 1,
                packageSizeBonus: 0,
                convertAmountBonus: 1,
                convertProduceMoreBonus: 1,
                removeAmountBonus: 1,
                researchPaperBonus: 1,
                sellAmountBonus: 1,
                sellPriceBonus: 1
            };
        }

        var n = this.game.getMeta().upgrades;
        for (var r in n)
            this.getStrategy(n[r].id).updateMap(e);
        return e;
    }
    getBonuses() {
        this.isChanged && (this.bonuses = this.buildMap(), this.isChanged = false)
        return this.bonuses;
    }
    getComponentBonuses(e) {
        var t = this.getBonuses();
        return t.byComponent[e];
    }
    setUpgrade(e, t) {
        this.upgrades[e] = t
        this.isChanged = true;
    }
    addUpgrade(e, t) {
        this.setUpgrade(e, this.getUpgrade(e) + t);
    }
    getUpgrade(e) {
        return this.upgrades[e] ? this.upgrades[e] : 0;
    }
    getStrategy(t) {
        var n = this.game.getMeta().upgradesById[t];
        return upgradesFactory.getStrategy(n, this.getUpgrade(t), this.factory);
    }
    getPrice(e, t) {
        t === undefined && (t = this.getUpgrade(e));
        var n = this.game.getMeta().upgradesById[e];
        return n.levels[t] ? n.levels[t].price : 0;
    }
    getSellPrice(e) {
        var t = this.game.getMeta().upgradesById[e];
        return this.getUpgrade(e) <= 0 ? 0 : this.getPrice(e, this.getUpgrade(e) - 1) * t.refund;
    }
    canPurchase(e) {
        return this.couldPurchase(e) ? this.game.getMoney() < this.getPrice(e) ? false : this.isVisible(e) ? true : false : false;
    }
    couldPurchase(e) {
        var t = this.game.getMeta().upgradesById[e];
        return this.getUpgrade(e) >= t.levels.length ? false : true;
    }
    isVisible(e) {
        var t = this.game.getMeta().upgradesById[e];
        return !t.requiresResearch || this.game.getResearchManager().getResearch(t.requiresResearch) > 0 ? true : false;
    }
    canSell(e) {
        if (this.getUpgrade(e) > 0) {
            var t = this.game.getMeta().upgradesById[e];
            return t.refund === undefined || t.refund === null ? false : this.isVisible(e) ? true : false;
        }
        return false;
    }
    exportToWriter() {
        var e = 0;
        for (var t in this.upgrades)
            this.upgrades[t] && e++;
        var n = new BinaryArrayWriter;
        n.writeUint16(e);
        for (var t in this.upgrades)
            this.upgrades[t] > 0 && (n.writeUint16(this.game.getMeta().upgradesById[t].idNum), n.writeUint16(this.upgrades[t]));
        return n;
    }
    importFromReader(e, t) {
        if (e.getLength() == 0)
            return;
        this.upgrades = {};
        var n = e.readUint16();
        for (var r = 0; r < n; r++) {
            var i = e.readUint16(), s = e.readUint16(), o = this.game.getMeta().upgradesByIdNum[i];
            o && (this.upgrades[o.id] = s);
        }
        this.isChanged = true;
    }
}
class AreasManager {
    constructor(factory) {
        this.factory = factory
        this.game = factory.getGame()
        this.boughtAreas = {}
    }
    setAreaBought(e, t) {
        this.boughtAreas[e] = t;
    }
    getIsAreaBought(e) {
        return !!this.boughtAreas[e];
    }
    getPrice(e) {
        return this.factory.getMeta().areasById[e];
    }
    canPurchase(e) {
        return this.game.getMoney() < this.getPrice(e) ? false : true;
    }
    canBuildAt(e, t, n, r) {
        for (var i = 0; i < this.factory.getMeta().areas.length; i++) {
            var s = this.factory.getMeta().areas[i];
            for (var o = 0; o < s.locations.length; o++) {
                var u = s.locations[o], a = !(u.x >= e + n || u.x + u.width <= e || u.y >= t + r || u.y + u.height <= t);
                if (a && !this.boughtAreas[s.id])
                    return false;
            }
        }
        return true;
    }
    exportToWriter() {
        var e = 0;
        for (var t in this.boughtAreas)
            e++;
        var n = new BinaryArrayWriter;
        n.writeUint8(e);
        for (var t in this.boughtAreas)
            n.writeUint8(this.factory.getMeta().areasById[t].idNum);
        return n;
    }
    importFromReader(e, t) {
        if (e.getLength() == 0)
            return;
        this.boughtAreas = {};
        var n = e.readUint8();
        for (var r = 0; r < n; r++) {
            var i = e.readUint8();
            this.setAreaBought(this.factory.getMeta().areasByIdNum[i].id, true);
        }
    }
}
class BuyComponentAction {
    constructor(tile, componentMeta) {
        this.tile = tile,
            this.factory = tile.getFactory(),
            this.componentMeta = componentMeta;
    }
    static possibleToBuy(e, t) {
        return !t.requiresResearch || e.getGame().getResearchManager().getResearch(t.requiresResearch) > 0 ? true : false;
    }
    canBuy() {
        return this.factory.isPossibleToBuildOnTypeWithSize(this.tile.getX(), this.tile.getY(), this.componentMeta.width, this.componentMeta.height, this.componentMeta) ? this.componentMeta.price > this.factory.getGame().getMoney() ? false : BuyComponentAction.possibleToBuy(this.factory, this.componentMeta) ? this.factory.getAreasManager().canBuildAt(this.tile.getX(), this.tile.getY(), this.componentMeta.width, this.componentMeta.height) ? true : false : false : false;
    }
    buy() {
        this.factory.getGame().addMoney(-this.componentMeta.price)
        this.buyFree()
    }
    buyFree() {
        this.tile.setComponent(this.componentMeta)
        this.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_COMPONENTS_CHANGED, this.tile);
    }
}
class UpdateComponentInputOutputAction {
    constructor(fromTile, toTile) {
        this.fromTile = fromTile
        this.toTile = toTile
        this.factory = this.fromTile.getFactory()
    }
    canUpdate() {
        if (!this.fromTile.getComponent() || !this.toTile.getComponent() || this.fromTile.getComponent() == this.toTile.getComponent() || !this.fromTile.getDirection(this.toTile))
            return false;
        var e = this.fromTile.getComponent().getMeta(), t = this.toTile.getComponent().getMeta();
        return e.strategy.type != "transport" && t.strategy.type != "transport" ? false : this._isLinkAllowed(this.fromTile, this.toTile, e.allowedOutputs) ? this._isLinkAllowed(this.toTile, this.fromTile, t.allowedInputs) ? this._detectLoop(this.fromTile, this.toTile) ? false : true : false : false;
    }
    _isLinkAllowed(e, t, n) {
        var r = e.getDirection(t), i = e.getX() - e.getComponent().getX(), s = e.getY() - e.getComponent().getY();
        return !n || n[i + ":" + s] || n[i + ":" + s + ":" + r];
    }
    _detectLoop(e, t) {
        var n = function (t, r) {
            if (t.getComponent().getMeta().strategy.type != "transport")
                return false;
            if (t.getId() == e.getId() && r > 0)
                return true;
            var i = t.getInputOutputManager().getOutputsList();
            for (var s = 0; s < i.length; s++)
                if (n(i[s], r + 1))
                    return true;
        };
        return n(t, 0);
    }
    update() {
        this.fromTile.getInputOutputManager().setOutput(this.fromTile.getDirection(this.toTile)),
            this.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_COMPONENTS_CHANGED, this.tile);
    }
}
class FactorySetup {
    constructor(e) {
        this.factory = e,
            this.factoryMeta = e.getMeta(),
            this.meta = e.getGame().getMeta();
    }
    init() {
        return this._initComponents(),
            this._initTransportLines(),
            this;
    }
    _initComponents() {
        if (!this.factoryMeta.startComponents)
            return;
        for (var t in this.factoryMeta.startComponents) {
            var n = this.factoryMeta.startComponents[t], r = this.factory.getTile(n.x, n.y), i = new BuyComponentAction(r, this.meta.componentsById[n.id]);
            i.buyFree();
        }
        return this;
    }
    _initTransportLines() {
        if (!this.factoryMeta.transportLineConnections)
            return;
        for (var e in this.factoryMeta.transportLineConnections) {
            var n = this.factoryMeta.transportLineConnections[e], r = this.factory.getTile(n.fromX, n.fromY), i = this.factory.getTile(n.toX, n.toY), s = new UpdateComponentInputOutputAction(r, i);
            s.canUpdate() && s.update();
        }
        return this;
    }
}
class Factory {
    constructor(i, o) {
        this.game = o,
            this.isPaused = false,
            this.isBought = false,
            this.meta = i,
            this.em = new EventManager(FactoryEvent, "Factory"),
            this.upgardesManager = new UpgradesManager(this),
            this.tiles = [];
        for (var u = 0; u < this.meta.tilesY; u++)
            for (var a = 0; a < this.meta.tilesX; a++) {
                var f = this.meta.terrains[i.terrainMap[u * this.meta.tilesX + a]], l = i.buildMap[u * this.meta.tilesX + a];
                this.tiles[u * this.meta.tilesX + a] = new Tile(a, u, l, f, this);
            }
        this.areasManager = new AreasManager(this);
    }
    reset() {
        for (var e = 0; e < this.tiles.length; e++)
            this.tiles[e].setComponent(null);
        var t = new FactorySetup(this);
        t.init();
    }
    getEventManager() {
        return this.em;
    }
    getUpgradesManager() {
        return this.upgardesManager;
    }
    getAreasManager() {
        return this.areasManager;
    }
    getMeta() {
        return this.meta;
    }
    setIsBought(e) {
        this.isBought = e;
    }
    getIsBought() {
        return this.isBought;
    }
    getGame() {
        return this.game;
    }
    getTiles() {
        return this.tiles;
    }
    getComponents() {
        return this.components;
    }
    getTile(e, t) {
        return e < 0 || e >= this.meta.tilesX || t < 0 || t >= this.meta.tilesY ? null : this.tiles[t * this.meta.tilesX + e];
    }
    getIsPaused() {
        return this.isPaused;
    }
    setIsPaused(e) {
        this.isPaused = e;
    }
    isOnMap(e, t, n, r) {
        return e >= 0 && t >= 0 && e + n <= this.meta.tilesX && t + r <= this.meta.tilesY;
    }
    isPossibleToBuildOnTypeWithSize(e, t, n, r, i) {
        n || (n = 1),
            r || (r = 1);
        if (!this.isOnMap(e, t, n, r))
            return false;
        for (var s = 0; s < n; s++)
            for (var o = 0; o < r; o++) {
                var u = this.getTile(e + s, t + o);
                if (!u || !u.isPossibleToBuildOnType(i) || u.getComponent())
                    return false;
            }
        return true;
    }
    exportToWriter() {
        var e = new BinaryArrayWriter;
        e.writeWriter(this.upgardesManager.exportToWriter()),
            e.writeWriter(this.areasManager.exportToWriter()),
            e.writeUint8(this.isPaused ? 1 : 0),
            e.writeUint8(this.isBought ? 1 : 0),
            e.writeUint8(this.meta.tilesX),
            e.writeUint8(this.meta.tilesY);
        var t = [];
        e.writeBooleansArrayFunc(this.tiles,
            function (e) {
                return e.isMainComponentContainer() ? (t.push(e), true) : false;
            });
        for (var n = 0; n < t.length; n++)
            e.writeUint8(t[n].getComponent().getMeta().idNum);
        for (var n = 0; n < t.length; n++)
            t[n].exportToWriter1(e);
        for (var n = 0; n < t.length; n++)
            t[n].exportToWriter2(e);
        return e;
    }
    importFromReader(e, t) {
        this.upgardesManager.importFromReader(e.readReader(), t),
            this.areasManager.importFromReader(e.readReader(), t),
            this.isPaused = e.readUint8() ? true : false,
            this.isBought = e.readUint8() ? true : false;
        var n = e.readUint8(), r = e.readUint8();
        for (var i = 0; i < this.tiles.length; i++)
            this.tiles[i].setComponent(null);
        var s = [];
        e.readBooleanArrayFunc(n * r, (e, t) => {
            t && s.push(this.tiles[Math.floor(e / n) * this.meta.tilesX + e % n]);
        });
        for (var i = 0; i < s.length; i++)
            s[i].setComponent(this.getGame().getMeta().componentsByIdNum[e.readUint8()]);
        for (var i = 0; i < s.length; i++)
            s[i].importFromReader1(e, t);
        for (var i = 0; i < s.length; i++)
            s[i].importFromReader2(e, t);
        this.em.invokeEvent(FactoryEvent.FACTORY_COMPONENTS_CHANGED);
    }
}
class ResearchManager {
    constructor(game) {
        this.game = game
        this.research = {};
    }
    setResearch(e, t) {
        this.research[e] || (this.research[e] = 0),
            this.research[e] = t;
    }
    addResearch(e, t) {
        this.setResearch(e, this.getResearch(e) + t);
    }
    getResearch(e) {
        return this.research[e] ? this.research[e] : 0;
    }
    getPrice(e) {
        var t = this.game.getMeta().researchById[e], n = 0;
        t.price && (n = t.price);
        for (var r = 0, i = this.getResearch(t.id); r < i; r++)
            n *= t.priceIncrease;
        return n;
    }
    getPriceResearchPoints(e) {
        var t = this.game.getMeta().researchById[e], n = 0;
        t.priceResearchPoints && (n = t.priceResearchPoints);
        for (var r = 0, i = this.getResearch(t.id); r < i; r++)
            n *= t.priceIncrease;
        return n;
    }
    canPurchase(e) {
        return this.couldPurchase(e) ? this.game.getMoney() < this.getPrice(e) ? false : this.game.getResearchPoints() < this.getPriceResearchPoints(e) ? false : this.isVisible(e) ? true : false : false;
    }
    couldPurchase(e) {
        var t = this.game.getMeta().researchById[e];
        return this.getResearch(e) >= t.max ? false : true;
    }
    isVisible(e) {
        var t = this.game.getMeta().researchById[e];
        return !t.requiresResearch || this.getResearch(t.requiresResearch) > 0 ? true : false;
    }
    exportToWriter() {
        var e = new BinaryArrayWriter, t = new BinaryArrayWriter;
        t.writeUint16(this.game.getMeta().researchByIdNum.length),
            t.writeBooleansArrayFunc(this.game.getMeta().researchByIdNum, t => {
                return t && this.research[t.id] > 0 ? (this.research[t.id] > 1 && (e.writeUint16(t.idNum), e.writeUint16(this.research[t.id])), true) : false;
            })
        t.writeWriter(e)
        return t;
    }
    importFromReader(e, t) {
        if (e.getLength() == 0)
            return;
        this.research = {};
        var n = e.readUint16();
        e.readBooleanArrayFunc(n, (e, t) => {
            if (t) {
                var n = this.game.getMeta().researchByIdNum[e];
                n && this.setResearch(n.id, 1);
            }
        });
        var r = e.readReader();
        while (r.getOffset() < r.getLength()) {
            var i = r.readUint16(), s = r.readUint16(), o = this.game.getMeta().researchByIdNum[i];
            o && this.setResearch(o.id, s);
        }
    }
}
class AchievementsManager {
    constructor(e) {
        this.game = e,
            this.achievements = {},
            this.testers = this.getTesterImplementations(),
            this.bonuses = this.getBonusImplementations();
    }
    _setAchieved(e, t) {
        this.achievements[e] = t;
    }
    setAchieved(e, t) {
        this._setAchieved(e, t),
            t && this.game.getEventManager().invokeEvent(GameEvent.ACHIEVEMENT_RECEIVED, e);
    }
    getAchievement(e) {
        return this.achievements[e];
    }
    getTester(e) {
        return this.testers[e.type].test(e);
    }
    isVisible(e) {
        var t = this.game.getMeta().achievementsById[e];
        return t.requiresAchievement && !this.getAchievement(t.requiresAchievement) ? false : true;
    }
    test(e) {
        var t = true, n;
        for (var r = 0; r < e.tests.length; r++)
            n = e.tests[r],
                this.testers[n.type].test(n) || (t = false);
        return t;
    }
    testAll() {
        var e = this.game.getMeta().achievements, t;
        for (var n = 0; n < e.length; n++) {
            t = e[n];
            if (this.getAchievement(t.id))
                continue;
            this.test(t) && (this.setAchieved(t.id, true), t.bonus && this.bonuses[t.bonus.type].invoke(t.bonus));
        }
    }
    getTesterDescriptionText(e) {
        var t = this.game.getMeta().achievementsById[e];
        if (!t)
            return "";
        var n = [];
        for (var r = 0; r < t.tests.length; r++) {
            var i = t.tests[r];
            n.push(this.testers[i.type].getRequirementsInfoText(i));
        }
        return n;
    }
    getBonusDescriptionText(e) {
        var t = this.game.getMeta().achievementsById[e];
        if (!t)
            return "";
        if (!t.bonus)
            return;
        return this.bonuses[t.bonus.type].getInfoText(t.bonus);
    }
    getTesterImplementations() {
        var e = this;
        return {
            amountOfMoney: {
                getRequirementsInfoText: function (e) {
                    return '拥有的金钱超过<span class="money">$' + nf(e.amount) + "</span>";
                },
                test: function (t) {
                    return e.game.getMoney() > t.amount;
                }
            },
            avgMoneyIncome: {
                getRequirementsInfoText: function (e) {
                    return '平均收益超过<span class="money">$' + nf(e.amount) + "</span>";
                },
                test: function (t) {
                    return e.game.getStatistics().getAvgProfit() > t.amount;
                }
            },
            researched: {
                getRequirementsInfoText: function (t) {
                    var n = e.game.getMeta().researchById[t.researchId];
                    return "研究" + n.name.lcFirst() + "";
                },
                test: function (t) {
                    return e.game.getResearchManager().getResearch(t.researchId) > 0;
                }
            }
        };
    }
    getBonusImplementations() {
        var e = this;
        return {
            money: {
                getInfoText: function (e) {
                    return '<span class="money">+$' + nf(e.amount) + "</span>";
                },
                invoke: function (t) {
                    e.game.addMoney(t.amount);
                }
            },
            custom: {
                getInfoText: function (e) {
                    return e.description;
                },
                invoke: function (e) { }
            }
        };
    }
    exportToWriter() {
        var e = new BinaryArrayWriter;
        e.writeUint16(this.game.getMeta().achievementsByIdNum.length)
        e.writeBooleansArrayFunc(this.game.getMeta().achievementsByIdNum, (e) => {
            return e && this.getAchievement(e.id);
        })
        return e;
    }
    importFromReader(e, t) {
        if (e.getLength() == 0) return;
        var n = e.readUint16();
        this.achievements = {}
        e.readBooleanArrayFunc(n, (e, t) => {
            if (t) {
                var n = this.game.getMeta().achievementsByIdNum[e];
                n && this._setAchieved(n.id, true);
            }
        });
    }
}
class TransportCalculator {
    constructor(e) {
        this.factory = e
        this.endTiles = []
        this.doneIndex = []
        this.queue = []
        this.queueChecked = 0
    }
    calculate() {
        this.doneIndex.length = 0
        this.queue.length = 0
        this.queueChecked = 0
        for (var e in this.endTiles)
            this.queue.push(this.endTiles[e]),
                this.log(this.endTiles[e].getIdStr() + " added to queue as end tile");
        while (this.queue.length > this.queueChecked)
            this.step(this.queue[this.queueChecked]),
                this.queueChecked++;
    }
    log(e) { }
    step(e) {
        if (this.doneIndex[e.getId()]) return;
        var t = e.getInputOutputManager().getOutputsList();
        if (t.length > 1) {
            var n = 0;
            for (var r = 0; r < t.length; r++)
                this.doneIndex[t[r].getId()] && n++;
            if (t.length != n) {
                this.log(e.getIdStr() + " skipped, not all outputs calculated!");
                return;
            }
        }
        this.doneIndex[e.getId()] = true
        this.log("Calculate " + e.getIdStr())
        e.getComponent().getStrategy().calculateTransport && e.getComponent().getStrategy().calculateTransport();
        var i = e.getInputOutputManager().getInputsList();
        for (var r = 0; r < i.length; r++)
            this.queue.push(i[r]),
                this.log(i[r].getIdStr() + " added to queue");
    }
    buildCaches() {
        this.endTiles = [];
        var e = this.factory.getTiles();
        for (var t in e) {
            if (!e[t].getComponent())
                continue;
            (e[t].getInputOutputManager().getOutputsList().length == 0 || e[t].getComponent().getMeta().strategy.type != "transport") && this.endTiles.push(e[t]);
        }
    }
}
class FactoryCalculator {
    constructor(t) {
        this.factory = t
        this.transportCalculator = new TransportCalculator(this.factory)
        this.components = []
        this.strategies = {}
        this.cachesOk = false
    }
    calculate() {
        this.cachesOk || this.buildCaches();
        var e = {
            runningCosts: 0,
            resourceCosts: 0,
            resourceSales: 0,
            researchProduction: 0,
            profit: 0
        };
        if (!this.factory.getIsPaused()) {
            for (var t = 0; t < this.components.length; t++)
                this.components[t].calculateInputTick(e),
                    this.components[t].getStrategy().calculateInputTick && this.components[t].getStrategy().calculateInputTick(e);
            this.transportCalculator.calculate();
            for (var t = 0; t < this.components.length; t++)
                this.components[t].getStrategy().calculateOutputTick && this.components[t].getStrategy().calculateOutputTick(e);
            this.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_TICK, e);
        } else
            e.isPaused = true;
        e.profit = e.resourceSales - e.resourceCosts - e.runningCosts
        return e;
    }
    buildCaches() {
        this.cachesOk = true
        this.transportCalculator.buildCaches()
        this.components = []
        var e = this.factory.getTiles();
        for (var t = 0; t < e.length; t++) {
            if (!e[t].isMainComponentContainer()) continue;
            this.components.push(e[t].getComponent());
        }
    }
    setup() {
        this.factory.getEventManager().addListener("FactoryCalculator", FactoryEvent.FACTORY_COMPONENTS_CHANGED, () => {
            this.cachesOk = false;
        });
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("FactoryCalculator");
    }
}
class Calculator {
    constructor(game) {
        this.game = game
        this.factoryCalculators = {};
        for (var n in this.game.getMeta().factoriesById)
            this.factoryCalculators[n] = new FactoryCalculator(this.game.getFactory(n));
    }
    init() {
        for (var e in this.factoryCalculators)
            this.factoryCalculators[e].setup();
        return this;
    }
    destroy() {
        for (var e in this.factoryCalculators)
            this.factoryCalculators[e].destroy();
    }
    calculate() {
        var e = (new Date).getTime(),
            t = {
                profit: 0,
                researchProduction: 0,
                factory_results: {}
            };
        for (var n in this.factoryCalculators) {
            var r = this.factoryCalculators[n].calculate();
            t.profit += r.profit
            t.researchProduction += r.researchProduction
            t.factory_results[n] = r;
        }
        this.game.addMoney(t.profit)
        this.game.addResearchPoints(t.researchProduction)
        return t;
    }
}
class StatisticsCollector {
    constructor(config) {
        this.config = config
        this.reset();
    }
    getData() {
        return this.data;
    }
    _buildDataStructure(e) {
        var t = {
            variables: {},
            sampleCounter: 0
        };
        for (var n = 0; n < this.config.fields.length; n++)
            t.variables[this.config.fields[n]] = {
                sum: 0,
                values: [],
                sample: null
            };
        e.child && (t.addToChildCounter = 0, t.child = this._buildDataStructure(e.child))
        return t;
    }
    reset() {
        this.data = this._buildDataStructure(this.config);
    }
    handleInput(e) {
        this._handleCollector(this.config, this.data, e);
    }
    _handleCollector(e, t, n) {
        t.sampleCounter++;
        var r = {};
        for (var i = 0; i < e.fields.length; i++) {
            var s = e.fields[i], o = t.variables[s];
            o.sum += n[s]
            o.values.length >= e.max_values_length && (o.sum -= o.values.shift())
            o.values.push(n[s])
            var u = o.sum / o.values.length;
            t.sampleCounter >= e.sample_interval && (o.sample = u)
            r[s] = u;
        }
        t.sampleCounter >= e.sample_interval && (t.sampleCounter = 0)
        e.child && e.add_to_child_interval && (t.addToChildCounter++, t.addToChildCounter >= e.add_to_child_interval && (t.addToChildCounter = 0, this._handleCollector(e.child, t.child, r)));
    }
}

class Statistics {
    constructor(t) {
        this.game = t
        this.gameCollector = new StatisticsCollector({
            max_values_length: 80,
            sample_interval: 10,
            fields: ["profit", "researchProduction"]
        })
        this.factoryCollectors = {}
        this.game.getMeta().factories.map((t) => {
            this.factoryCollectors[t.id] = new StatisticsCollector({
                max_values_length: 80,
                sample_interval: 10,
                fields: ["profit", "researchProduction"]
            });
        });
    }
    init() {
        this.game.getEventManager().addListener("Statistics", GameEvent.GAME_TICK, (e) => {
            this.gameCollector.handleInput({
                profit: e.profit,
                researchProduction: e.researchProduction
            });
            var n = this.game.getMeta().factories;
            for (var r = 0; r < n.length; r++) {
                var i = e.factory_results[n[r].id];
                if (i.isPaused == 1) continue;
                this.factoryCollectors[n[r].id].handleInput({
                    profit: i.profit,
                    researchProduction: i.researchProduction
                });
            }
        })
        return this;
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("Statistics");
    }
    reset() {
        this.gameCollector.reset();
        for (var e in this.factoryCollectors)
            this.factoryCollectors[e].reset();
    }
    getAvgProfit() {
        var e = this.gameCollector.getData();
        return e.variables.profit.sample;
    }
    getAvgResearchPointsProduction() {
        var e = this.gameCollector.getData();
        return e.variables.researchProduction.sample;
    }
    getFactoryAvgProfit(e) {
        var t = this.factoryCollectors[e].getData();
        return t.variables.profit.sample;
    }
    getFactoryAvgResearchPointsProduction(e) {
        var t = this.factoryCollectors[e].getData();
        return t.variables.researchProduction.sample;
    }
    exportToWriter() {
        var e = new BinaryArrayWriter;
        return e;
    }
    importFromReader(e, t) { }
}
class Benchmarker {
    constructor(e) {
        this.name = e,
            this.timeSpent = 0,
            this.count = 0,
            this.weightSum = 0,
            this.lastStartTime = null,
            this.firstStartTime = null,
            this.interval = null,
            this.intervalValue = 2e3;
    }
    init() {
        this.firstStartTime = (new Date).getTime()
        this.interval = setInterval(() => {
            var e = (new Date).getTime(), t = e - this.firstStartTime;
            //  logger.info("Bench:" + this.name, "AVG: " + this.timeSpent + "ms / " + t + "ms (Runs: " + this.weightSum + ", Avg run time: " + Math.round(this.timeSpent / this.weightSum * 10) / 10 + "ms) CPU time spent: " + Math.round(this.timeSpent * 100 / t * 100) / 100 + "%")
            this.timeSpent = 0
            this.count = 0
            this.weightSum = 0
            this.firstStartTime = (new Date).getTime();
        }, this.intervalValue);
    }
    destroy() {
        this.interval && clearInterval(this.interval);
    }
    start() {
        this.lastStartTime = (new Date).getTime();
    }
    stop(e) {
        this.timeSpent += (new Date).getTime() - this.lastStartTime,
            this.count++,
            this.weightSum += e;
    }
}
const Ticker_n = 5;
const Ticker_r = 15e3;
class Ticker {
    constructor(t, n) {
        this.game = t,
            this.confirmedTimestamp = n,
            this.ticks = 0,
            this.bonusTicks = 0,
            this.timeTravelTickets = 1,
            this.focused = true,
            this.isPlaying = false,
            this.isFastActive = false,
            this.interval = null,
            this.noOfTicks = 0,
            this.purchaseBonusTicks = 0,
            this.lastSaveTimestamp = null,
            this.benchmarker = new Benchmarker(this.game.getMeta().id),
            this.backgroundModeTimeout = null,
            this.actualTicksPerSec = {
                ticks: 0,
                second: 0,
                actual: 0
            };
    }
    init() {
        this.start()
        this.game.getEventManager().addListener("Ticker", GameEvent.FOCUS, () => {
            this.disableBackgroundMode();
        })
        this.game.getEventManager().addListener("Ticker", GameEvent.BLUR, () => {
            this.startBackgroundModeTimer();
        })
        this.game.getEventManager().addListener("Ticker", GameEvent.RESEARCH_BOUGHT, () => {
            this.updateInterval();
        })
        logger.info("Ticker", "Ticker 初始化在游戏" + this.game.getMeta().id)
        this.benchmarker.init()
        //插件
        this.game.getEventManager().addListener('tickerNamespace', BACKGROUND_MODE_STARTED, () => {
            this.startBackgroundMode();
        });
        this.game.getEventManager().addListener('tickerNamespace', BACKGROUND_MODE_STOPPED, () => {
            this.stopBackgroundMode();
        });
        return this;
    }
    // startBackgroundModeTimer() {
    //     this.backgroundModeTimeout && (clearTimeout(this.backgroundModeTimeout), this.backgroundModeTimeout = null),
    //         this.backgroundModeTimeout = setTimeout(() => {
    //             var e = this.focused != 0;
    //             this.focused = false,
    //                 e && this.updateInterval(),
    //                 this.game.getEventManager().invokeEvent(GameEvent.BACKGROUND_MODE_ACTIVATED);
    //         }, Ticker_r);
    // }
    // disableBackgroundMode() {
    //     this.backgroundModeTimeout && (clearTimeout(this.backgroundModeTimeout), this.backgroundModeTimeout = null);
    //     var e = this.focused != 1;
    //     this.focused = true,
    //         e && this.updateInterval(),
    //         this.game.getEventManager().invokeEvent(GameEvent.BACKGROUND_MODE_DISABLED);
    // }
    destroy() {
        this.stop()
        this.game.getEventManager().removeListenerForType("Ticker")
        this.benchmarker.destroy()
    }
    getBonusTicks() {
        return this.bonusTicks;
    }
    addBonusTicks(e) {
        this.bonusTicks = Math.round(this.bonusTicks + e),
            this.game.getEventManager().invokeEvent(GameEvent.BONUS_TICKS_UPDATED);
    }
    setBonusTicks(e) {
        this.bonusTicks = e,
            this.game.getEventManager().invokeEvent(GameEvent.BONUS_TICKS_UPDATED);
    }
    setPurchaseBonusTicks(e) {
        this.purchaseBonusTicks = e,
            this.updateInterval();
    }
    getTimeTravelTickets() {
        return this.timeTravelTickets;
    }
    addTimeTravelTickets(e) {
        this.timeTravelTickets = Math.round(this.timeTravelTickets + e),
            this.game.getEventManager().invokeEvent(GameEvent.TIME_TRAVEL_TICKETS_UPDATED);
    }
    setTimeTravelTickets(e) {
        this.timeTravelTickets = e,
            this.game.getEventManager().invokeEvent(GameEvent.TIME_TRAVEL_TICKETS_UPDATED);
    }
    getLastSaveTimestamp() {
        return this.lastSaveTimestamp;
    }
    getIsPlaying() {
        return this.isPlaying;
    }
    getIsFastActive() {
        return this.isFastActive;
    }
    getIsFocused() {
        return this.focused;
    }
    getNoOfTicks() {
        return this.noOfTicks;
    }
    addNoOfTicks(e) {
        this.noOfTicks += e;
    }
    getNormalTicksPerSec() {
        var e = this.game.getResearchManager().getResearch("chronometer");
        return 4 + e + this.purchaseBonusTicks;
    }
    getTicksPerSec() {
        var e = this.getNormalTicksPerSec();
        return this.isFastActive && (e = 200),
            e;
    }
    getActualTicksPerSec() {
        return this.actualTicksPerSec.actual;
    }
    getTickData() {
        var e = 1, t = this.getTicksPerSec();
        return this.focused || (e = t, t = 1), {
            runs: e,
            ticksPerSec: t
        };
    }
    updateInterval() {
        this.interval && (clearInterval(this.interval), this.interval = null);
        if (!this.isPlaying) return;
        var e = this.getTickData();
        this.interval = setInterval(() => {
            this.benchmarker.start();
            for (var t = 0; t < e.runs; t++)
                this.tick();
            this.benchmarker.stop(e.runs);
        }, Math.round(1e3 / e.ticksPerSec))
        this.game.getEventManager().invokeEvent(GameEvent.TICKS_STARTED);
    }
    start() {
        this.isPlaying = true,
            this.updateInterval();
    }
    stop() {
        this.isPlaying = false,
            this.isFastActive = false,
            this.interval && (clearInterval(this.interval), this.interval = null),
            this.game.getEventManager().invokeEvent(GameEvent.TICKS_STOPPED);
    }
    startFast() {
        this.bonusTicks > 0 && (this.isPlaying = true, this.isFastActive = true, this.updateInterval());
    }
    stopFast() {
        this.isFastActive = false,
            this.updateInterval();
    }
    calculateOfflineGains() {
        var e = this.game.getMeta();
        if (!this.lastSaveTimestamp || !e.maxBonusTicks)
            return 0;
        var t = (this.confirmedTimestamp.getConfirmedNow() - this.lastSaveTimestamp) * this.getNormalTicksPerSec(), n = Math.round(t / e.offlineSlower), r = e.maxBonusTicks * this.getNormalTicksPerSec();
        return n > r && (n = r),
            n < e.minBonusTicks && (n = 0),
            n;
    }
    addOfflineGains() {
        var e = this.calculateOfflineGains();
        logger.info("Ticker", "已获得滴答奖励: " + e),
            this.addBonusTicks(e);
    }
    tick() {
        var e = this.game.getCalculator().calculate();
        this.game.getEventManager().invokeEvent(GameEvent.GAME_TICK, e),
            this.noOfTicks++,
            this.noOfTicks % Ticker_n === 0 && this.game.getAchievementsManager().testAll(),
            this.isFastActive && (this.addBonusTicks(-1), this.bonusTicks <= 0 && (this.isFastActive = false, this.updateInterval()));
        var t = Math.round(Date.now() / 1e3);
        this.actualTicksPerSec.ticks++,
            t != this.actualTicksPerSec.second && (this.actualTicksPerSec.actual = this.actualTicksPerSec.ticks, this.actualTicksPerSec.ticks = 0, this.actualTicksPerSec.second = t);
    }
    exportToWriter() {
        var e = new BinaryArrayWriter;
        e.writeUint32(this.bonusTicks)
        e.writeUint16(this.timeTravelTickets)
        e.writeUint32(this.noOfTicks)
        e.writeUint32(this.confirmedTimestamp.getConfirmedNow())
        return e;
    }
    importFromReader(e, t) {
        this.setBonusTicks(e.readUint32())
        t >= 5 && (this.timeTravelTickets = e.readUint16())
        this.noOfTicks = e.readUint32()
        this.lastSaveTimestamp = e.readUint32()
    }
    //插件
    startBackgroundModeTimer() { }
    startBackgroundMode() {
        this.focused = false;
        this.updateInterval();
    }
    disableBackgroundMode() { }
    stopBackgroundMode() {
        this.focused = true;
        this.updateInterval();
    }
}
class Game {
    constructor(meta, f) {
        this.meta = meta
        this.confirmedTimestamp = f
        this.money = meta.startingMoney
        this.researchPoints = meta.startingResearchPoints
        this.em = new EventManager(GameEvent, "Game")
        this.factories = {}
        for (var l in meta.factories) {
            var c = meta.factories[l];
            this.factories[c.id] = new Factory(c, this);
        }
        this.researchManager = new ResearchManager(this)
        this.achievementsManager = new AchievementsManager(this)
        this.calculator = new Calculator(this)
        this.statistics = new Statistics(this)
        this.ticker = new Ticker(this, this.confirmedTimestamp)
        this.profitMultiplier = 1
        this.researchProductionMultiplier = 1
        this.isPremium = false
    }
    init() {
        return this.calculator.init(),
            this.statistics.init(),
            this.ticker.init(),
            this;
    }
    destroy() {
        this.calculator.destroy(),
            this.statistics.destroy(),
            this.ticker.destroy();
    }
    getMeta() {
        return this.meta;
    }
    getEventManager() {
        return this.em;
    }
    getResearchManager() {
        return this.researchManager;
    }
    getAchievementsManager() {
        return this.achievementsManager;
    }
    getCalculator() {
        return this.calculator;
    }
    getStatistics() {
        return this.statistics;
    }
    getTicker() {
        return this.ticker;
    }
    getFactory(e) {
        return this.factories[e];
    }
    setProfitMultiplier(e) {
        this.profitMultiplier = e;
    }
    getProfitMultiplier() {
        return this.profitMultiplier;
    }
    setResearchProductionMultiplier(e) {
        this.researchProductionMultiplier = e;
    }
    getResearchProductionMultiplier() {
        return this.researchProductionMultiplier;
    }
    setIsPremium(e) {
        this.isPremium = e;
    }
    getIsPremium() {
        return this.isPremium;
    }
    getMoney() {
        return this.money;
    }
    setMoney(e) {
        isNaN(Number(e)) && (e = 0)
        e < this.meta.minNegativeMoney && (e = this.meta.minNegativeMoney)
        this.money = e
        this.em.invokeEvent(GameEvent.MONEY_UPDATED, this.money)
    }
    addMoney(e) {
        isNaN(Number(e)) && (e = 0)
        this.setMoney(this.money + e)
    }
    getResearchPoints() {
        return this.researchPoints;
    }
    setResearchPoints(e) {
        isNaN(Number(e)) && (e = 0)
        this.researchPoints = isNaN(e) ? 0 : e
        this.em.invokeEvent(GameEvent.RESEARCH_POINTS_UPDATED, this.researchPoints)
    }
    addResearchPoints(e) {
        isNaN(Number(e)) && (e = 0)
        this.setResearchPoints(this.researchPoints + e)
    }
    exportToWriter() {
        var e = new BinaryArrayWriter,
            t = 7;
        e.writeUint16(t)
        e.writeFloat64(this.money)
        e.writeFloat64(this.researchPoints)
        e.writeInt8(this.isPremium ? 1 : 0)
        e.writeWriter(this.researchManager.exportToWriter())
        e.writeWriter(this.achievementsManager.exportToWriter())
        e.writeWriter(this.statistics.exportToWriter())
        e.writeWriter(this.ticker.exportToWriter())
        e.writeUint8(this.meta.factories.length)
        for (var n in this.factories)
            e.writeUint8(this.factories[n].getMeta().idNum),
                e.writeWriter(this.factories[n].exportToWriter());
        return e;
    }
    importFromReader(e) {
        var t = e.readUint16();
        this.setMoney(e.readFloat64()),
            this.setResearchPoints(e.readFloat64()),
            t >= 7 ? this.setIsPremium(e.readInt8() ? true : false) : this.setIsPremium(false);
        var n = e.readReader();
        this.researchManager.importFromReader(n, t),
            this.achievementsManager.importFromReader(e.readReader(), t),
            this.statistics.importFromReader(e.readReader(), t),
            this.ticker.importFromReader(e.readReader(), t);
        var i = e.readUint8();
        for (var s = 0; s < i; s++) {
            var o = this.meta.factoriesByIdNum[e.readUint8()], u = e.readReader();
            o && this.factories[o.id].importFromReader(u, t);
        }
        this.statistics.reset();
    }
}
const UrlHandler = {
    e() {
        var e = {},
            t = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
                function (t, n, r) {
                    e[n] = r
                });
        return e
    },
    getUrlVars() {
        return this.e()
    },
    identifySite() {
        var t = this.e();
        //return "localhost"
        return t["ref"] == "notdoppler" ? "notdoppler" :
            t["ref"] == "armorgames" ? "armorgames" :
                t["ref"] == "newgrounds" ? "newgrounds" :
                    t["ref"] == "beta" ? "beta" :
                        String(window.location.href).search("localhost") != -1 || String(window.location.href).search("file") != -1 ? "localhost" : "direct"
    }
}
class SaveManager {
    constructor(r, i, s) {
        this.api = r
        this.localStorageKey = s + "|" + i.toString()
        this.cloudSaveName = "Main"
        this.cloudSaveIntervalMs = config.saveManager.cloudSaveIntervalMs
        this.localSaveIntervalMs = config.saveManager.localSaveIntervalMs
        this.cloudSaveInterval = null
        this.localSaveInterval = null
        var o = UrlHandler.getUrlVars();
        this.useCloud = o.cloud === "0" || o.cloud === 0 || o.cloud === "false" ? false : true
        this.useCloud || logger.info("SaveManager", "云存档失效");
    }
    getCloudSaveInterval() {
        return this.cloudSaveIntervalMs;
    }
    getLocalSaveInterval() {
        return this.localSaveIntervalMs;
    }
    setUpdateGameFromLoadedDataCallback(e) {
        return this.updateGameFromLoadedDataCallback = e,
            this;
    }
    setGetSaveDataCallback(e) {
        return this.saveDataCallback = e,
            this;
    }
    init(e, t) {
        var r = function () {
            this._startInterval(),
                logger.info("SaveManager", "初始化"),
                t();
        }.bind(this);
        e ? (this.saveAutoCloud(function () { }), this.saveAutoLocal(function () { }), r()) : this.loadAuto(function () {
            r();
        }.bind(this))
        return this;
    }
    _startInterval() {
        this.cloudSaveInterval = setInterval(() => {
            this.saveAutoCloud(() => {
                logger.info("SaveManager", "自动保存在云");
            });
        }, this.cloudSaveIntervalMs),
            this.localSaveInterval = setInterval(() => {
                this.saveAutoLocal(() => {
                    logger.info("SaveManager", "自动保存在本地");
                });
            }, this.localSaveIntervalMs);
    }
    destroy() {
        this.cloudSaveInterval && clearInterval(this.cloudSaveInterval),
            this.localSaveInterval && clearInterval(this.localSaveInterval);
    }
    getSavesInfo(e, t) {
        this.api.getSavesInfo(e, t);
    }
    saveManual(e, t) {
        this._saveCloud(e, t);
    }
    saveAuto(e) {
        this._saveLocal(this.cloudSaveName, () => {
            this._saveCloud(this.cloudSaveName, e);
        });
    }
    saveAutoCloud(e) {
        this._saveCloud(this.cloudSaveName, e);
    }
    saveAutoLocal(e) {
        this._saveLocal(this.cloudSaveName, e);
    }
    _saveCloud(e, t) {
        this.useCloud ? this.api.save(e, this.saveDataCallback(), t) : (logger.info("SaveManager", "Cloud save skipped!"), t());
    }
    _saveLocal(e, t) {
        window.localStorage[this.localStorageKey + "|" + e] = JSON.stringify(this.saveDataCallback()),
            t();
    }
    loadManual(e, t) {
        this._loadCloud(e, (e) => {
            this.updateGameFromSaveData(e)
            this.saveAutoCloud(() => { })
            t()
        });
    }
    loadAuto(e) {
        this._loadCloud(this.cloudSaveName, (t) => {
            this._loadLocal(this.cloudSaveName, (r) => {
                var i = null;
                r && t ? r.meta.ver > t.meta.ver ? (logger.info("SaveManager", "首选保存本地版本:" + r.meta.ver + " > 云版本:" + t.meta.ver), i = r) : (logger.info("SaveManager", "首选保存云版本:" + r.meta.ver + " < 云版本:" + t.meta.ver), i = t) : r ? i = r : t && (i = t)
                i && this.updateGameFromSaveData(i)
                e();
            });
        });
    }
    updateGameFromSaveData(e) {
        this.updateGameFromLoadedDataCallback(e);
    }
    _loadCloud(e, t) {
        this.api.load(e, t);
    }
    _loadLocal(e, t) {
        var n = null;
        try {
            n = JSON.parse(window.localStorage[this.localStorageKey + "|" + e]),
                t(n);
            return;
        } catch (r) { }
        t(null);
    }
}
class PurchasesManager {
    constructor(play) {
        this.play = play
        this.game = this.play.getGame()
        this.unlocks = {}
        this.strategies = {
            bonusTicks: {
                apply: (t) => {
                    this.game.getTicker().addBonusTicks(t.amount)
                    this.game.setIsPremium(true)
                    logger.info("PurchasesManager", "添加" + t.amount + "滴答奖励")
                }
            },
            timeTravelTickets: {
                apply: (t) => {
                    this.game.getTicker().addTimeTravelTickets(t.amount)
                    this.game.setIsPremium(true)
                    logger.info("PurchasesManager", "添加" + t.amount + "滴答奖励")
                }
            },
            researchProductionBonus: {
                apply: (t) => {
                    this.game.setResearchProductionMultiplier(this.game.getResearchProductionMultiplier() * t.bonus)
                    this.game.setIsPremium(true)
                    logger.info("PurchasesManager", "设置额外研究倍数");
                }
            },
            extraTicks: {
                apply: (t) => {
                    this.game.getTicker().setPurchaseBonusTicks(t.bonus)
                    this.game.setIsPremium(true)
                    logger.info("PurchasesManager", "设置额外滴答")
                }
            },
            extraProfit: {
                apply: (t) => {
                    this.game.setProfitMultiplier(t.bonus)
                    this.game.setIsPremium(true)
                    logger.info("PurchasesManager", "设置额外金钱")
                }
            }
        };
    }
    isVisible(e) {
        var t = this.play.getMeta().productsById[e];
        return t.requiresProduct && !this.getIsUnlocked(t.requiresProduct) ? false : t.special ? false : true;
    }
    getPriceKey() {
        return this.play.getApi().getKey();
    }
    init(e) {
        this.loadPurchases(e);
    }
    loadPurchases(t) {
        this.play.getApi().loadPurchases((n) => {
            logger.info("PurchasesManager", "Purchases加载", n)
            this.handlePurchases(n)
            t()
        });
    }
    startPurchase(e, t) {
        this.play.getApi().purchase(e, () => {
            this.loadPurchases(() => { t() });
        });
    }
    destroy() { }
    handlePurchases(e) {
        this.game.setResearchProductionMultiplier(1)
        this.game.getTicker().setPurchaseBonusTicks(0)
        this.game.setProfitMultiplier(1)
        for (var t = 0; t < e.length; t++)
            this.handlePurchase(e[t]);
    }
    handlePurchase(t) {
        var n = this.play.getMeta().productsById[t.productId];
        if (!n) {
            logger.warning("PurchasesManager", "Unknown product with id " + t.productId, t);
            return;
        }
        if (this.strategies[n.strategy.type]) {
            this.strategies[n.strategy.type].apply(n.strategy)
            logger.info("PurchasesManager", "适用于购买 " + n.strategy.type + " 的耗材策略 " + t.productId + "")
            if (n.consumable) {
                this.play.getSaveManager().saveAuto((n) => {
                    this.play.getApi().setConsumed(t.externalId, () => {
                        logger.info("PurchasesManager", "购买 " + t.externalId + " 设置为消耗");
                    });
                })
            } else {
                this.unlocks[t.productId] = true
                logger.info("PurchasesManager", "购买外部未锁定的 " + t.productId + " id为 " + t.externalId)
            }
        } else {
            logger.error("PurchasesManager", "Invalid consumable strategy " + n.strategy.type + " for purchase " + t.productId + ". Could not handle purchase.");
        }

    }
    getIsUnlocked(e) {
        return !!this.unlocks[e];
    }
}
class UserHash {
    constructor(e) {
        this.storageKey = e,
            this.hashLength = 40,
            this.userHash = null;
    }
    init() {
        return this.userHash = localStorage[this.storageKey],
            this.userHash || (this.userHash = this._generateUserHash(this.hashLength)),
            this.updateUserHash(this.userHash),
            logger.info("UserHash", "User hash加载 " + this.userHash),
            this;
    }
    updateUserHash(e) {
        localStorage[this.storageKey] = e;
    }
    getUserHash() {
        return this.userHash;
    }
    toString() {
        return this.userHash;
    }
    _generateUserHash(e) {
        var t = "", n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var r = 0; r < e; r++)
            t += n.charAt(Math.floor(Math.random() * n.length));
        return t;
    }
}
const LocalApi_t = 100;
class LocalApi {
    constructor(e, t, n) {
        this.userHash = t
        this.storageKey = n + "|" + t
        this.em = e
        this.purchases = []
        this.savesMeta = {}
        this.saves = {}
        this.insentiveInterval = null
    }
    getTimestamp(e) {
        e(Math.round(Date.now() / 1e3));
    }
    _saveToLocalStorage() {
        localStorage[this.storageKey] = JSON.stringify({
            purchases: this.purchases,
            savesMeta: this.savesMeta,
            saves: this.saves
        });
    }
    _loadFromLocalStorage() {
        this.purchases = []
        this.saves = {}
        this.savesMeta = {}
        try {
            var t = JSON.parse(localStorage[this.storageKey]);
            t.purchases && (this.purchases = t.purchases),
                t.savesMeta && (this.savesMeta = t.savesMeta),
                t.saves && (this.saves = t.saves);
        } catch (n) {
            logger.warning("Local", "可能未加载数据", n);
        }
    }
    init(n) {
        this._loadFromLocalStorage()
        logger.info("Local", "初始化")
        setTimeout(() => {
            logger.info("Local", "API加载")
            n();
        }, LocalApi_t);
    }
    destroy() {
        this.insentiveInterval && clearInterval(this.insentiveInterval);
    }
    purchase(e, n) {
        setTimeout(() => {
            this.purchases.push({
                externalId: String(Math.round(Math.random() * 1e12)),
                productId: e
            })
            this._saveToLocalStorage()
            n();
        }, LocalApi_t);
    }
    loadPurchases(e) {
        setTimeout(() => { e(this.purchases) }, LocalApi_t);
    }
    setConsumed(e, n) {
        setTimeout(() => {
            var t = [];
            for (var r in this.purchases)
                this.purchases[r].externalId != e && t.push(this.purchases[r]);
            this.purchases = t,
                this._saveToLocalStorage(),
                n(true);
        }, LocalApi_t);
    }
    submitStatistic(e, n, r) {
        this._saveToLocalStorage()
        setTimeout(() => {
            r();
        }, LocalApi_t);
    }
    getSavesInfo(e, n) {
        setTimeout(() => {
            n(this.savesMeta);
        }, LocalApi_t);
    }
    load(e, n) {
        setTimeout(() => {
            this.savesMeta[e] ? n({
                meta: this.savesMeta[e],
                data: this.saves[e]
            }) : n(null);
        }, LocalApi_t);
    }
    save(e, n, r) {
        setTimeout(() => {
            this.savesMeta[e] = n.meta
            this.saves[e] = n.data
            this._saveToLocalStorage()
            r(true)
        }, LocalApi_t);
    }
}
class Local {
    constructor(r, i, s) {
        this.em = new EventManager({}, "ApiLocal")
        this.localApi = new LocalApi(this.em, r, i);
    }
    getEventManager() {
        return this.em;
    }
    getKey() {
        return "local";
    }
    init(e) {
        this.localApi.init(() => {
            e();
        });
    }
    destroy() {
        this.localApi.destroy();
    }
    getTimestamp(e) {
        this.localApi.getTimestamp(e);
    }
    purchase(e, t) {
        this.localApi.purchase(e, t);
    }
    loadPurchases(e) {
        this.localApi.loadPurchases(e);
    }
    setConsumed(e, t) {
        this.localApi.setConsumed(e, t);
    }
    submitStatistic(e, t, n) {
        this.localApi.submitStatistic(e, t, n);
    }
    getSavesInfo(e, t) {
        this.localApi.getSavesInfo(e, t);
    }
    load(e, t) {
        this.localApi.load(e, t);
    }
    save(e, t, n) {
        this.localApi.save(e, t, n);
    }
}
class ServerApi {
    constructor(e, t, n) {
        this.apiUrl = t
        this.userHash = e
        this.ref = n
        //修改
        this.purchases = []
        this.saves = {}
        this.savesMeta = {}
    }
    init(t) {
        //修改
        this._loadFromLocalStorage()

        logger.info("ServerApi", "初始化"),
            t();

    }
    getTimestamp(e) {
        $.get(this.apiUrl + "/getTimestamp?user_hash=" + this.userHash, function (t) {
            e(t);
        }).fail(() => {
            e(null);
        });
    }
    // purchase(e, t) {
    //     this.loadPurchases(t)
    //     document.location = this.apiUrl + "/makePurchase?package_id=" + e + "&user_hash=" + this.userHash + "&ref=" + this.ref;
    // }
    // loadPurchases(t) {
    //     logger.info("ServerApi", "Load items"),
    //         $.get(this.apiUrl + "/getPurchases?user_hash=" + this.userHash,
    //             function (n) {
    //                 logger.info("ServerApi", "Items加载", n);
    //                 if (n.code != 0) {
    //                     t([]);
    //                     return;
    //                 }
    //                 var r = [];
    //                 for (var i in n.data.items) {
    //                     var s = n.data.items[i];
    //                     r.push({
    //                         externalId: s.created,
    //                         productId: s.package_id
    //                     });
    //                 }
    //                 t(r);
    //             }).fail(() => {
    //                 t([]);
    //             });
    // }
    setConsumed(t, n) {
        logger.info("ServerApi", "Set consumed " + t),
            $.get(this.apiUrl + "/setConsumed?user_hash=" + this.userHash + "&created=" + t,
                function (t) {
                    logger.info("ServerApi", "Items consumed", t);
                    if (t.code != 0) {
                        n(false);
                        return;
                    }
                    n(true);
                }).fail(() => {
                    n([]);
                });
    }
    //修改
    _saveToLocalStorage() {
        localStorage[this.storageKey] = JSON.stringify({
            purchases: this.purchases,
            savesMeta: this.savesMeta,
            saves: this.saves
        });
    }
    _loadFromLocalStorage() {
        this.purchases = []
        this.saves = {}
        this.savesMeta = {}
        try {
            var t = JSON.parse(localStorage[this.storageKey]);
            t.purchases && (this.purchases = t.purchases),
                t.savesMeta && (this.savesMeta = t.savesMeta),
                t.saves && (this.saves = t.saves);
        } catch (n) {
            logger.warning("Local", "可能未加载数据", n);
        }
    }
    purchase(e, n) {
        setTimeout(() => {
            this.purchases.push({
                externalId: String(Math.round(Math.random() * 1e12)),
                productId: e
            })
            this._saveToLocalStorage()
            n();
        }, LocalApi_t);
    }
    loadPurchases(e) {
        setTimeout(() => { e(this.purchases) }, LocalApi_t);
    }
}

class PlayFabApi {
    constructor(e) {
        PlayFab.settings.titleId = "775A"
        this.customId = e;
    }
    _getMetaVarName(e) {
        return e + "-meta";
    }
    init(t) {
        logger.info("PlayFab", "初始化"),
            this.login(t);
        var n = this;
        setInterval(() => {
            n.login();
        },
            432e5);
    }
    login(t) {
        logger.info("PlayFab", "Login");
        var n = {
            CustomId: this.customId,
            CreateAccount: true
        };
        PlayFab.ClientApi.LoginWithCustomID(n, (n, r) => {
            n && n.code == 200 ? (logger.info("PlayFab", "Logged in!", [n, r]), t()) : (logger.error("PlayFab", "初始化失败!", [n, r]), t());
        });
    }
    load(t, n) {
        var r = {
            Keys: [t, this._getMetaVarName(t)]
        };
        PlayFab.ClientApi.GetUserData(r, (r, i) => {
            logger.info("PlayFab", "Loaded!", [r, i]);
            if (r && r.code == 200) {
                var s = null;
                try {
                    var o = JSON.parse(r.data.Data[this._getMetaVarName(t)].Value);
                    s = {
                        meta: o,
                        data: r.data.Data[t].Value
                    };
                } catch (u) { }
                n(s);
                return;
            }
            logger.error("PlayFab", "load 失败!", [r, i])
            n(null);
        });
    }
    save(t, n, r) {
        var i = {
            Data: {}
        };
        i.Data[t] = n.data
        i.Data[this._getMetaVarName(t)] = JSON.stringify(n.meta)
        PlayFab.ClientApi.UpdateUserData(i, (n, i) => {
            if (n && n.code == 200) {
                logger.info("PlayFab", "Saved " + t, [n, i])
                r(true)
            } else {
                logger.error("PlayFab", "保存失败!", [n, i])
                r(false)
            }
        });
    }
    submitStatistic(e, t, n) {
        n();
    }
    getSavesInfo(t, n) {
        var r = [];
        for (var i in t)
            r.push(this._getMetaVarName(t[i]));
        var s = {
            Keys: r
        };
        PlayFab.ClientApi.GetUserData(s, (r, i) => {
            if (r && r.code == 200) {
                logger.info("PlayFab", "getSavesInfo加载!", [r, i]);
                var s = {};
                for (var o in t) {
                    var u = this._getMetaVarName(t[o]);
                    try {
                        r.data.Data[u] && r.data.Data[u].Value && (s[t[o]] = JSON.parse(r.data.Data[u].Value));
                    } catch (a) { }
                }
                n(s);
                return;
            }
            logger.error("PlayFab", "getSavesInfo 失败!", [r, i]),
                n({});
        });
    }
}
class Web {
    constructor(i, s, o) {
        this.em = new EventManager({}, "ApiWeb")
        this.serverApi = new ServerApi(i, s, o)
        this.playFabApi = new PlayFabApi(i)
    }
    getEventManager() {
        return this.em;
    }
    getKey() {
        return "web";
    }
    getTimestamp(e) {
        this.serverApi.getTimestamp(e);
    }
    init(e) {
        this.playFabApi.init(() => {
            this.serverApi.init(() => {
                e();
            });
        });
    }
    destroy() { }
    purchase(e, t) {
        this.serverApi.purchase(e, t);
    }
    loadPurchases(e) {
        this.serverApi.loadPurchases(e);
    }
    setConsumed(e, t) {
        this.serverApi.setConsumed(e, t);
    }
    submitStatistic(e, t, n) {
        n();
    }
    getSavesInfo(e, t) {
        this.playFabApi.getSavesInfo(e, t);
    }
    load(e, t) {
        this.playFabApi.load(e, t);
    }
    save(e, t, n) {
        this.playFabApi.save(e, t, n);
    }
}
function ApiFactory(s, o, u) {
    return s == "localhost" ? (logger.info("ApiFactory", "本地API已加载"), new Local(o, config.api.local.storageKey, s)) :
        // (logger.info("ApiFactory", "本地API已加载"), new Local(o, config.api.local.storageKey, s))
        (logger.info("已加载Web API"), new Web(o, config.api.server.url, s))
}

class ConfirmedTimestamp {
    constructor(e) {
        this.serverTs = 0,
            this.localTs = 0,
            this.timeDif = 0,
            this.loaderFunction = e;
    }
    init(t) {
        this.loaderFunction((n) => {
            n && !isNaN(Number(n)) ? this.serverTs = Number(n) : this.serverTs = Math.round(Date.now() / 1e3),
                this.localTs = Math.round(Date.now() / 1e3),
                this.timeDif = this.serverTs - this.localTs,
                logger.info("Ts", "Loaded " + n + " Used: " + this.serverTs + " Dif: " + this.timeDif),
                t();
        });
    }
    getConfirmedNow() {
        return Math.round(Date.now() / 1e3) + this.timeDif;
    }
}
class Play {
    constructor() {
        this.userHash = null
        this.api = null
        this.saveManager = null
        this.purchasesManager = null
        this.confirmedTimestamp = null
        this.game = null
        this.missions = {}
    }
    getMeta() {
        return Meta;
    }
    getGame() {
        return this.game;
    }
    getMission(e) {
        return this.missions[e];
    }
    getSaveManager() {
        return this.saveManager;
    }
    getPurchasesManager() {
        return this.purchasesManager;
    }
    getApi() {
        return this.api;
    }
    getUserHash() {
        return this.userHash;
    }
    isDevMode() {
        return UrlHandler.identifySite() == "localhost";
    }
    init(r, c) {
        this.userHash = new UserHash(config.userHash.key)
        this.userHash.init()
        this.api = ApiFactory(UrlHandler.identifySite(), this.userHash.getUserHash())
        this.api.init(() => {
            this.confirmedTimestamp = new ConfirmedTimestamp(this.api.getTimestamp.bind(this.api))
            this.confirmedTimestamp.init(() => {
                this.game = new Game(Meta.main, this.confirmedTimestamp)
                this.missions = {}
                for (var e in Meta.missions)
                    this.missions[e] = new Game(Meta.missions[e]);
                this.saveManager = this._createSaveManager()
                this.saveManager.init(r, () => {
                    this.purchasesManager = new PurchasesManager(this)
                    this.purchasesManager.init(() => {
                        this.game.init()
                        logger.info("Play", "初始化")
                        c()
                    });
                });
            });
        });
    }
    _createSaveManager() {
        return (new SaveManager(this.api, this.userHash, "FactoryIdleSave")).setGetSaveDataCallback(() => {
            return {
                meta: {
                    ver: this.game.getTicker().getNoOfTicks(),
                    timestamp: Math.round(Date.now() / 1e3),
                    date: dateToStr(new Date, true)
                },
                data: Base64ArrayBuffer.encode(this.exportToWriter().getBuffer())
            };
        }).setUpdateGameFromLoadedDataCallback((e) => {
            logger.info("Play", "Game loaded from save");
            try {
                this.importFromReader(new BinaryArrayReader(Base64ArrayBuffer.decode(e.data))),
                    this.game.getTicker().addOfflineGains();
            } catch (t) {
                logger.error("Play", "Could not update game from save data", t.message);
            }
        });
    }
    destroy() {
        this.game.destroy()
        this.api.destroy()
        this.saveManager.destroy()
        this.purchasesManager.destroy();
        for (var e in this.missions)
            this.missions[e].destroy();
    }
    exportToWriter() {
        return this.game.exportToWriter();
    }
    importFromReader(e) {
        this.game.importFromReader(e);
    }
}
class ImageMap {
    constructor(e) {
        this.path = e,
            this.noOfImages = 0,
            this.noOfImagesLoaded = 0,
            this.imagesData = {},
            this.images = {};
    }
    addImages(e) {
        for (var t in e)
            this.imagesData[t] || (this.noOfImages++, this.imagesData[t] = this.path + e[t]);
        return this;
    }
    loadAll(t) {
        logger.info("ImageMap", "Start loading " + this.noOfImages + " images");
        var n = this;
        for (var r in this.imagesData) {
            var i = new Image;
            i.onload = () => {
                n.noOfImagesLoaded++,
                    n.noOfImagesLoaded == n.noOfImages && (logger.info("ImageMap", "Loaded " + n.noOfImagesLoaded + " images"), t());
            },
                i.src = this.imagesData[r] + "?x=" + Math.random(),
                this.images[r] = i;
        }
    }
    getImage(e) {
        return this.images[e];
    }
}
var AlertUi_t = 0;
class AlertUi {
    constructor(e, n) {
        this.title = e
        this.message = n
        this.buttonTitle = "好"
        this.id = "alert" + AlertUi_t++
        this.idBg = this.id + "Bg"
    }
    setButtonTitle(e) {
        this.buttonTitle = e
        return this;
    }
    setCallback(e) {
        this.callback = e
        return this;
    }
    display() {
        this.container = $("body")
        this.container.append(Handlebars.compile(template.alert)({
            id: this.id,
            idBg: this.idBg,
            title: this.title,
            message: this.message,
            buttonTitle: this.buttonTitle
        }))
        this.element = this.container.find("#" + this.id)
        this.bg = this.container.find("#" + this.idBg)
        this.element.find(".button").click(() => {
            this.hide()
            this.callback && this.callback();
        })
        this.element.css("top", Math.round(($(window).height() - this.element.height()) / 2))
        this.element.css("left", Math.round(($(window).width() - this.element.width()) / 2))
        this.bg.hide().fadeIn(200)
        this.element.hide().fadeIn(200)
        return this;
    }
    hide() {
        this.element && this.element.fadeOut(200, () => {
            this.element.remove();
        })
        this.bg && this.bg.fadeOut(200, () => {
            this.bg.remove();
        });
    }
}
class BuyFactoryAction {
    constructor(e, t) {
        this.game = e
        this.factoryMeta = this.game.getMeta().factoriesById[t];
    }
    canBuy() {
        return this.game.getMoney() >= this.factoryMeta.price;
    }
    buy() {
        this.game.addMoney(-this.factoryMeta.price);
        var e = this.game.getFactory(this.factoryMeta.id);
        e.reset()
        e.setIsBought(true);
    }
}
class FactoriesUi {
    constructor(e, t, n) {
        this.globalUiEm = e
        this.gameUiEm = t
        this.game = n
        this.statistics = n.getStatistics()
    }
    display(i) {
        this.container = i;
        var o = [], u = this.game.getMeta().factories;
        for (var a in u) {
            var f = u[a],
                l = this.game.getFactory(f.id);
            o.push({
                id: f.id,
                name: f.name,
                price: nf(f.price),
                isBought: l.getIsBought(),
                isPaused: this.game.getFactory(f.id).getIsPaused()
            });
        }
        this.container.html(Handlebars.compile(template.factories)({
            factories: o,
            researchBought: !!this.game.getResearchManager().getResearch("researchCenter")
        }))
        this.container.find(".selectButton").click((e) => {
            var t = $(e.target).attr("data-id");
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY, t);
        })
        this.container.find(".buyButton").click((e) => {
            var r = $(e.target).attr("data-id"),
                i = new BuyFactoryAction(this.game, r);
            if (i.canBuy()) {
                i.buy()
                this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY, r)
            } else {
                (new AlertUi("", "你没有足够的金钱购买这个工厂!")).display()
            }
        })
        this.game.getEventManager().addListener("factoriesUi", GameEvent.GAME_TICK, () => {
            this.update();
        })
        this.update()
        $("#missionsButton").click(() => {
            this.globalUiEm.invokeEvent(GlobalUiEvent.SHOW_MISSIONS);
        })
        $("#missionsButton").hide();

        //插件
        const {
            game: { factories }
        } = this;
        $('.factoryButton').each(function () {
            const { id } = $(this).data();

            if (!factories[id].isBought) {
                const $timeUntil = $('<span />').addClass('te-time-until');

                $(this).find('.money').after($timeUntil);
            }
        });
    }
    update() {
        var e = this;
        this.container.find("#money").html(nf(this.game.getMoney()))
        this.container.find("#researchPoints").html(nf(this.game.getResearchPoints()));
        var t = this.statistics.getAvgProfit();
        this.container.find("#income").html(t ? nf(t) : " ? ");
        var r = this.statistics.getAvgResearchPointsProduction();
        this.container.find("#researchIncome").html(r ? nf(r) : " ? ")
        this.container.find(".factoryButton").each(function () {
            var t = $(this).attr("data-id"),
                r = e.statistics.getFactoryAvgProfit(t);
            $(this).find(".money[data-key='income']").html(r ? nf(r, true) : " ? ");
            var i = e.statistics.getFactoryAvgResearchPointsProduction(t);
            $(this).find(".research[data-key='researchProduction']").html(i ? nf(i, true) : " ? "),
                (new BuyFactoryAction(e.game, t)).canBuy() ? $(this).find(".buyButton").removeClass("cantBuy").html("购买") : $(this).find(".buyButton").addClass("cantBuy").html("太贵了");
        })
        this.container.find("#ticks").html(nf(this.game.getTicker().getActualTicksPerSec()));
        //插件
        const {
            game: {
                money,
                factories,
                statistics,
                ticker: { actualTicksPerSec }
            }
        } = this;
        const avgProfit = statistics.getAvgProfit();
        const avgProfitPerSecond = avgProfit * actualTicksPerSec.actual;

        $('.factoryButton').each(function () {
            const id = $(this).data('id');

            const factory = factories[id];
            if (factory.isBought) return; // Factory is already bought

            const moneyNeeded = factory.meta.price - money;
            const timeUntil = formatTime(moneyNeeded / avgProfitPerSecond);

            if (timeUntil !== '') { // Only move button after timeUntil is calculated
                $(this).find('.buyButton').css({ marginTop: 20 }); // Move buyButton so it's not pushed off the factoryButton
            } else {
                $(this).find('.buyButton').css({ marginTop: 36 }); // Move it back
            }

            $(this).find('.te-time-until').html(timeUntil);
        });
    }
    destroy() {
        this.globalUiEm.removeListenerForType("factoriesUi")
        this.gameUiEm.removeListenerForType("factoriesUi")
        this.game.getEventManager().removeListenerForType("factoriesUi")
        this.container.html("")
        this.container = null
    }
}
class MenuUi {
    constructor(e, t, n) {
        this.globalUiEm = e,
            this.gameUiEm = t,
            this.factory = n,
            this.game = n.getGame();
    }
    display(t) {
        var r = this.game.getMeta().isMission;
        this.container = t
        this.container.html(Handlebars.compile(template.menu)({
            isMission: r,
            hasResearch: this.game.getMeta().research.length > 0,
            hasUpgrades: this.game.getMeta().upgrades.length > 0,
            hasAchievements: this.game.getMeta().achievements.length > 0,
            hasStatistics: !this.game.getMeta().isMission
        }))
        this.container.find("#missionsButton").click(() => {
            this.globalUiEm.invokeEvent(GlobalUiEvent.SHOW_MISSIONS);
        })
        this.container.find("#mainGameButton").click(() => {
            this.globalUiEm.invokeEvent(GlobalUiEvent.SHOW_MAIN_GAME);
        })
        this.container.find("#factoriesButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORIES);
        })
        this.container.find("#researchButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_RESEARCH, this.factory.getMeta().id);
        })
        this.container.find("#upgradesButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_UPGRADES, this.factory.getMeta().id);
        })
        this.container.find("#achievementsButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_ACHIEVEMENTS, this.factory.getMeta().id);
        })
        this.container.find("#helpButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_HELP);
        })
        this.container.find("#statisticsButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_STATISTICS);
        })
        this.container.find("#extraButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_PURCHASES);
        })
        this.container.find("#settingsButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_SETTINGS);
        })
        this.container.find("#timeTravelButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_TIME_TRAVEL);
        })
        this.game.getEventManager().addListener("factoryMenuUi", GameEvent.GAME_TICK, () => {
            this.updateButtons();
        })
        this.updateButtons();
        //插件
        const $box = $('.menuBox', this.container);
        const $button = $('<a id="togglebgButton" href="javascript:void(0);">后台</a>');

        $button.click(() => {
            this.globalUiEm.invokeEvent(START_BACKGROUND_MODE);
        });
        $box.append($button);
    }
    updateButtons() {
        this.factory.getGame().getAchievementsManager().getAchievement("makingProfit") ? this.container.find("#researchButton").show() : this.container.find("#researchButton").hide()
        this.factory.getGame().getAchievementsManager().getAchievement("gettingSmarter") ? this.container.find("#upgradesButton").show() : this.container.find("#upgradesButton").hide()
        this.factory.getGame().getAchievementsManager().getAchievement("collectingCash2") ? this.container.find("#statisticsButton").show() : this.container.find("#statisticsButton").hide()
        this.factory.getGame().getAchievementsManager().getAchievement("collectingCash") ? (this.container.find("#extraButton").show(), this.container.find("#timeTravelButton").show()) : (this.container.find("#extraButton").hide(), this.container.find("#timeTravelButton").hide());
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("factoryMenuUi")
        this.gameUiEm.removeListenerForType("factoryMenuUi")
        this.globalUiEm.removeListenerForType("factoryMenuUi")
        this.container.html("")
        this.container = null
    }
}
class BackgroundLayer {
    constructor(e, t, n) {
        this.imageMap = e
        this.factory = t
        this.tileSize = n.tileSize
        this.tilesX = t.getMeta().tilesX
        this.tilesY = t.getMeta().tilesY
    }
    display(t) {
        this.container = t
        this.canvas = document.createElement("canvas")
        this.canvas.style.position = "absolute"
        this.canvas.width = this.tilesX * this.tileSize
        this.canvas.height = this.tilesY * this.tileSize
        t.append(this.canvas)
        this.sprite = this.imageMap.getImage("terrains")
        this.redraw()
        this.factory.getEventManager().addListener("LayerBackground", FactoryEvent.TILE_TYPE_CHANGED, () => {
            this.redraw();
        })
        this.shouldDrawBuildableAreas = false
        this.factory.getEventManager().addListener("LayerBackground", FactoryEvent.MAP_TOOL_SELECTED, (e) => {
            this.shouldDrawBuildableAreas = !!e
            this.redraw();
        });
    }
    getCanvas() {
        return this.canvas;
    }
    redraw() {
        var e = this.canvas.getContext("2d");
        e.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var t = {
            "undefined": {
                y: 0,
                tiles: 6
            },
            grass: {
                y: 0,
                tiles: 6
            },
            floor: {
                y: 1,
                tiles: 6
            },
            wall: {
                y: 1,
                tiles: 6
            },
            road: {
                y: 0,
                tiles: 6
            }
        };
        this.drawTerrain(e, t);
        var n = this.factory.getTiles();
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            i.getTerrain() == "wall" && this.drawTerrainBorders(e, i, 7, 1, {
                grass: true,
                road: true
            }),
                i.getTerrain() == "floor" && this.drawTerrainBorders(e, i, 7, 1, {
                    grass: true,
                    road: true
                }),
                i.getTerrain() == "road" && this.drawRoad(e, i, 2, {
                    road: true
                }),
                i.getTerrain() == "wall" && this.drawTerrainBorders(e, i, 10, 6, {
                    floor: true,
                    grass: true,
                    road: true
                });
        }
        this.shouldDrawBuildableAreas && this.drawBuildableAreas();
    }
    drawBuildableAreas() {
        var e = {
            " ": "greenSelection",
            "-": "yellowSelection",
            X: "redSelection"
        }, t = this.canvas.getContext("2d"), n = this.factory.getTiles();
        for (var r = 0; r < n.length; r++) {
            var i = n[r],
                s = this.imageMap.getImage(e[i.getBuildableType()]),
                o = i.getX() * this.tileSize,
                u = i.getY() * this.tileSize;
            t.drawImage(s, o, u, this.tileSize, this.tileSize);
        }
    }
    drawTerrain(e, t) {
        var n = this.factory.getTiles();
        for (var r = 0; r < n.length; r++) {
            var i = n[r], s = i.getX() * this.tileSize, o = i.getY() * this.tileSize, u = t[i.getTerrain()], a = Math.floor(u.tiles * Math.random()) * (this.tileSize + 1), f = u.y * (this.tileSize + 1);
            e.drawImage(this.sprite, a, f, this.tileSize, this.tileSize, s, o, this.tileSize, this.tileSize);
        }
    }
    drawTerrainBorders(e, t, n, r, i) {
        var s = !t.getTileInDirection("top") || i[t.getTileInDirection("top").getTerrain()],
            o = !t.getTileInDirection("right") || i[t.getTileInDirection("right").getTerrain()],
            u = !t.getTileInDirection("bottom") || i[t.getTileInDirection("bottom").getTerrain()],
            a = !t.getTileInDirection("left") || i[t.getTileInDirection("left").getTerrain()],
            f = !t.getTileInDirection("top_right") || i[t.getTileInDirection("top_right").getTerrain()],
            l = !t.getTileInDirection("top_left") || i[t.getTileInDirection("top_left").getTerrain()],
            c = !t.getTileInDirection("bottom_right") || i[t.getTileInDirection("bottom_right").getTerrain()],
            h = !t.getTileInDirection("bottom_left") || i[t.getTileInDirection("bottom_left").getTerrain()],
            p = this.tileSize,
            d = p + 1,
            v = t.getX() * this.tileSize,
            m = t.getY() * this.tileSize,
            g = n * d, y = (n + 1) * d,
            b = (n + 2) * d,
            w = 11,
            E = 10,
            r = Math.floor(r * Math.random()) * d;
        s && o && e.drawImage(this.sprite, 3 * d + E, b + 0, w, w, v + E, m + 0, w, w)
        s && a && e.drawImage(this.sprite, 3 * d + 0, b + 0, w, w, v + 0, m + 0, w, w)
        u && o && e.drawImage(this.sprite, 3 * d + E, b + E, w, w, v + E, m + E, w, w)
        u && a && e.drawImage(this.sprite, 3 * d + 0, b + E, w, w, v + 0, m + E, w, w)
        f && !s && !o && e.drawImage(this.sprite, 0 * d + E, b + 0, w, w, v + E, m + 0, w, w)
        l && !s && !a && e.drawImage(this.sprite, 0 * d + 0, b + 0, w, w, v + 0, m + 0, w, w)
        c && !u && !o && e.drawImage(this.sprite, 0 * d + E, b + E, w, w, v + E, m + E, w, w)
        h && !u && !a && e.drawImage(this.sprite, 0 * d + 0, b + E, w, w, v + 0, m + E, w, w);
        var S = a ? E : 0,
            x = o ? E : 0,
            T = s ? E : 0,
            N = u ? E : 0;
        s && e.drawImage(this.sprite, r + 0 + S, g + 0 + 0, p - S - x, w, v + 0 + S, m + 0, p - S - x, w),
            u && e.drawImage(this.sprite, r + 0 + S, g + 0 + E, p - S - x, w, v + 0 + S, m + E, p - S - x, w),
            o && e.drawImage(this.sprite, r + E, y + 0 + T, w, p - T - N, v + E, m + 0 + T, w, p - T - N),
            a && e.drawImage(this.sprite, r + 0, y + 0 + T, w, p - T - N, v + 0, m + 0 + T, w, p - T - N);
    }
    drawRoad(e, t, n, r) {
        var i = !t.getTileInDirection("top") || r[t.getTileInDirection("top").getTerrain()],
            s = !t.getTileInDirection("right") || r[t.getTileInDirection("right").getTerrain()],
            o = !t.getTileInDirection("bottom") || r[t.getTileInDirection("bottom").getTerrain()],
            u = !t.getTileInDirection("left") || r[t.getTileInDirection("left").getTerrain()],
            a = {
                "0000": [0, 0],
                1e3: [1, 0],
                "0100": [2, 0],
                "0010": [3, 0],
                "0001": [4, 0],
                1010: [0, 1],
                "0101": [0, 2],
                1100: [0, 3],
                "0110": [1, 3],
                "0011": [2, 3],
                1001: [3, 3],
                1111: [4, 4],
                1110: [0, 4],
                "0111": [1, 4],
                1011: [2, 4],
                1101: [3, 4]
            },
            f = a[(i ? "1" : "0") + (s ? "1" : "0") + (o ? "1" : "0") + (u ? "1" : "0")];
        e.drawImage(this.sprite, f[0] * (this.tileSize + 1), (n + f[1]) * (this.tileSize + 1), this.tileSize, this.tileSize, t.getX() * this.tileSize, t.getY() * this.tileSize, this.tileSize, this.tileSize);
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("LayerBackground")
        this.container.html("")
        this.container = null;
    }
}
class Default {
    constructor(e, t) {
        this.imageMap = e
        this.tileSize = t.tileSize;
    }
    drawComponentLayer(e, t) {
        if (!t.isMainComponentContainer())
            return;
        var n = t.getComponent().getMeta(),
            r = this.imageMap.getImage("components"),
            i = n.spriteX * (this.tileSize + 1),
            s = n.spriteY * (this.tileSize + 1),
            o = t.getX() * this.tileSize,
            u = t.getY() * this.tileSize,
            a = this.tileSize * n.width,
            f = this.tileSize * n.height;
        e.drawImage(r, i, s, a, f, o, u, a, f);
    }
}
class Track {
    constructor(e, t) {
        this.imageMap = e,
            this.tileSize = t.tileSize,
            this.drawMap = this._getDrawMap();
    }
    drawComponentLayer(e, t) {
        if (!t.isMainComponentContainer())
            return;
        var n = t.getComponent().getMeta(),
            r = this._getDrawParameters(t),
            i = this.imageMap.getImage(n.id),
            s = r.n * this.tileSize,
            o = 0,
            u = this.tileSize * n.width,
            a = this.tileSize * n.height,
            f = t.getX() * this.tileSize,
            l = t.getY() * this.tileSize,
            c = this.tileSize * n.width,
            h = this.tileSize * n.height,
            p = r.rotation, d = r.flip;
        this._drawImage(e, i, s, o, u, a, f, l, c, h, p, d)
        e.font = "9px Arial"
        e.textAlign = "center"
    }
    _getDrawParameters(e) {
        var t = e.getInputOutputManager().getInputsByDirection(),
            n = e.getInputOutputManager().getOutputsByDirection(),
            r = (t.top ? "1" : "0") + (t.right ? "1" : "0") + (t.bottom ? "1" : "0") + (t.left ? "1" : "0"),
            i = (n.top ? "1" : "0") + (n.right ? "1" : "0") + (n.bottom ? "1" : "0") + (n.left ? "1" : "0");
        return this.drawMap[r] && this.drawMap[r][i] ? this.drawMap[r][i] : this.drawMap.error;
    }
    _drawImage(e, t, n, r, i, s, o, u, a, f, l, c) {
        e.save();
        var h = l * Math.PI / 180;
        c || (h = 2 * Math.PI - h),
            e.translate(o + a / 2, u + f / 2),
            e.rotate(h),
            c && e.scale(-1, 1),
            e.drawImage(t, n, r + 1, i, s, -a / 2, -f / 2, a, f),
            e.restore();
    }
    _getDrawMap() {
        return {
            error: {
                n: 17,
                rotation: 0,
                flip: false
            },
            "0000": {
                "0000": {
                    n: 0,
                    rotation: 0,
                    flip: false
                },
                1e3: {
                    n: 1,
                    rotation: 0,
                    flip: false
                },
                "0100": {
                    n: 1,
                    rotation: -90,
                    flip: false
                },
                "0010": {
                    n: 1,
                    rotation: 180,
                    flip: false
                },
                "0001": {
                    n: 1,
                    rotation: 90,
                    flip: false
                }
            },
            1e3: {
                "0000": {
                    n: 2,
                    rotation: 0,
                    flip: false
                },
                "0100": {
                    n: 4,
                    rotation: 0,
                    flip: false
                },
                "0010": {
                    n: 3,
                    rotation: 0,
                    flip: false
                },
                "0001": {
                    n: 4,
                    rotation: 0,
                    flip: true
                },
                "0110": {
                    n: 5,
                    rotation: 0,
                    flip: true
                },
                "0101": {
                    n: 6,
                    rotation: 0,
                    flip: false
                },
                "0011": {
                    n: 5,
                    rotation: 0,
                    flip: false
                },
                "0111": {
                    n: 7,
                    rotation: 0,
                    flip: false
                }
            },
            "0100": {
                "0000": {
                    n: 2,
                    rotation: 270,
                    flip: false
                },
                1e3: {
                    n: 4,
                    rotation: 90,
                    flip: true
                },
                "0010": {
                    n: 4,
                    rotation: 270,
                    flip: false
                },
                "0001": {
                    n: 3,
                    rotation: 270,
                    flip: false
                },
                1010: {
                    n: 6,
                    rotation: 270,
                    flip: false
                },
                1001: {
                    n: 5,
                    rotation: 270,
                    flip: false
                },
                "0011": {
                    n: 5,
                    rotation: 90,
                    flip: true
                },
                1011: {
                    n: 7,
                    rotation: 270,
                    flip: false
                }
            },
            "0010": {
                "0000": {
                    n: 2,
                    rotation: 180,
                    flip: false
                },
                1e3: {
                    n: 3,
                    rotation: 180,
                    flip: false
                },
                "0100": {
                    n: 4,
                    rotation: 180,
                    flip: true
                },
                "0001": {
                    n: 4,
                    rotation: 180,
                    flip: false
                },
                1100: {
                    n: 5,
                    rotation: 180,
                    flip: false
                },
                1001: {
                    n: 5,
                    rotation: 180,
                    flip: true
                },
                "0101": {
                    n: 6,
                    rotation: 180,
                    flip: false
                },
                1101: {
                    n: 7,
                    rotation: 180,
                    flip: false
                }
            },
            "0001": {
                "0000": {
                    n: 2,
                    rotation: 90,
                    flip: false
                },
                1e3: {
                    n: 4,
                    rotation: 90,
                    flip: false
                },
                "0100": {
                    n: 3,
                    rotation: 90,
                    flip: false
                },
                "0010": {
                    n: 4,
                    rotation: 270,
                    flip: true
                },
                1100: {
                    n: 5,
                    rotation: 270,
                    flip: true
                },
                1010: {
                    n: 6,
                    rotation: 90,
                    flip: false
                },
                "0110": {
                    n: 5,
                    rotation: 90,
                    flip: false
                },
                1110: {
                    n: 7,
                    rotation: 90,
                    flip: false
                }
            },
            1100: {
                "0000": {
                    n: 8,
                    rotation: 0,
                    flip: false
                },
                "0010": {
                    n: 10,
                    rotation: 0,
                    flip: true
                },
                "0001": {
                    n: 10,
                    rotation: 270,
                    flip: false
                },
                "0011": {
                    n: 13,
                    rotation: 270,
                    flip: false
                }
            },
            1010: {
                "0000": {
                    n: 9,
                    rotation: 0,
                    flip: false
                },
                "0100": {
                    n: 11,
                    rotation: 90,
                    flip: false
                },
                "0001": {
                    n: 11,
                    rotation: 270,
                    flip: false
                },
                "0101": {
                    n: 12,
                    rotation: 90,
                    flip: true
                }
            },
            1001: {
                "0000": {
                    n: 8,
                    rotation: 90,
                    flip: false
                },
                "0100": {
                    n: 10,
                    rotation: 270,
                    flip: true
                },
                "0010": {
                    n: 10,
                    rotation: 0,
                    flip: false
                },
                "0110": {
                    n: 13,
                    rotation: 0,
                    flip: false
                }
            },
            "0110": {
                "0000": {
                    n: 8,
                    rotation: 270,
                    flip: false
                },
                1e3: {
                    n: 10,
                    rotation: 180,
                    flip: false
                },
                "0001": {
                    n: 10,
                    rotation: 90,
                    flip: true
                },
                1001: {
                    n: 13,
                    rotation: 180,
                    flip: false
                }
            },
            "0101": {
                "0000": {
                    n: 9,
                    rotation: 90,
                    flip: false
                },
                1e3: {
                    n: 11,
                    rotation: 180,
                    flip: false
                },
                "0010": {
                    n: 11,
                    rotation: 0,
                    flip: false
                },
                1010: {
                    n: 12,
                    rotation: 0,
                    flip: false
                }
            },
            "0011": {
                "0000": {
                    n: 8,
                    rotation: 180,
                    flip: false
                },
                1e3: {
                    n: 10,
                    rotation: 180,
                    flip: true
                },
                "0100": {
                    n: 10,
                    rotation: 90,
                    flip: false
                },
                1100: {
                    n: 13,
                    rotation: 90,
                    flip: false
                }
            },
            1110: {
                "0000": {
                    n: 15,
                    rotation: 270,
                    flip: false
                },
                "0001": {
                    n: 14,
                    rotation: 270,
                    flip: false
                }
            },
            1101: {
                "0000": {
                    n: 15,
                    rotation: 0,
                    flip: false
                },
                "0010": {
                    n: 14,
                    rotation: 0,
                    flip: false
                }
            },
            1011: {
                "0000": {
                    n: 15,
                    rotation: 90,
                    flip: false
                },
                "0100": {
                    n: 14,
                    rotation: 90,
                    flip: false
                }
            },
            "0111": {
                "0000": {
                    n: 15,
                    rotation: 180,
                    flip: false
                },
                1e3: {
                    n: 14,
                    rotation: 180,
                    flip: false
                }
            },
            1111: {
                "0000": {
                    n: 16,
                    rotation: 0,
                    flip: false
                }
            }
        };
    }
}
class ComponentLayer {
    constructor(n, r, i) {
        this.imageMap = n
        this.factory = r
        this.game = r.getGame()
        this.tileSize = i.tileSize
        this.tilesX = r.getMeta().tilesX
        this.tilesY = r.getMeta().tilesY
        this.canvas = null
        this.strategies = {
            "default": new Default(this.imageMap, {
                tileSize: this.tileSize
            }),
            track: new Track(this.imageMap, {
                tileSize: this.tileSize
            })
        }
        this.tilesWithComponentCache = [];
    }
    getCanvas() {
        return this.canvas;
    }
    display(e) {
        this.container = e
        this.canvas = document.createElement("canvas")
        this.canvas.style.position = "absolute"
        this.canvas.width = this.tilesX * this.tileSize
        this.canvas.height = this.tilesY * this.tileSize
        e.append(this.canvas)
        this.factory.getEventManager().addListener("LayerComponent", FactoryEvent.FACTORY_COMPONENTS_CHANGED, () => {
            this.buildCache()
            this.redraw()
        })
        this.factory.getEventManager().addListener("LayerComponent", FactoryEvent.FACTORY_TICK, (e) => {
            this.game.getTicker().getIsFocused();
        })
        this.buildCache()
        this.redraw()
    }
    buildCache() {
        this.tilesWithComponentCache = [];
        var e = this.factory.getTiles();
        for (var t = 0; t < e.length; t++) {
            var n = e[t], r = n.getComponent();
            if (!r) continue;
            this.tilesWithComponentCache.push(n);
        }
    }
    redraw() {
        var t = this.canvas.getContext("2d");
        t.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var n = 0; n < this.tilesWithComponentCache.length; n++) {
            var r = this.tilesWithComponentCache[n],
                i = r.getComponent().getMeta().drawStrategy;
            this.strategies[i || "default"].drawComponentLayer(t, r);
        }
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("LayerComponent"),
            this.container.html(""),
            this.container = null,
            this.canvas = null;
    }
}
class PackageLayer {
    constructor(e, t, n) {
        this.imageMap = e,
            this.factory = t,
            this.game = t.getGame(),
            this.tileSize = n.tileSize,
            this.packageSize = 15;
        var r = 5, i = this.packageSize / 3;
        this.tilesX = t.getMeta().tilesX,
            this.tilesY = t.getMeta().tilesY,
            this.resourcesMeta = this.factory.getGame().getMeta().resourcesById,
            this.firstPackageLocation = {
                top: {
                    top: -this.packageSize + i,
                    bottom: -this.tileSize / 2 - i
                },
                bottom: {
                    top: this.tileSize / 2 - this.packageSize + i,
                    bottom: 0 - i
                },
                right: {
                    right: 0 - i,
                    left: this.tileSize / 2 - this.packageSize + i
                },
                left: {
                    right: -this.tileSize / 2 - i,
                    left: -this.packageSize + i
                }
            },
            this.movementDirectionCoefficient = {
                top: {
                    top: -r,
                    bottom: r
                },
                bottom: {
                    top: -r,
                    bottom: r
                },
                right: {
                    right: r,
                    left: -r
                },
                left: {
                    right: r,
                    left: -r
                }
            },
            this.canvas = null,
            this.queuesCache = [];
    }
    getCanvas() {
        return this.canvas;
    }
    display(t) {
        var n = this;
        this.container = t
        this.canvas = document.createElement("canvas")
        this.canvas.style.position = "absolute"
        this.canvas.width = this.tilesX * this.tileSize
        this.canvas.height = this.tilesY * this.tileSize
        t.append(this.canvas)
        this.factory.getEventManager().addListener("LayerPackage", FactoryEvent.FACTORY_TICK, () => {
            this.game.getTicker().getIsFocused() && this.redraw();
        })
        this.factory.getEventManager().addListener("LayerPackage", FactoryEvent.FACTORY_COMPONENTS_CHANGED, () => {
            this.buildCache()
            this.redraw()
        })
        n.buildCache()
        n.redraw()
    }
    buildCache() {
        this.queuesCache = [];
        var e = this.factory.getTiles();
        for (var t = 0; t < e.length; t++) {
            var n = e[t], r = n.getComponent();
            if (!n.getComponent() || n.getComponent().getMeta().strategy.type != "transport")
                continue;
            var i = n.getComponent().getStrategy().getInputQueues(), s = n.getComponent().getStrategy().getOutputQueues();
            this._addQueueToCache(n, i.top, "top", "bottom")
            this._addQueueToCache(n, s.top, "top", "top")
            this._addQueueToCache(n, s.left, "left", "left")
            this._addQueueToCache(n, i.left, "left", "right")
            this._addQueueToCache(n, i.right, "right", "left")
            this._addQueueToCache(n, s.right, "right", "right")
            this._addQueueToCache(n, s.bottom, "bottom", "bottom")
            this._addQueueToCache(n, i.bottom, "bottom", "top")
        }
    }
    _addQueueToCache(e, t, n, r) {
        if (!t)
            return;
        this.queuesCache.push({
            tile: e,
            queue: t,
            posDir: n,
            moveDir: r
        });
    }
    redraw() {
        var e = this.canvas.getContext("2d");
        e.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var t;
        for (var n = 0; n < this.queuesCache.length; n++)
            t = this.queuesCache[n],
                this.drawQueue(t.tile, t.queue, t.posDir, t.moveDir);
    }
    drawQueue(e, t, n, r) {
        var i = e.getX() * this.tileSize + this.tileSize / 2, s = e.getY() * this.tileSize + this.tileSize / 2, o, u, a, f, l;
        for (var c = 0; c < t.getLength(); c++) {
            var h = c;
            if (r == "top" || r == "left")
                h = t.getLength() - c - 1;
            o = t.get(h);
            if (!o)
                continue;
            f = this.resourcesMeta[o.getResourceId()].spriteX * (this.packageSize + 1),
                l = this.resourcesMeta[o.getResourceId()].spriteY * (this.packageSize + 1),
                n == "left" || n == "right" ? (u = i + this.firstPackageLocation[n][r] + this.movementDirectionCoefficient[n][r] * h + o.getOffset() / 2, a = s - this.packageSize / 2 + o.getOffset()) : (u = i - this.packageSize / 2 + o.getOffset(), a = s + this.firstPackageLocation[n][r] + this.movementDirectionCoefficient[n][r] * h + o.getOffset() / 2),
                this.canvas.getContext("2d").drawImage(this.imageMap.getImage("resources"), f, l, this.packageSize, this.packageSize, Math.round(u) + 2, Math.round(a) + 2, this.packageSize - 4, this.packageSize - 4);
        }
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("LayerPackage")
        this.container.html("")
        this.container = null
        this.canvas = null
    }
}
class SellComponentAction {
    constructor(e, t, n) {
        this.tile = e,
            this.factory = e.getFactory(),
            this.width = t ? t : 1,
            this.height = n ? n : 1;
    }
    canSell() {
        return true;
    }
    sell() {
        for (var e = 0; e < this.width; e++)
            for (var t = 0; t < this.height; t++) {
                var n = this.factory.getTile(this.tile.getX() + e, this.tile.getY() + t);
                this._sellTile(n);
            }
    }
    _sellTile(e) {
        if (!e.getComponent())
            return;
        var t = e.getComponent().getMeta(), n = e.getComponent().getX(), r = e.getComponent().getY(), i = true;
        for (var s in this.factory.getMeta().startComponents) {
            var o = this.factory.getMeta().startComponents[s];
            o.x == n && o.y == r && o.id == t.id && (i = false);
        }
        for (var u = 0; u < t.width; u++)
            for (var a = 0; a < t.height; a++) {
                var f = this.factory.getTile(n + u, r + a);
                f.setComponent(null);
            }
        this.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_COMPONENTS_CHANGED, e),
            i && this.factory.getGame().addMoney(t.price * t.priceRefund);
    }
}
class UpdateTileAction {
    constructor(e, t) {
        this.tile = e
        this.factory = e.getFactory()
        this.toolId = t
    }
    canUpdate() {
        return !!this.toolId;
    }
    update() {
        var t = this.toolId.split("-");
        t[0] == "terrain" ? (this.tile.setTerrain(t[1]), this.tile.getFactory().getMeta().buildableTerrains[t[1]] ? this.tile.setBuildableType(Tile.BUILDABLE_YES) : this.tile.setBuildableType(Tile.BUILDABLE_NO)) : t[0] == "buildable" && t[1] == "road" && this.tile.setBuildableType(Tile.BUILDABLE_PARTIAL),
            this.factory.getEventManager().invokeEvent(FactoryEvent.TILE_TYPE_CHANGED, this.tile);
    }
}
var TipUi_t = 0;
class TipUi {
    constructor(e, t) {
        this.initElement = e,
            typeof t == "string" ? this.content = t : this.element = t,
            this.isVisible = false;
    }
    init() {
        var n = this;
        if (!this.element) {
            this.id = "tip" + TipUi_t++;
            var r = $("body");
            r.append(Handlebars.compile(template.tip)({
                id: this.id,
                content: this.content
            })),
                this.element = r.find("#" + this.id);
        }
        return this.element.css("position", "absolute").hide(),
            this.mouseMove = function (e) {
                n.updateLocation(e),
                    n.display();
            },
            this.mouseOut = function (e) {
                n.hide();
            },
            this.initElement.bind("mousemove", this.mouseMove).bind("mouseout", this.mouseOut),
            this;
    }
    destroy() {
        return this.hide(),
            this.initElement.unbind("mousemove", this.mouseMove).unbind("mouseout", this.mouseOut),
            this;
    }
    display() {
        if (this.isVisible)
            return;
        this.isVisible = true,
            this.element.fadeIn(200);
    }
    updateLocation(e) {
        var t = this.element.width(), n = this.element.height(), r = e.pageX - t / 2, i = e.pageY + 15, s = $(window).width(), o = $(window).height(), u = $(window).scrollLeft(), a = $(window).scrollTop();
        r - u < 10 && (r = u + 10),
            r + t - u > s - 20 && (r = s + u - t - 20),
            i + n - a > o - 20 && (i = e.pageY - n - 20),
            this.element.css("left", r).css("top", i);
    }
    hide() {
        if (!this.isVisible)
            return;
        this.element.finish().fadeOut(200),
            this.isVisible = false;
    }
}
class MouseInfoHelper {
    constructor(e, t, n) {
        this.factory = e,
            this.game = e.getGame(),
            this.imageMap = t,
            this.tileSize = n,
            this.lastTip = null;
    }
    display(e) {
        this.container = e;
    }
    destroy() {
        this.container = null;
    }
    updateMouseInformationModes(t, n) {
        if (!n || !t) {
            this.turnOffBuildMode(),
                this.turnOffCantBuildMode(),
                this.turnOffNotEnoughMoneyTip();
            return;
        }
        var r = this.game.getMeta().componentsById[t], i = this.factory.isPossibleToBuildOnTypeWithSize(n.x, n.y, r.width, r.height, r), s = this.factory.getAreasManager().canBuildAt(n.x, n.y, r.width, r.height), o = !this.factory.isOnMap(n.x, n.y, r.width, r.height), u = this.factory.getTile(n.x, n.y), a = new BuyComponentAction(u, r);
        o ? this.turnOffBuildMode() : this.updateBuildMode(t, n),
            i && s || o ? a.canBuy() ? (this.turnOffCantBuildMode(), this.turnOffNotEnoughMoneyTip()) : (this.updateCantBuildMode(t, n), this.updateNotEnoughMoneyTip()) : this.updateCantBuildMode(t, n);
    }
    updateComponentSelected(e) {
        if (!e) {
            this.turnOffComponentSelected();
            return;
        }
        var t = e.getMeta();
        if (!this.componentSelectedElement) {
            var n = "blueSelection";
            this.componentSelectedElement = $(this.imageMap.getImage(n)),
                this.container.append(this.componentSelectedElement);
        }
        this.componentSelectedElement.css("position", "absolute").css("opacity", .5).css("pointer-events", "none").css("left", e.getX() * this.tileSize).css("top", e.getY() * this.tileSize).css("width", this.tileSize * t.width).css("height", this.tileSize * t.height);
    }
    turnOffComponentSelected() {
        this.componentSelectedElement && (this.componentSelectedElement.remove(), this.componentSelectedElement = null);
    }
    updateBuildMode(e, t) {
        var n = this.game.getMeta().componentsById[e];
        if (!this.mouseSelectionElement) {
            var r = "yellowSelection";
            this.mouseSelectionElement = $(this.imageMap.getImage(r)),
                this.container.append(this.mouseSelectionElement);
        }
        this.mouseSelectionElement.css("position", "absolute").css("opacity", .5).css("pointer-events", "none").css("left", t.x * this.tileSize).css("top", t.y * this.tileSize).css("width", this.tileSize * n.width).css("height", this.tileSize * n.height);
    }
    turnOffBuildMode() {
        this.mouseSelectionElement && (this.mouseSelectionElement.remove(), this.mouseSelectionElement = null);
    }
    updateCantBuildMode(e, t) {
        var n = this.game.getMeta().componentsById[e];
        this.cantPlaceElement || (this.cantPlaceElement = $(this.imageMap.getImage("cantPlace")), this.container.append(this.cantPlaceElement)),
            this.cantPlaceElement.css("position", "absolute").css("opacity", .5).css("pointer-events", "none").css("left", t.x * this.tileSize).css("top", t.y * this.tileSize).css("width", this.tileSize * n.width).css("height", this.tileSize * n.height);
    }
    turnOffCantBuildMode() {
        this.cantPlaceElement && (this.cantPlaceElement.remove(), this.cantPlaceElement = null);
    }
    updateNotEnoughMoneyTip() {
        this.lastTip || (this.lastTip = (new TipUi(this.container, '<span class="red">你没有足够的金钱!</span>')).init(), $("body").css("cursor", "no-drop"));
    }
    turnOffNotEnoughMoneyTip() {
        this.lastTip && (this.lastTip.destroy(), this.lastTip = null, $("body").css("cursor", ""));
    }
}
class MouseLayer {
    constructor(e, t, n) {
        this.imageMap = e,
            this.factory = t,
            this.game = t.getGame(),
            this.tileSize = n.tileSize,
            this.tilesX = t.getMeta().tilesX,
            this.tilesY = t.getMeta().tilesY,
            this.selectedComponentMetaId = null,
            this.selectedMapToolId = null,
            this.clickedComponent = null,
            this.mouseInfoHelper = new MouseInfoHelper(this.factory, e, n.tileSize);
    }
    display(e) {
        this.selectedComponentMetaId = null
        this.container = e
        this.element = $("<div />").css("position", "absolute").css("width", this.tilesX * this.tileSize).css("height", this.tilesY * this.tileSize)
        this.container.append(this.element)
        this._setupNativeMouseEvents()
        this._setupMouseListeners()
        this.mouseInfoHelper.display(e)

        //插件
        this.setupKeyboardListener()
        this.setupKeyboardShortcutsListener();
    }
    _setupMouseListeners() {
        var e = null, t = null, n = null;
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.FACTORY_MOUSE_MOVE, (n) => {
            if (e && e.altKeyDown)
                this.updateTileMeta(e),
                    this.updateTileMeta(n);
            else if (this.selectedComponentMetaId) {
                this.mouseInfoHelper.updateMouseInformationModes(this.selectedComponentMetaId, n);
                var r = this.game.getMeta().componentsById[this.selectedComponentMetaId];
                if (e)
                    if (n.leftMouseDown && !e.shiftKeyDown && r.buildByDragging == 1)
                        this.buyComponent(e),
                            this.buyComponent(n),
                            this.connectComponents(t, n);
                    else if (n.leftMouseDown && e.shiftKeyDown || n.rightMouseDown)
                        this.sellComponent(e),
                            this.sellComponent(n);
            } else
                e && (n.leftMouseDown && e.shiftKeyDown || n.rightMouseDown) && (this.sellComponent(e), this.sellComponent(n));
            t = n;
        })
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.FACTORY_MOUSE_OUT, () => {
            this.mouseInfoHelper.turnOffBuildMode()
            this.mouseInfoHelper.turnOffCantBuildMode()
            e = null
            t = null
        })
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.FACTORY_MOUSE_DOWN, (t) => {
            e = t;
        })
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.FACTORY_MOUSE_UP, (t) => {
            if (e && e.x == t.x && e.y == t.y) {
                var r = this.factory.getTile(t.x, t.y).getComponent();
                e.altKeyDown ? this.updateTileMeta(t) : this.selectedComponentMetaId ? e.leftMouseDown && !e.shiftKeyDown ? this.buyComponent(e) : (e.leftMouseDown && e.shiftKeyDown || e.rightMouseDown) && this.sellComponent(e) : !this.selectedComponentMetaId && (e.leftMouseDown && e.shiftKeyDown || e.rightMouseDown) ? this.sellComponent(e) : r && (n == r && (r = null), this.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_SELECTED, r), n = r);
            }
            e = null;
        })
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.COMPONENT_META_SELECTED, (e) => {
            this.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_SELECTED, null)
            this.selectedComponentMetaId = e
            this.mouseInfoHelper.updateMouseInformationModes(e, t)
            n = null;
        })
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.MAP_TOOL_SELECTED, (e) => {
            this.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_SELECTED, null)
            this.selectedMapToolId = e
            n = null
        })
        this.factory.getEventManager().addListener("LayerMouse", FactoryEvent.COMPONENT_SELECTED, (e) => {
            this.mouseInfoHelper.updateComponentSelected(e);
        });
    }
    updateTileMeta(e) {
        var t = new UpdateTileAction(this.factory.getTile(e.x, e.y), this.selectedMapToolId);
        t.canUpdate() && t.update();
    }
    buyComponent(t) {
        var n = new BuyComponentAction(this.factory.getTile(t.x, t.y), this.game.getMeta().componentsById[this.selectedComponentMetaId]);
        n.canBuy() && n.buy();
    }
    sellComponent(e) {
        var n = this.game.getMeta().componentsById[this.selectedComponentMetaId], r = new SellComponentAction(this.factory.getTile(e.x, e.y), n ? n.width : 1, n ? n.height : 1);
        r.canSell() && r.sell();
    }
    connectComponents(e, t) {
        var r = new UpdateComponentInputOutputAction(this.factory.getTile(e.x, e.y), this.factory.getTile(t.x, t.y));
        r.canUpdate() && r.update();
    }
    // _setupNativeMouseEvents() {
    //     var e = null, t = this;
    //     this.element.get(0).addEventListener("mouseout",
    //         function () {
    //             t.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_MOUSE_OUT, e),
    //                 e = null;
    //         }, false),
    //         this.element.get(0).addEventListener("mousemove",
    //             function (n) {
    //                 var r = {
    //                     width: 1,
    //                     height: 1
    //                 };
    //                 t.selectedComponentMetaId && (r = t.game.getMeta().componentsById[t.selectedComponentMetaId]);
    //                 var i = t.element.get(0).getBoundingClientRect(), s = n.clientX - i.left - t.tileSize * r.width / 2, o = n.clientY - i.top - t.tileSize * r.height / 2, u = {
    //                     x: Math.round(s / t.tileSize),
    //                     y: Math.round(o / t.tileSize),
    //                     leftMouseDown: n.which == 1,
    //                     rightMouseDown: n.which == 3,
    //                     shiftKeyDown: n.shiftKey,
    //                     altKeyDown: n.altKey
    //                 };
    //                 u.x = Math.min(t.tilesX - r.width, Math.max(0, u.x)),
    //                     u.y = Math.min(t.tilesY - r.height, Math.max(0, u.y));
    //                 if (!e || e.x != u.x || e.y != u.y)
    //                     t.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_MOUSE_MOVE, u),
    //                         e = u;
    //             }, false),
    //         this.element.get(0).addEventListener("mousedown",
    //             function (n) {
    //                 t.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_MOUSE_DOWN, {
    //                     x: e.x,
    //                     y: e.y,
    //                     leftMouseDown: n.which == 1,
    //                     rightMouseDown: n.which == 3,
    //                     shiftKeyDown: n.shiftKey,
    //                     altKeyDown: n.altKey
    //                 });
    //             }, false),
    //         this.element.get(0).addEventListener("mouseup",
    //             function () {
    //                 t.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_MOUSE_UP, e);
    //             }, false);
    // }
    destroy() {
        this.mouseInfoHelper.destroy()
        this.factory.getEventManager().removeListenerForType("LayerMouse")
        this.container.html("")
        this.container = null;
        //插件
        document.body.removeEventListener("keydown", this._handleKeyboard);
        window.removeEventListener("resize", this._handleResize);
        document.body.removeEventListener("keyup", this._handleKeyboardShortcuts)
    }
    //插件
    _setupNativeMouseEvents() {
        const container = this.container.parent().parent().get(0);
        const map = this.container.get(0);
        const element = this.element.get(0);
        const em = this.factory.getEventManager();

        let scale = 1;
        let level = 15;
        let lastEvent;

        element.addEventListener('mouseout', event => {
            em.invokeEvent(FACTORY_MOUSE_OUT, event);
            lastEvent = null;
        }, false);

        element.addEventListener('mousemove', event => {
            let size = {
                width: 1,
                height: 1,
            };

            if (this.selectedComponentMetaId) {
                size = this.game.getMeta().componentsById[this.selectedComponentMetaId];
            }

            const rect = element.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / scale) - this.tileSize * size.width / 2;
            const y = ((event.clientY - rect.top) / scale) - this.tileSize * size.height / 2;
            const newEvent = {
                x: clamp(Math.round(x / this.tileSize), 0, this.tilesX - size.width),
                y: clamp(Math.round(y / this.tileSize), 0, this.tilesY - size.height),
                leftMouseDown: event.buttons & 1,
                rightMouseDown: event.buttons & 2,
                shiftKeyDown: event.shiftKey,
                altKeyDown: event.altKey,
            };
            if (!lastEvent || lastEvent.x != newEvent.x || lastEvent.y != newEvent.y) {
                em.invokeEvent(FACTORY_MOUSE_MOVE, newEvent);
                lastEvent = newEvent;
            }
        }, false);

        element.addEventListener('mousedown', event => {
            em.invokeEvent(FACTORY_MOUSE_DOWN, {
                x: lastEvent.x,
                y: lastEvent.y,
                leftMouseDown: event.buttons & 1,
                rightMouseDown: event.buttons & 2,
                shiftKeyDown: event.shiftKey,
                altKeyDown: event.altKey,
            });
        }, false);

        element.addEventListener('mouseup', _event => {
            em.invokeEvent(FACTORY_MOUSE_UP, lastEvent);
        }, false);

        const zoom = event => {
            let delta;
            if (event.detail) delta = (event.detail > 0) - (event.detail < 0);
            else delta = (event.wheelDelta < 0) - (event.wheelDelta > 0);

            level = clamp(level + delta, 0, ZOOM_STEPS - 1);
            scale = zoomAt(level).toFixed(2);
            if (level == 15) scale = 1; // ugh, hack

            const before = map.getBoundingClientRect();

            const x = event.clientX - before.left;
            const y = event.clientY - before.top;

            const px = x / before.width;
            const py = y / before.height;

            map.style.transform = `scale(${scale})`;

            this.container.toggleClass('magnified', scale >= 1);

            const after = map.getBoundingClientRect();

            const width = before.width - after.width;
            const height = before.height - after.height;

            const dx = width * px;
            const dy = height * py;

            const containerRect = container.getBoundingClientRect();
            const coords = constrainTo({
                top: containerRect.height / 2,
                left: containerRect.width / 2,
            }, {
                top: after.top - containerRect.top + dy,
                left: after.left - containerRect.left + dx,
                width: after.width,
                height: after.height,
            });

            map.style.top = `${coords.top}px`;
            map.style.left = `${coords.left}px`;

            event.preventDefault();
        };

        container.addEventListener("mousewheel", zoom, false);
        container.addEventListener("DOMMouseScroll", zoom, false);
        container.addEventListener("mousedown", event => {
            if (!(event.buttons & 4)) return;
            event.preventDefault();
            level = 14;
            zoom(event);
        }, false);
    }
    setupKeyboardListener() {
        let moveTimer;
        let resizeTimer;
        const delay = 5;
        const speed = 5;
        const moving = [];
        const movements = {
            UP: { top: 1, left: 0 },
            LEFT: { top: 0, left: 1 },
            DOWN: { top: -1, left: 0 },
            RIGHT: { top: 0, left: -1 },
        };
        const directions = {
            87: "UP",
            65: "LEFT",
            83: "DOWN",
            68: "RIGHT",
            38: "UP",
            37: "LEFT",
            40: "DOWN",
            39: "RIGHT",
        };

        const applyMovement = () => {
            const add = (a, b) => { return { top: a.top + b.top, left: a.left + b.left }; };
            let movement = { top: 0, left: 0 };
            moving.map((direction) => movement = add(movement, movements[direction]));

            const container = this.container.parent().get(0);
            const map = this.container.get(0);

            const containerRect = container.getBoundingClientRect();
            const mapRect = map.getBoundingClientRect();

            const dy = movement.top * speed;
            const dx = movement.left * speed;

            const coords = constrainTo({
                top: containerRect.height / 2,
                left: containerRect.width / 2,
            }, {
                top: mapRect.top - containerRect.top + dy,
                left: mapRect.left - containerRect.left + dx,
                width: mapRect.width,
                height: mapRect.height,
            });

            map.style.top = coords.top + 'px';
            map.style.left = coords.left + 'px';
        };

        this._handleKeyboard = (event) => {
            if (!(event.keyCode in directions)) return;
            const direction = directions[event.keyCode];
            if (moving.indexOf(direction) != -1) return;
            moving.push(direction);
            event.preventDefault();
            if (moveTimer === undefined) moveTimer = setInterval(applyMovement, delay);

            const stopMovement = (event) => {
                if (!(event.keyCode in directions)) return;
                if (directions[event.keyCode] != direction) return;
                const index = moving.indexOf(direction);
                if (index == -1) return;

                moving.splice(index, 1);
                if (moving.length === 0) moveTimer = clearInterval(moveTimer);
            };

            document.body.addEventListener("keyup", stopMovement);
        };

        this._handleResize = () => {
            if (resizeTimer !== undefined) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => applyMovement(), 100);
        };

        document.body.addEventListener("keydown", this._handleKeyboard);
        window.addEventListener("resize", this._handleResize);
    }
    setupKeyboardShortcutsListener() {
        this._handleKeyboardShortcuts = (event) => {
            if (event.keyCode in shortcuts) shortcuts[event.keyCode].performAction();
        };

        document.body.addEventListener("keyup", this._handleKeyboardShortcuts);
    }
}
class BuyAreaAction {
    constructor(e, t) {
        this.factory = e
        this.areaId = t
        this.areaMeta = e.getMeta().areasById[t];
    }
    canBuy() {
        return this.areaMeta.price > this.factory.getGame().getMoney() ? false : true;
    }
    buy() {
        this.factory.getGame().addMoney(-this.areaMeta.price)
        this.factory.getAreasManager().setAreaBought(this.areaId, true);
    }
}
var ConfirmUi_t = 0;
class ConfirmUi {
    constructor(e, n) {
        this.title = e
        this.message = n
        this.okTitle = "好"
        this.cancelTitle = "取消"
        this.id = "confirm" + ConfirmUi_t++
        this.idBg = this.id + "Bg"
    }
    setOkTitle(e) {
        this.okTitle = e
        return this;
    }
    setCancelTitle(e) {
        this.cancelTitle = e
        return this;
    }
    setOkCallback(e) {
        this.okCallback = e
        return this;
    }
    setCancelCallback(e) {
        this.cancelCallback = e
        return this;
    }
    display() {
        this.container = $("body")
        this.container.append(Handlebars.compile(template.confirm)({
            id: this.id,
            idBg: this.idBg,
            title: this.title,
            message: this.message,
            okTitle: this.okTitle,
            cancelTitle: this.cancelTitle
        }))
        this.element = this.container.find("#" + this.id)
        this.bg = this.container.find("#" + this.idBg)
        this.element.find(".okButton").click(() => {
            this.hide()
            this.okCallback && this.okCallback();
        })
        this.element.find(".cancelButton").click(() => {
            this.hide()
            this.cancelCallback && this.cancelCallback();
        })
        this.element.css("top", Math.round(($(window).height() - this.element.height()) / 2))
        this.element.css("left", Math.round(($(window).width() - this.element.width()) / 2))
        this.bg.hide().fadeIn(200)
        this.element.hide().fadeIn(200)
        return this;
    }
    hide() {
        this.element && this.element.fadeOut(200, () => {
            this.element.remove();
        })
        this.bg && this.bg.fadeOut(200, () => {
            this.bg.remove();
        });
    }
}
class AreasLayer {
    constructor(e, t, n) {
        this.imageMap = e,
            this.factory = t,
            this.game = t.getGame(),
            this.tileSize = n.tileSize,
            this.tilesX = t.getMeta().tilesX,
            this.tilesY = t.getMeta().tilesY;
    }
    display(e) {
        this.container = e
        this.container.append('<div id="areasLayer" style="position:absolute"></div>')
        this.factory.getEventManager().addListener("AreasLayer", FactoryEvent.FACTORY_COMPONENTS_CHANGED, () => {
            this.redraw();
        })
        this.area = this.container.find("#areasLayer")
        this.redraw();
    }
    redraw() {
        this.area.html("");
        var i = this;
        this.factory.getMeta().areas.map(function (e) {
            if (i.factory.getAreasManager().getIsAreaBought(e.id)) return;
            for (var t in e.locations) {
                var n = e.locations[t],
                    r = $('<div class="mapBuyArea" data-id="' + e.id + '"></div>').
                        css("left", i.tileSize * n.x).
                        css("top", i.tileSize * n.y).
                        css("width", i.tileSize * n.width).
                        css("height", i.tileSize * n.height),
                    s = "";
                t == 0 && (s = $('<div class="mapBuyAreaTitle money">' + e.name + "<br />购买需要<br /><b>" + "$" + nf(e.price) + "</b></div>").css("left", i.tileSize * n.x).css("top", i.tileSize * n.y).css("width", i.tileSize * n.width).css("marginTop", i.tileSize * n.height / 2 - 23))
                i.area.append(r).append(s);
            }
        });
        var s = null, o = false;
        this.factory.getEventManager().addListener("AreasLayer", FactoryEvent.FACTORY_SCROLL_START, () => {
            o = true;
        })
        this.factory.getEventManager().addListener("AreasLayer", FactoryEvent.FACTORY_SCROLL_END, () => {
            setTimeout(() => {
                o = false;
            }, 100);
        })
        i.area.find(".mapBuyArea").mouseover(function (e) {
            var t = $(this).attr("data-id");
            s != t && (i.area.find(".mapBuyArea").removeClass("mapBuyAreaOver"), i.area.find(".mapBuyArea[data-id='" + t + "']").addClass("mapBuyAreaOver"))
            s = t;
        })
        i.area.find(".mapBuyArea").mouseout(function (e) {
            var t = $(this).attr("data-id");
            i.area.find(".mapBuyArea").removeClass("mapBuyAreaOver")
            s = null;
        })
        i.area.find(".mapBuyArea").click(function (r) {
            if (o) return;
            var s = $(this).attr("data-id"),
                u = i.factory.getMeta().areasById[s],
                a = new BuyAreaAction(i.factory, s);
            if (a.canBuy()) {
                (new ConfirmUi("", '<center>你确定要买这个地方吗,花费<br /><b class="money" style="font-size:1.1em">$' + nf(u.price) + "</b></center>")).setOkTitle("是的,购买").setCancelTitle("不").setOkCallback(function () {
                    var t = new BuyAreaAction(i.factory, s);
                    t.canBuy() && (t.buy(), i.redraw());
                }).display()
            } else {
                (new AlertUi("", "<center>你没有足够的钱来购买选定的区域</center>")).display()
            }
        });
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("AreasLayer")
        this.container.html("")
        this.container = null
        this.canvas = null
    }
}
class ScreenShotUi {
    constructor(e, t, n, r, i) {
        this.tileSize = t.tileSize
        this.tilesX = e.getMeta().tilesX
        this.tilesY = e.getMeta().tilesY
        this.backgroundCanvas = n
        this.componentsCanvas = r
        this.packagesCanvas = i
    }
    open() {
        this.canvas = document.createElement("canvas")
        this.canvas.width = this.tilesX * this.tileSize
        this.canvas.height = this.tilesY * this.tileSize
        var e = this.canvas.getContext("2d");
        e.drawImage(this.backgroundCanvas, 0, 0)
        e.drawImage(this.componentsCanvas, 0, 0)
        e.drawImage(this.packagesCanvas, 0, 0)
        var t = window.open("about:blank", "image from canvas");
        t.document.write("<html><body style='text-align:center; background-color:black; color:orangered; font-weight:bold; '><div style='margin: 0 0 8px 0;'>用于分享副本或将图像保存到磁盘.或者只是做一个屏幕截图,如果你的显示器足够大的话 :p</div><img src='" + this.canvas.toDataURL("image/png") + "' alt='from canvas'/>" + "</body>" + "</html>");
    }
}

class MapUi {
    constructor(s, o, u) {
        this.globalUiEm = s
        this.imageMap = o
        this.factory = u
        this.game = u.getGame()
        this.tileSize = 21
        this.backgroundLayer = new BackgroundLayer(this.imageMap, this.factory, {
            tileSize: this.tileSize
        })
        this.componentLayer = new ComponentLayer(this.imageMap, this.factory, {
            tileSize: this.tileSize
        })
        this.packageLayer = new PackageLayer(this.imageMap, this.factory, {
            tileSize: this.tileSize
        })
        this.mouseLayer = new MouseLayer(this.imageMap, this.factory, {
            tileSize: this.tileSize
        })
        this.areasLayer = new AreasLayer(this.imageMap, this.factory, {
            tileSize: this.tileSize
        })
    }
    display(e) {
        this.container = e
        var t = this.container.width(),
            n = this.container.height(),
            r = this.factory.getMeta().tilesX * this.tileSize,
            i = this.factory.getMeta().tilesY * this.tileSize;
        this.overlay = $("<div />").css("overflow", "hidden").css("margin", "0 0 0 0").css("width", Math.min(t, r)).css("height", Math.min(n, i))
        this.element = $("<div />").css("position", "relative").css("width", r + "px").css("height", i + "px")
        this.overlay.html(this.element)
        this.container.html(this.overlay)
        this.setupMapDragging()
        this.backgroundLayer.display(this.element)
        this.componentLayer.display(this.element)
        this.packageLayer.display(this.element)
        this.mouseLayer.display(this.element)
        this.areasLayer.display(this.element)
        this.globalUiEm.addListener("FactoryMapUi", FactoryEvent.OPEN_SCREENSHOT_VIEW, () => {
            (new ScreenShotUi(this.factory, {
                tileSize: this.tileSize
            },
                this.backgroundLayer.getCanvas(), this.componentLayer.getCanvas(), this.packageLayer.getCanvas())).open();
        });

        //插件-效率-s
        if (this.efficiencyLayer === undefined) {
            this.efficiencyLayer = new EfficiencyLayer(this.imageMap, this.factory, {
                tileSize: this.tileSize,
            });
        }
        this.efficiencyLayer.display(this.element);
        //插件-效率-e
    }
    // setupMapDragging() {
    //     var e = this, t = true;
    //     this.factory.getEventManager().addListener("FactoryMapUi", FactoryEvent.COMPONENT_META_SELECTED,
    //         function (e) {
    //             var n = this.game.getMeta().componentsById[e];
    //             t = !n || !n.buildByDragging;
    //         }.bind(this)),
    //         this.element.get(0).addEventListener("mousedown",
    //             function (r) {
    //                 if (r.which != 1 || r.shiftKey || r.altKey || !t)
    //                     return;
    //                 var i = r.pageX, s = r.pageY, o = e.element.offset(), u = e.overlay.offset(), a = function (t) {
    //                     var r = o.left + t.pageX - i, u = o.top + t.pageY - s;
    //                     e.element.offset(n(r, u)),
    //                         e.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_SCROLL_START);
    //                 }, f = function (t) {
    //                     $("body").off("mousemove", a).off("mouseleave", f).off("mouseup", f),
    //                         e.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_SCROLL_END);
    //                 };
    //                 $("body").on("mouseup", f).on("mouseleave", f).on("mousemove", a);
    //             });
    //     var n = function (t, n) {
    //         var i = r.left, s = r.left - e.element.width() + e.overlay.width();
    //         i < s ? t = i : t < s ? t = s : t > i && (t = i);
    //         var o = r.top, u = r.top - e.element.height() + e.overlay.height();
    //         return o < u ? n = o : n < u ? n = u : n > o && (n = o), {
    //             left: t,
    //             top: n
    //         };
    //     }, r = this.overlay.offset(), i = r.left, s = r.top;
    //     this.overlay.width() < e.element.width() && (i = -this.factory.getMeta().startX * this.tileSize + r.left),
    //         this.overlay.height() < e.element.height() && (s = -this.factory.getMeta().startY * this.tileSize + r.top),
    //         e.element.offset(n(i, s));
    // }
    destroy() {
        this.factory.getEventManager().removeListenerForType("FactoryMapUi")
        this.backgroundLayer.destroy()
        this.componentLayer.destroy()
        this.packageLayer.destroy()
        this.mouseLayer.destroy()
        this.areasLayer.destroy()
        this.container.html("")
        this.container = null
    }
    //插件
    setupMapDragging() {
        const $body = $('body');
        const $element = this.element;

        let componentBlocks = false;

        const componentSelected = componentId => {
            const meta = this.game.getMeta().componentsById[componentId];
            componentBlocks = !!meta && meta.buildByDragging;
        };

        this.factory.getEventManager().addListener('FactoryMapUi', COMPONENT_META_SELECTED, componentSelected);

        const startDragging = event => {
            if (!(event.buttons & 1) || event.shiftKey || event.altKey || componentBlocks) return;

            const offset = $element.position();

            const origin = {
                top: offset.top,
                left: offset.left,
            };

            const point = {
                top: event.pageY,
                left: event.pageX,
            };

            const handleDragging = event => {
                const container = this.container.parent().get(0);
                const containerRect = container.getBoundingClientRect();
                const mapRect = $element.get(0).getBoundingClientRect();
                const coords = constrainTo({
                    top: containerRect.height / 2,
                    left: containerRect.width / 2,
                }, {
                    top: origin.top + (event.pageY - point.top),
                    left: origin.left + (event.pageX - point.left),
                    width: mapRect.width,
                    height: mapRect.height,
                });

                $element.get(0).style.top = coords.top + 'px';
                $element.get(0).style.left = coords.left + 'px';

                this.factory.getEventManager().invokeEvent(FACTORY_SCROLL_START);
            };

            const stopDragging = _event => {
                $body
                    .off('mouseup', stopDragging)
                    .off('mouseleave', stopDragging)
                    .off('mousemove', handleDragging);

                this.factory.getEventManager().invokeEvent(FACTORY_SCROLL_END);
            };

            $body
                .on('mouseup', stopDragging)
                .on('mouseleave', stopDragging)
                .on('mousemove', handleDragging);
        };

        this.element.get(0).addEventListener('mousedown', startDragging);
    }
}
class ComponentsUi {
    constructor(e, t) {
        this.globalUiEm = e,
            this.factory = t,
            this.game = t.getGame(),
            this.lastSelectedComponentId = null,
            this.selectedComponentId = null;
    }
    display(r) {
        var i = this;
        this.container = r;
        var s = [];
        for (var o = 0; o < this.game.getMeta().componentsSelection.length; o++) {
            s[o] = {
                sub: []
            };
            for (var u = 0; u < this.game.getMeta().componentsSelection[o].length; u++) {
                var a = this.game.getMeta().componentsSelection[o][u], f = this.game.getMeta().componentsById[a];
                s[o].sub[u] = {},
                    f && BuyComponentAction.possibleToBuy(this.factory, f) ? s[o].sub[u] = {
                        id: f.id,
                        name: f.name,
                        style: "background-position: -" + f.iconX * 26 + "px -" + f.iconY * 26 + "px"
                    } : a == "noComponent" && (s[o].sub[u] = {
                        name: "No component",
                        style: "background-position: 0px 0px"
                    });
            }
        }
        this.container.html(Handlebars.compile(template.components)({
            components: s
        })),
            this.factory.getEventManager().addListener("componentsUi", FactoryEvent.COMPONENT_META_SELECTED,
                function (e) {
                    i.selectedComponentId != e && (i.lastSelectedComponentId = i.selectedComponentId),
                        i.selectedComponentId = e,
                        i.container.find(".button").removeClass("buttonSelected"),
                        i.container.find(".but" + (e ? e : "")).addClass("buttonSelected");
                }),
            this.container.find(".button").click(function (e) {
                var t = $(e.target).attr("data-id");
                i.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_META_SELECTED, t ? t : null);
            }),
            this.container.find(".button").mouseenter(function (e) {
                var t = $(e.target).attr("data-id");
                i.factory.getEventManager().invokeEvent(FactoryEvent.HOVER_COMPONENT_META, t ? t : null);
            }),
            this.container.find(".button").mouseleave(function (e) {
                var t = $(e.target).attr("data-id");
                i.factory.getEventManager().invokeEvent(FactoryEvent.HOVER_COMPONENT_META, null);
            }),
            this.globalUiEm.addListener("componentsUi", GlobalUiEvent.KEY_PRESS,
                function (e) {
                    var t = e.charCode !== undefined ? e.charCode : e.keyCode;
                    if (t === 0 || t === 32)
                        i.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_META_SELECTED, i.selectedComponentId ? null : i.lastSelectedComponentId),
                            e.preventDefault();
                }),
            this.container.find("#makeScreenShotButton").click(function () {
                i.globalUiEm.invokeEvent(FactoryEvent.OPEN_SCREENSHOT_VIEW);
            }),
            this.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_META_SELECTED, null);
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("componentsUi"),
            this.game.getEventManager().removeListenerForType("componentsUi"),
            this.globalUiEm.removeListenerForType("componentsUi"),
            this.container.html(""),
            this.container = null;
    }
}
class UpdateSorterSortingResource {
    constructor(e, t, n, r) {
        this.component = e,
            this.factory = e.getFactory(),
            this.offsetX = t,
            this.offsetY = n,
            this.resource = r;
    }
    canUpdate() {
        return this.component.getMeta().strategy.type == "sorter";
    }
    update() {
        this.component.getStrategy().setSortingResource(this.offsetX, this.offsetY, this.resource),
            this.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_COMPONENTS_CHANGED, this.tile),
            this.factory.getEventManager().invokeEvent(FactoryEvent.REFRESH_COMPONENT_INFO);
    }
}
class componentUiSorter {
    constructor(e) {
        this.component = e,
            this.strategy = this.component.getStrategy();
    }
    display(n) {
        this.container = n;
        var r = this.component.getFactory().getGame().getMeta().resources, i = [];
        i.push({
            id: null,
            name: "所有其他"
        });
        for (var s = 0; s < r.length; s++)
            i.push({
                id: r[s].id,
                name: r[s].name
            });
        var o = [], u = this.strategy.getSortingIndex();
        for (var s in u)
            o.push({
                id: s,
                name: s,
                resources: i,
                selected: u[s]
            });
        this.container.html(Handlebars.compile(template.sorter)({
            locations: o
        }));
        var a = this;
        this.container.find("select").each(function () {
            var e = $(this).attr("data-id").split(":");
            $(this).val(a.strategy.getSortingResource(e[0], e[1]));
        }).on("change",
            function () {
                var e = $(this).attr("data-id").split(":"), n = $(this).val(), r = new UpdateSorterSortingResource(a.component, e[0], e[1], n);
                r.canUpdate() && r.update();
            });
    }
    destroy() { }
}
var ProductionGraphUi_e = 25,
    ProductionGraphUi_t = 25,
    ProductionGraphUi_n = ProductionGraphUi_t + 8,
    ProductionGraphUi_r = ProductionGraphUi_t + 15;
class ProductionGraphUi {
    constructor(e, t) {
        this.rootNode = e,
            this.imageMap = t,
            this.positions = {},
            this.maxLevel = 0;
    }
    display(e) {
        var r = {
            node: this.rootNode,
            width: 0
        };
        this.positions[this.rootNode.getId()] = r,
            this.calculateWidths(this.rootNode, this.positions),
            r.y = 0,
            r.x = r.width / 2 - ProductionGraphUi_t / 2,
            r.sx = 0,
            this.calculatePositions(this.rootNode, this.positions);
        var i = document.createElement("canvas");
        i.style.position = "absolute",
            i.width = r.width + ProductionGraphUi_t / 2,
            i.height = (this.maxLevel + 1) * ProductionGraphUi_n,
            this.canvas = i,
            this.drawElements(this.rootNode, this.positions),
            e.html(i),
            e.width(i.width);
    }
    calculateWidths(e) {
        var t = e.getChildren();
        for (var n in t) {
            var i = t[n];
            this.positions[i.getId()] = {
                node: i,
                width: 0
            },
                this.calculateWidths(i, this.positions),
                this.positions[e.getId()].width += this.positions[i.getId()].width;
        }
        this.positions[e.getId()].width || (this.positions[e.getId()].width += ProductionGraphUi_r);
    }
    calculatePositions(e) {
        this.maxLevel = Math.max(this.maxLevel, e.getLevel());
        var r = this.positions[e.getId()], i = e.getChildren(), s = r.sx;
        for (var o in i) {
            var u = i[o], a = this.positions[u.getId()];
            a.y = u.getLevel() * ProductionGraphUi_n,
                a.x = s + a.width / 2 - ProductionGraphUi_t / 2,
                a.sx = s,
                s += a.width,
                this.calculatePositions(u, this.positions);
        }
    }
    drawComponentIcon(n, r, i) {
        var s = this.canvas.getContext("2d"), o = n.getComponentMeta();
        s.drawImage(this.imageMap.getImage("componentIcons"), o.iconX * (ProductionGraphUi_e + 1), o.iconY * (ProductionGraphUi_e + 1), ProductionGraphUi_e, ProductionGraphUi_e, r, i, ProductionGraphUi_t, ProductionGraphUi_t);
    }
    drawElements(e) {
        var n = e.getChildren(), r = this.positions[e.getId()];
        for (var i in n) {
            var s = n[i], o = this.positions[s.getId()];
            this.drawLine(r.x + ProductionGraphUi_t / 2, r.y + ProductionGraphUi_t / 2, o.x + ProductionGraphUi_t / 2, o.y),
                this.drawElements(s, this.positions);
        }
        this.drawComponentIcon(e, r.x, r.y),
            this.writeToNode(r.x + ProductionGraphUi_t + 2, r.y + ProductionGraphUi_t / 2 + 4, e.amount);
    }
    drawLine(e, t, n, r) {
        var i = this.canvas.getContext("2d");
        i.beginPath(),
            i.strokeStyle = "rgb(201,201,201)",
            i.lineWidth = 1,
            i.moveTo(e, t),
            i.lineTo(n, r),
            i.stroke();
    }
    writeToNode(e, t, n) {
        var r = this.canvas.getContext("2d");
        r.font = "11px Arial",
            r.textAlign = "left",
            r.fillStyle = "#FFFFFF",
            r.fillText(n, e, t);
    }
}
class productionTree2Node {
    constructor(e, t, n) {
        this.id = Math.random(),
            this.componentMeta = e,
            this.amount = t,
            this.level = n,
            this.parent = null,
            this.children = {};
    }
    getId() {
        return this.id;
    }
    setAmount(e) {
        this.amount = e;
    }
    getAmount() {
        return this.amount;
    }
    getComponentMeta() {
        return this.componentMeta;
    }
    getLevel() {
        return this.level;
    }
    getParent() {
        return this.parent;
    }
    setParent(e) {
        this.parent = e;
    }
    getChildren() {
        return this.children;
    }
    hasChildren() {
        for (var e in this.children)
            return true;
        return false;
    }
    addChild(e, t) {
        this.children[e] = t;
    }
    getRoot() {
        return this.parent ? this.parent.getRoot() : this;
    }
    multiplyAmount(e) {
        this.amount *= e;
        for (var t in this.children)
            this.children[t].multiplyAmount(e);
    }
    toGraph(e, t) {
        var n = {
            id: this.id,
            label: this.componentMeta.name + "(" + this.amount + ")",
            shape: "box",
            level: this.level
        };
        e.push(n);
        if (this.parent) {
            var r = {
                from: this.parent.getId(),
                to: this.id
            };
            t.push(r);
        }
        for (var i in this.children)
            this.children[i].toGraph(e, t);
    }
    findLeastCommonMultiplier(e, t) {
        if (!e || !t)
            return 0;
        var n = Math.abs(e), r = Math.abs(t);
        while (r) {
            var i = r;
            r = n % r,
                n = i;
        }
        return Math.abs(e * t / n);
    }
}
class ProductionTreeBuilder {
    constructor(e) {
        this.factory = e,
            this.meta = e.getGame().getMeta();
    }
    buildTree(t, n) {
        var r = new productionTree2Node(this.meta.componentsById[t], 1, 0);
        return this._buildTree(r, n),
            r;
    }
    _buildTree(t, n) {
        if (n <= 0)
            return;
        for (var r in this.meta.productionTree[t.getComponentMeta().id]) {
            var i = this.meta.productionTree[t.getComponentMeta().id][r], s = new productionTree2Node(this.meta.componentsById[i], 1, t.getLevel() + 1);
            this._balanceNode(t, s, r),
                s.setParent(t),
                t.addChild(r, s),
                this._buildTree(s, n - 1);
        }
    }
    _balanceNode(e, t, n) {
        var r = this.getConsumption(this.meta.componentsById[e.getComponentMeta().id], n), i = this.getProduction(this.meta.componentsById[t.getComponentMeta().id], n), s = this.findLeastCommonMultiple(r * e.getAmount(), i), o = Math.round(s / r), u = Math.round(s / i);
        if (o > e.getAmount()) {
            var a = o / e.getAmount();
            e.getRoot().multiplyAmount(a);
        }
        t.setAmount(u);
    }
    findLeastCommonMultiple(e, t) {
        if (!e || !t)
            return 0;
        var n = Math.abs(e), r = Math.abs(t);
        while (r) {
            var i = r;
            r = n % r,
                n = i;
        }
        return Math.abs(e * t / n);
    }
    getProduction(e, n) {
        var r = 0, i = ComponentStrategyFactory.getStrategyClass(e.strategy.type);
        return e.strategy.type == "buyer" ? r = i.getMetaBuyAmount(e, n, this.factory) : e.strategy.type == "converter" && (r = i.getMetaProduceAmount(e, n, this.factory)),
            r / e.strategy.interval * 10;
    }
    getConsumption(e, n) {
        var r = 0, i = ComponentStrategyFactory.getStrategyClass(e.strategy.type);
        return e.strategy.type == "converter" ? r = i.getMetaUseAmount(e, n, this.factory) : e.strategy.type == "seller" && (r = i.getMetaSellAmount(e, n, this.factory)),
            r / e.strategy.interval * 10;
    }
}
class PassTimeAction {
    constructor(e, t) {
        this.game = e,
            this.seconds = t,
            this.ticks = this.seconds * this.game.getTicker().getNormalTicksPerSec(),
            this.profit = this.game.getStatistics().getAvgProfit() * this.ticks,
            this.researchPoints = this.game.getStatistics().getAvgResearchPointsProduction() * this.ticks;
    }
    getTicks() {
        return this.ticks;
    }
    getProfit() {
        return this.profit;
    }
    getResearchPoints() {
        return this.researchPoints;
    }
    canPassTime() {
        return this.game.getTicker().getTimeTravelTickets() > 0;
    }
    passTime() {
        this.game.addMoney(this.profit),
            this.game.addResearchPoints(this.researchPoints),
            this.game.getTicker().addNoOfTicks(this.ticks),
            this.game.getTicker().getTimeTravelTickets() > 0 && this.game.getTicker().addTimeTravelTickets(-1);
    }
}
class InfoUi {
    constructor(e, t, n, i) {
        this.factory = e,
            this.game = e.getGame(),
            this.statistics = t,
            this.play = n,
            this.imageMap = i,
            this.selectedPosition = null,
            this.hoveredComponentMetaId = null,
            this.selectedComponentMetaId = null,
            this.selectedComponent = null,
            this.componentStrategies = {
                sorter: componentUiSorter
            },
            this.displayedStrategy = null,
            this.displayedStrategyComponent = null;
    }
    display(container) {
        this.container = container
        this.container.html(Handlebars.compile(template.info)({}))
        this.infoContainer = this.container.find(".componentInfo")
        this.controlsContainer = this.container.find(".componentControls")
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.FACTORY_MOUSE_MOVE, (e) => {
            this.selectedPosition = e
            this.checkWhatShouldBeDisplayed(false)
        })
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.FACTORY_MOUSE_OUT, (e) => {
            this.selectedPosition = null
            this.checkWhatShouldBeDisplayed(false)
        })
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.FACTORY_TICK, () => {
            this.checkWhatShouldBeDisplayed(true)
        })
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.REFRESH_COMPONENT_INFO, (e) => {
            this.checkWhatShouldBeDisplayed(false)
        })
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.HOVER_COMPONENT_META, (e) => {
            this.hoveredComponentMetaId = e
            this.checkWhatShouldBeDisplayed(false)
        })
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.COMPONENT_META_SELECTED, (e) => {
            this.selectedComponentMetaId = e
            this.selectedComponent = null
            this.checkWhatShouldBeDisplayed(false)
        })
        this.factory.getEventManager().addListener("componentInfoUi", FactoryEvent.COMPONENT_SELECTED, (e) => {
            this.selectedComponent = e
            this.checkWhatShouldBeDisplayed(false)
        });
    }
    checkWhatShouldBeDisplayed(e) {
        this.hoveredComponentMetaId ? e || (this.showComponentMetaInfo(this.hoveredComponentMetaId), this.hideComponentStrategy()) : this.selectedComponent ? (this.showComponentInfo(this.selectedComponent), this.showComponentStrategy(this.selectedComponent)) : this.selectedComponentMetaId ? e || (this.showComponentMetaInfo(this.selectedComponentMetaId), this.hideComponentStrategy()) : this.selectedPosition ? (this.showLocationInfo(this.selectedPosition.x, this.selectedPosition.y), this.hideComponentStrategy()) : this.showDefaultInfo();
    }
    showComponentInfo(e) {
        this.showLocationInfo(e.getX(), e.getY());
    }
    showLocationInfo(e, n) {
        var r = this.factory.getTile(e, n), i = {
            isLocation: true
        };
        i.tile = {
            x: r.getX(),
            y: r.getY(),
            terrain: r.getTerrain(),
            buildableType: r.getBuildableType()
        },
            r.getComponent() ? i.component = r.getComponent().getDescriptionData() : i.component = {},
            this.infoContainer.html(Handlebars.compile(template.infoDetails)(i));
    }
    showComponentStrategy(e) {
        if (this.displayedStrategyComponent == e)
            return;
        var t = this.componentStrategies[e.getMeta().strategy.type];
        t ? (this.displayedStrategyComponent = e, this.displayedStrategy = new t(e), this.displayedStrategy.display(this.controlsContainer), this.controlsContainer.show()) : this.hideComponentStrategy();
    }
    hideComponentStrategy() {
        this.displayedStrategy && (this.displayedStrategy.destroy(), this.displayedStrategy = null, this.displayedStrategyComponent = null),
            this.controlsContainer.html("").hide();
    }
    showComponentMetaInfo(e) {
        var r = this.game.getMeta().componentsById[e], o = {
            isMeta: true,
            component: Component.getMetaDescriptionData(r, this.factory)
        };
        this.infoContainer.html(Handlebars.compile(template.infoDetails)(o));
        var u = (new ProductionTreeBuilder(this.factory)).buildTree(e, 1);
        if (u.hasChildren()) {
            var a = new ProductionGraphUi(u, this.imageMap),
                f = this.infoContainer.find(".componentGraph");
            a.display(f);
            var l = this.infoContainer.find(".componentInfoArea"),
                c = l.width();
            l.width(c - f.width());
        }
    }
    hideInfo() {
        this.hideComponentStrategy(),
            this.infoContainer.html("");
    }
    showDefaultInfo() {
        if (!this.play.isDevMode()) {
            this.hideInfo();
            return;
        }
        this.showIncomesData();
    }
    showIncomesData() {
        this.hideInfo();
        var e = this.statistics.getFactoryAvgResearchPointsProduction(this.factory.getMeta().id), t = e * this.game.getTicker().getTicksPerSec();
        isNaN(t) && (t = 0);
        var n = this.statistics.getFactoryAvgProfit(this.factory.getMeta().id), r = n * this.game.getTicker().getTicksPerSec();
        isNaN(r) && (r = 0);
        var i = '<table cellspacing="0" cellpadding="0" border="0">';
        i += "<tr>",
            i += '<td align="center" width="100"></td>',
            i += '<td align="center" width="100"><b>15min</b></td>',
            i += '<td align="center" width="100"><b>1h</b></td>',
            i += '<td align="center" width="100"><b>24h</b></td>',
            i += '<td align="center" width="100"><b>1 week</b></td>',
            i += "<tr>",
            i += "<tr>",
            i += '<td align="center" ><b class="research">Research:</b></td>',
            i += '<td align="center" class="research">' + nf(t * 15 * 60) + "</td>",
            i += '<td align="center" class="research">' + nf(t * 60 * 60) + "</td>",
            i += '<td align="center" class="research">' + nf(t * 60 * 60 * 24) + "</td>",
            i += '<td align="center" class="research">' + nf(t * 60 * 60 * 24 * 7) + "</td>",
            i += "<tr>",
            i += "<tr>",
            i += '<td align="center" ><b class="money">Money</b></td>',
            i += '<td align="center" class="money">$' + nf(r * 15 * 60) + "</td>",
            i += '<td align="center" class="money">$' + nf(r * 60 * 60) + "</td>",
            i += '<td align="center" class="money">$' + nf(r * 60 * 60 * 24) + "</td>",
            i += '<td align="center" class="money">$' + nf(r * 60 * 60 * 24 * 7) + "</td>",
            i += "<tr>",
            i += "<tr>",
            i += '<td align="center" width="100"></td>',
            i += '<td align="center" width="100"><a href="javascript:void(0)" class="passTime" style="color:white" data-amount="15">通过</a></td>',
            i += '<td align="center" width="100"><a href="javascript:void(0)" class="passTime" style="color:white" data-amount="60">通过</a></td>',
            i += '<td align="center" width="100"><a href="javascript:void(0)" class="passTime" style="color:white" data-amount="1440">通过</a></td>',
            i += '<td align="center" width="100"><a href="javascript:void(0)" class="passTime" style="color:white" data-amount="10080">通过</a></td>',
            i += "<tr>",
            i += "</table>",
            this.infoContainer.html(i);
        var s = this;
        this.infoContainer.find(".passTime").click(function (e) {
            var t = $(e.target).attr("data-amount"),
                n = new PassTimeAction(s.game, t * 60);
            n.passTime();
        });
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("componentInfoUi")
        this.container.html("")
        this.container = null
    }
}
class ClearPackagesAction {
    constructor(e) {
        this.factory = e;
    }
    canClear() {
        return true;
    }
    clear() {
        var e = this.factory.getTiles();
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            n.getComponent() && n.getComponent().getStrategy().clearContents();
        }
        this.factory.getEventManager().invokeEvent(FactoryEvent.FACTORY_COMPONENTS_CHANGED, n);
    }
}
class ResetFactoryAction {
    constructor(e) {
        this.factory = e;
    }
    canReset() {
        return true;
    }
    reset() {
        var t = this.factory.getTiles();
        for (var n = 0; n < t.length; n++) {
            var r = new SellComponentAction(t[n], 1, 1);
            r.canSell() && r.sell();
        }
        this.factory.reset();
    }
}
class ControlsUi {
    constructor(e) {
        this.factory = e,
            this.game = e.getGame();
    }
    updateControlButtons() {
        this.game.getTicker().getBonusTicks() ? (this.bonusTicks.show(), this.game.getTicker().getIsFastActive() ? (this.playFastButton.hide(), this.playNormalButton.show()) : (this.playFastButton.show(), this.playNormalButton.hide())) : (this.bonusTicks.hide(), this.playFastButton.hide(), this.playNormalButton.hide()),
            this.factory.getIsPaused() ? (this.playButton.show(), this.pauseButton.hide()) : (this.playButton.hide(), this.pauseButton.show());
    }
    updateBonusTicksValue() {
        this.bonusTicks.find("span").html(nf(this.game.getTicker().getBonusTicks())),
            this.updateControlButtons();
    }
    display(s) {
        this.container = s
        this.container.html(Handlebars.compile(template.controls)())
        this.game.getEventManager().addListener("factoryControlsUi", GameEvent.TICKS_STARTED, () => {
            this.updateControlButtons();
        })
        this.game.getEventManager().addListener("factoryControlsUi", GameEvent.TICKS_STOPPED, () => {
            this.updateControlButtons();
        })
        this.pauseButton = this.container.find("#stopButton")
        this.playButton = this.container.find("#playButton")
        this.playFastButton = this.container.find("#playFastButton")
        this.playNormalButton = this.container.find("#playNormalButton")
        this.bonusTicks = this.container.find("#bonusTicks")
        this.clearPackagesButton = this.container.find("#clearPackages")
        this.resetFactoryButton = this.container.find("#resetFactory")
        this.updateControlButtons()
        this.updateBonusTicksValue()
        this.pauseButton.click(() => {
            this.game.getTicker().stopFast()
            this.factory.setIsPaused(true)
            this.updateControlButtons()
        })
        this.playButton.click(() => {
            this.game.getTicker().stopFast()
            this.factory.setIsPaused(false)
            this.updateControlButtons()
        })
        this.playFastButton.click(() => {
            this.game.getTicker().startFast()
            this.factory.setIsPaused(false)
            this.updateControlButtons()
        })
        this.playNormalButton.click(() => {
            this.game.getTicker().stopFast()
            this.factory.setIsPaused(false)
            this.updateControlButtons()
        })
        this.clearPackagesButton.click(() => {
            var e = new ClearPackagesAction(this.factory);
            e.canClear() && e.clear();
        })
        this.resetFactoryButton.click(() => {
            (new ConfirmUi("你确定吗?", "这将移除你地图上所有的组件")).setOkCallback(() => {
                var e = new ResetFactoryAction(this.factory);
                e.canReset() && e.reset();
            }).display();
        })
        this.game.getEventManager().addListener("factoryControlsUi", GameEvent.BONUS_TICKS_UPDATED, () => {
            this.updateBonusTicksValue();
        });
        //插件
        const $factoryButton = $('<a id="clearFactory" class="button clearFactoryButton" href="javascript:void(0);">清除工厂</a>');
        $('#clearPackages', this.container).after($factoryButton);

        const sellComponents = () => {
            this.factory.getTiles()
                .filter(tile => tile.isMainComponentContainer())
                .map(tile => {
                    const meta = tile.getComponent().meta;
                    return new SellComponentAction(tile, meta.width, meta.height);
                })
                .map(action => {
                    if (action.canSell()) action.sell();
                });
        };

        $factoryButton.click((_event) => {
            const confirm = new ConfirmUi("Clear slot", "你确定要清理这家工厂吗？");
            confirm
                .setOkTitle("取消")
                .setCancelTitle("是，清除工厂")
                .setCancelCallback(sellComponents)
                .display();
        });
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("factoryControlsUi"),
            this.container.html(""),
            this.container = null;
    }
}
class MapToolsUi {
    constructor(e) {
        this.factory = e,
            this.game = e.getGame(),
            this.selectedToolId = null;
    }
    display(n) {
        var r = this;
        this.container = n;
        var i = [];
        i.push({
            id: "buildable-road",
            name: "部分可建造区域",
            showBreak: false
        });
        var s = null;
        for (var o in this.factory.getMeta().terrains) {
            var u = this.factory.getMeta().terrains[o];
            i.push({
                id: "terrain-" + u,
                name: u,
                showBreak: false
            }),
                s = u;
        }
        this.container.html(Handlebars.compile(template.mapTools)({
            tools: i
        })),
            r.updateMapData(),
            this.factory.getEventManager().addListener("factoryMapToolsUi", FactoryEvent.FACTORY_MOUSE_MOVE,
                function (e) {
                    r.container.find(".location").html(e.x + ":" + e.y);
                }),
            this.factory.getEventManager().addListener("factoryMapToolsUi", FactoryEvent.TILE_TYPE_CHANGED,
                function (e) {
                    r.updateMapData();
                }),
            this.factory.getEventManager().addListener("factoryMapToolsUi", FactoryEvent.MAP_TOOL_SELECTED,
                function (e) {
                    r.selectedToolId = e,
                        r.container.find(".button").removeClass("buttonSelected"),
                        r.container.find(".but" + (e ? e : "")).addClass("buttonSelected");
                }),
            this.factory.getEventManager().addListener("factoryMapToolsUi", FactoryEvent.COMPONENT_META_SELECTED,
                function (e) {
                    r.factory.getEventManager().invokeEvent(FactoryEvent.MAP_TOOL_SELECTED, null);
                }),
            this.container.find(".button").click(function (e) {
                var t = $(e.target).attr("data-id");
                r.factory.getEventManager().invokeEvent(FactoryEvent.COMPONENT_META_SELECTED, null),
                    r.factory.getEventManager().invokeEvent(FactoryEvent.MAP_TOOL_SELECTED, t ? t : null);
            });
    }
    updateMapData() {
        var e = this.factory.getTiles(), t = this.factory.getMeta(), n = {};
        for (var r in t.terrains)
            n[t.terrains[r]] = r;
        var i = "terrainMap: '";
        for (var r = 0; r < e.length; r++)
            i += n[e[r].getTerrain()],
                (r + 1) % t.tilesX == 0 && r > 0;
        i += "',\r\n",
            i += "buildMap: '";
        for (var r = 0; r < e.length; r++)
            i += e[r].getBuildableType(),
                (r + 1) % t.tilesX == 0 && r > 0;
        i += "',\r\n",
            this.container.find("#mapData").html(i);
    }
    destroy() {
        this.factory.getEventManager().removeListenerForType("factoryMapToolsUi"),
            this.container && this.container.html(""),
            this.container = null;
    }
}
class OverviewUi {
    constructor(e, t) {
        this.factory = e,
            this.game = e.getGame(),
            this.statistics = t;
    }
    display(n) {
        this.container = n
        this.container.html(Handlebars.compile(template.overview)({
            researchBought: !!this.game.getResearchManager().getResearch("researchCenter")
        }))
        this.game.getEventManager().addListener("factoryOverviewUi", GameEvent.GAME_TICK, () => {
            this.update();
        })
        this.update();
    }
    update() {
        $("#money").html(nf(this.game.getMoney())),
            $("#research").html(nf(this.game.getResearchPoints()));
        var e = this.statistics.getFactoryAvgProfit(this.factory.getMeta().id), t = e * this.game.getTicker().getTicksPerSec();
        $("#income").html(nf(e)),
            $("#incomePerSec").html(nf(t));
        var n = this.statistics.getFactoryAvgResearchPointsProduction(this.factory.getMeta().id);
        $("#researchIncome").html(nf(n)),
            $("#ticks").html(nf(this.game.getTicker().getActualTicksPerSec()));
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("factoryOverviewUi"),
            this.container.html(""),
            this.container = null;
    }
}
class FactoryUi {
    constructor(e, f, l, c, h) {
        this.globalUiEm = e,
            this.gameUiEm = f,
            this.factory = l,
            this.play = c,
            this.imageMap = h,
            this.game = l.getGame(),
            this.statistics = this.game.getStatistics(),
            this.menuUi = new MenuUi(this.globalUiEm, this.gameUiEm, this.factory),
            this.mapUi = new MapUi(this.globalUiEm, this.imageMap, this.factory),
            this.componentsUi = new ComponentsUi(this.globalUiEm, this.factory),
            this.mapToolsUi = new MapToolsUi(this.factory),
            this.infoUi = new InfoUi(this.factory, this.statistics, this.play, h),
            this.controlsUi = new ControlsUi(this.factory),
            this.overviewUi = new OverviewUi(this.factory, this.statistics)
    }
    display(t) {
        this.container = t,
            this.container.html(Handlebars.compile(template.factory)());
        if (this.game.getIsPremium()) {
            $(".main").addClass("fullScreen");
            var n = this.container.find(".mapContainer");
            n.css("width", $(window).width() - 250),
                n.css("height", $(window).height() - 150);
        }
        this.menuUi.display(this.container.find(".menuContainer")),
            this.mapUi.display(this.container.find(".mapContainer")),
            this.componentsUi.display(this.container.find(".componentsContainer")),
            this.infoUi.display(this.container.find(".infoContainer")),
            this.controlsUi.display(this.container.find(".controlsContainer")),
            this.overviewUi.display(this.container.find(".overviewContainer")),
            this.play.isDevMode() && this.mapToolsUi.display(this.container.find(".mapToolsContainer"))
    }
    destroy() {
        this.mapUi.destroy(),
            this.componentsUi.destroy(),
            this.infoUi.destroy(),
            this.controlsUi.destroy(),
            this.overviewUi.destroy(),
            this.mapToolsUi.destroy(),
            this.game.getEventManager().removeListenerForType("FactoryUi"),
            this.container.html(""),
            this.container = null,
            $(".main").removeClass("fullScreen");
    }
}
class BuyResearch {
    constructor(e, t) {
        this.game = e,
            this.researchId = t;
    }
    canBuy() {
        return this.game.getResearchManager().canPurchase(this.researchId);
    }
    buy() {
        this.game.addMoney(-this.game.getResearchManager().getPrice(this.researchId)),
            this.game.addResearchPoints(-this.game.getResearchManager().getPriceResearchPoints(this.researchId)),
            this.game.getResearchManager().addResearch(this.researchId, 1),
            this.game.getEventManager().invokeEvent(GameEvent.RESEARCH_BOUGHT, this.researchId);
    }
}
class ResearchUi {
    constructor(e, t) {
        this.gameUiEm = e,
            this.game = t;
    }
    display(r) {
        var i = this, s = this.game.getResearchManager();
        this.container = r;
        var o = 0, u = 0;
        for (var a in this.game.getMeta().research) {
            var f = this.game.getMeta().research[a];
            o += f.max
            u += s.getResearch(f.id);
        }
        var l = [];
        for (var a = 0; a < this.game.getMeta().research.length; a++) {
            var c = this.game.getMeta().research[a];
            if (!s.isVisible(c.id))
                continue;
            var h = c.max ? i.game.getResearchManager().getResearch(c.id) < c.max : true;
            l.push({
                id: c.id,
                name: c.name,
                description: c.description,
                price: h ? nf(s.getPrice(c.id)) : null,
                priceResearchPoints: h ? nf(s.getPriceResearchPoints(c.id)) : null,
                max: c.max,
                showBoughtAndMax: c.max > 1,
                iconStyle: "background-position: -" + c.iconX * 26 + "px -" + c.iconY * 26 + "px"
            });
        }
        this.container.html(Handlebars.compile(template.research)({
            research: l,
            max: o,
            have: u
        }))
        this.container.find(".backButton").click((e) => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY);
        })
        $(".researchItem").each(function () {
            var e = $(this).attr("data-id");
            $(this).find(".buyButton").click(function () {
                var n = new BuyResearch(i.game, e);
                n.canBuy() && (n.buy(), i.refreshView());
            });
        })
        this.game.getEventManager().addListener("researchUi", GameEvent.GAME_TICK, () => {
            this.update();
        })
        this.update();


        //插件
        $('.researchItem').each(function () {
            const $timeUntil = $('<span />').addClass('te-time-until te-research-time-until');

            $(this).find('.description').append($timeUntil);
        });
    }
    refreshView() {
        var e = this.container;
        this.destroy(),
            this.display(e);
    }
    update() {
        var e = this;
        $("#researchPoints").html(nf(this.game.getResearchPoints())),
            $("#money").html(nf(this.game.getMoney())),
            $(".researchItem").each(function () {
                var t = $(this).attr("data-id"), n = $(this).find(".bought"), r = $(this).find(".buyButton");
                n.html(e.game.getResearchManager().getResearch(t))
                e.game.getResearchManager().couldPurchase(t) ? r.show() : r.hide()
                e.game.getResearchManager().canPurchase(t) ? r.removeClass("cantBuy") : r.addClass("cantBuy")
            });

        //插件
        const {
            game: {
                researchPoints,
                researchManager,
                statistics,
                ticker: { actualTicksPerSec }
            }
        } = this;

        const avgResearch = statistics.getAvgResearchPointsProduction();
        const avgResearchPerSecond = avgResearch * actualTicksPerSec.actual;

        $('.researchItem').each(function () {
            const id = $(this).data('id');
            if (!researchManager.couldPurchase(id)) return; // No time estimates for research that is already bought

            const researchPrice = researchManager.getPriceResearchPoints(id);
            if (researchPrice < researchPoints) return; // return if you can already buy this research

            const researchNeeded = researchPrice - researchPoints;
            const timeUntil = formatTime(researchNeeded / avgResearchPerSecond);
            $(this).find('.te-research-time-until').html(timeUntil);
        });
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("researchUi"),
            this.gameUiEm.removeListenerForType("researchUi"),
            this.container.html(""),
            this.container = null;
    }
}
class BuyUpgrade {
    constructor(e, t) {
        this.factory = e,
            this.game = e.getGame(),
            this.upgradeId = t;
    }
    canBuy() {
        return this.factory.getUpgradesManager().canPurchase(this.upgradeId);
    }
    buy() {
        this.game.addMoney(-this.factory.getUpgradesManager().getPrice(this.upgradeId)),
            this.factory.getUpgradesManager().addUpgrade(this.upgradeId, 1),
            this.factory.getEventManager().invokeEvent(FactoryEvent.UPGRADE_BOUGHT, this.upgradeId);
    }
}
class SellUpgrade {
    constructor(e, t) {
        this.factory = e,
            this.game = e.getGame(),
            this.upgradeId = t;
    }
    canSell() {
        return this.factory.getUpgradesManager().canSell(this.upgradeId);
    }
    sell() {
        this.game.addMoney(this.factory.getUpgradesManager().getSellPrice(this.upgradeId)),
            this.factory.getUpgradesManager().addUpgrade(this.upgradeId, -1);
    }
}
class UpgradesUi {
    constructor(e, t) {
        this.gameUiEm = e,
            this.factory = t,
            this.game = t.getGame();
    }
    display(s) {
        var o = this, u = this.factory.getUpgradesManager();
        this.container = s;
        var a = [];
        for (var f = 0; f < this.game.getMeta().upgradesLayout.length; f++) {
            var l = this.game.getMeta().upgradesLayout[f];
            if (l.type == "break") {
                a.push({
                    isBreak: true
                });
                continue;
            }
            var c = [];
            for (var h = 0; h < l.items.length; h++) {
                if (l.items[h] == "_") {
                    c.length > 0 && c.push({
                        isSeparator: true
                    });
                    continue;
                }
                var p = this.game.getMeta().upgradesById[l.items[h]];
                p || logger.error("Group item with id " + l.items[h] + " not found!");
                if (!u.isVisible(p.id))
                    continue;
                var d = u.getStrategy(p.id);
                p.refund && c.push({
                    id: p.id,
                    action: "sell",
                    isSell: true,
                    canSell: u.canSell(p.id),
                    sellPrice: nf(u.getSellPrice(p.id)),
                    refund: p.refund * 100 + "%",
                    title: d.getTitle(),
                    description: d.getDescription(),
                    iconStyle: "background-position: -" + p.iconX * 26 + "px -" + p.iconY * 26 + "px"
                }),
                    c.push({
                        id: p.id,
                        action: "buy",
                        isBuy: true,
                        isMaxed: !u.couldPurchase(p.id),
                        buyPrice: nf(u.getPrice(p.id)),
                        title: d.getTitle(),
                        description: d.getDescription(),
                        iconStyle: "background-position: -" + p.iconX * 26 + "px -" + p.iconY * 26 + "px"
                    });
            }
            c.reverse(),
                c.length > 0 && a.push({
                    name: l.name,
                    upgrades: c,
                    iconStyle: "background-position: -" + l.iconX * 26 + "px -" + l.iconY * 26 + "px"
                });
        }
        this.container.html(Handlebars.compile(template.upgrades)({
            groups: a
        }))
        this.container.find(".backButton").click((e) => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY);
        })
        $(".upgradeItem").each(function () {
            var e = $(this).attr("data-id"), i = $(this).attr("data-action");
            (new TipUi($(this), $(this).find(".upgradePopup"))).init(),
                $(this).click(function () {
                    var r;
                    i == "sell" ? (r = new SellUpgrade(o.factory, e), r.canSell() && (r.sell(), o.refreshView())) : i == "buy" && (r = new BuyUpgrade(o.factory, e), r.canBuy() && (r.buy(), o.refreshView()));
                });
        })
        this.game.getEventManager().addListener("upgradeUi", GameEvent.GAME_TICK, () => {
            this.update();
        })
        this.update();
        //插件
        $('.upgradeItem').each(function () {
            const $timeUntil = $('<span />').addClass('te-time-until te-upgrades-time-until');

            $(this).find('.upgradePopup').find('.money').append($timeUntil);
        });
    }
    refreshView() {
        var e = this.container;
        this.destroy(),
            this.display(e);
    }
    update() {
        var e = this;
        $("#money").html(nf(this.game.getMoney())),
            $(".upgradeItem").each(function () {
                var t = $(this).attr("data-id"),
                    n = $(this).attr("data-action");
                $(this).find(".upgradeIcon").html(e.factory.getUpgradesManager().getUpgrade(t))
                $(this).find(".upgradePopup .bought").html(e.factory.getUpgradesManager().getUpgrade(t))
                n == "buy" ? e.factory.getUpgradesManager().couldPurchase(t) ? ($(this).removeClass("upgradeItemMaxed"), e.factory.getUpgradesManager().canPurchase(t) ? $(this).removeClass("upgradeItemCantBuy") : $(this).addClass("upgradeItemCantBuy")) :
                    $(this).addClass("upgradeItemMaxed") : e.factory.getUpgradesManager().canSell(t) ? $(this).removeClass("upgradeItemCantSell") : $(this).addClass("upgradeItemCantSell");
            });
        //插件
        const {
            factory,
            game: {
                money,
                statistics,
                meta: { upgradesById },
                ticker: { actualTicksPerSec }
            }
        } = this;

        const avgProfit = statistics.getAvgProfit();
        const avgProfitPerSecond = avgProfit * actualTicksPerSec.actual;
        const upgradesManager = factory.upgardesManager; // Typo in the game

        $('.upgradeItem').each(function () {
            const { id, action } = $(this).data();
            if (action === 'sell') return; // No time estimates for selling

            const strategy = upgradesManager.getStrategy(id); // Gets info about upgrades
            const nextUpgrade = upgradesById[id].levels[strategy.amount];

            // return if Upgrade is already maxed out or if player can already afford it
            if (nextUpgrade === undefined || nextUpgrade.price < money) return;

            const moneyNeeded = nextUpgrade.price - money;
            const timeUntil = formatTime(moneyNeeded / avgProfitPerSecond);

            $(this).find('.upgradePopup').find('.te-time-until').html('in ' + timeUntil);
        });
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("upgradeUi"),
            this.gameUiEm.removeListenerForType("upgradeUi"),
            this.container.html(""),
            this.container = null;
    }
}
class AchievementsUi {
    constructor(gameUiEm, game) {
        this.gameUiEm = gameUiEm
        this.game = game
        this.manager = this.game.getAchievementsManager()
    }
    display(n) {
        this.container = n;
        var i = [], s = this.game.getMeta().achievements;
        for (var o = 0; o < s.length; o++) {
            var u = s[o];
            this.manager.isVisible(u.id) && i.push({
                id: u.id,
                name: u.name,
                requirements: this.manager.getTesterDescriptionText(u.id),
                bonus: this.manager.getBonusDescriptionText(u.id)
            });
        }
        this.container.html(Handlebars.compile(template.achievements)({
            achievements: i
        }))
        this.container.find(".backButton").click((e) => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY);
        })
        this.game.getEventManager().addListener("achievementsUi", GameEvent.ACHIEVEMENT_RECEIVED, () => {
            this.update();
        })
        this.update();
        //插件
        $('.achievementsBox').find('.item').each(function () {
            const $timeUntil = $('<span />').addClass('te-time-until te-achievements-time-until');

            $(this).find('.name').append($timeUntil);
        });

        const { handledEvents } = this.game.em;
        this.game.getEventManager().addListener('achievementsUi', handledEvents.GAME_TICK, () => {
            this.update();
        });
    }
    update() {
        var e = this;
        this.container.find(".item").each(function () {
            var t = $(this).attr("data-id"),
                n = $(this).find(".waiting");
            e.manager.getAchievement(t) ? $(this).addClass("achieved") : $(this).removeClass("achieved");
        });
        //插件
        const {
            game: {
                money,
                statistics,
                meta: { achievementsById },
                ticker: { actualTicksPerSec }
            },
            manager
        } = this;

        const avgProfit = statistics.getAvgProfit();
        const avgProfitPerSecond = avgProfit * actualTicksPerSec.actual;

        $('.achievementsBox').find('.item').each(function () {
            const id = $(this).data('id');
            const achievement = achievementsById[id];

            if (manager.getAchievement(id)) return; // Do not show estimate for completed achievements 

            const test = achievement.tests.find(a => a.type === 'amountOfMoney');
            if (!test) return; // Only do time predictions on the amountOfMoney achievements 
            if (test.amount < money) return; // Unlikely edge case where achievement is not gotten yet, but you have completed it
            const moneyNeeded = test.amount - money;
            const timeUntil = formatTime(moneyNeeded / avgProfitPerSecond);

            $(this).find('.te-time-until').html(timeUntil);
        });
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("achievementsUi")
        this.gameUiEm.removeListenerForType("achievementsUi")
        this.container.html("")
        this.container = null
    }
}
var AchievementPopupUi_t = 0,
    AchievementPopupUi_n = 1;
class AchievementPopupUi {
    constructor(game, achievementId) {
        this.game = game
        this.achievementId = achievementId
        this.id = "achievementPopup" + AchievementPopupUi_n++
        this.interval = null
    }
    display() {
        this.container = $("body");
        var r = this.game.getMeta().achievementsById[this.achievementId];
        this.container.append(Handlebars.compile(template.achievementPopup)({
            idStr: this.id,
            name: r.name,
            requirement: this.game.getAchievementsManager().getTesterDescriptionText(r.id),
            bonus: this.game.getAchievementsManager().getBonusDescriptionText(r.id)
        }))
        this.element = this.container.find("#" + this.id).hide()
        this.element.click(() => {
            this.hide();
        })
        this.interval = setTimeout(() => {
            this.hide();
        }, 8e3)
        this.element.css("left", this.container.width() / 2 - this.element.outerWidth() / 2)
        this.element.css("top", 150 + AchievementPopupUi_t * (this.element.outerHeight() + 10))
        this.element.slideDown(400)
        AchievementPopupUi_t++
    }
    hide() {
        this.element && this.element.slideUp(400, () => {
            this.element.remove();
        })
        clearTimeout(this.interval)
        AchievementPopupUi_t--;
    }
}
class HelpUi {
    constructor(gameUiEm, game) {
        this.gameUiEm = gameUiEm
        this.game = game
        this.isVisible = false;
    }
    init() {
        this.gameUiEm.addListener("help", GameUiEvent.SHOW_HELP, () => {
            this.display();
        })
        return this;
    }
    display() {
        if (this.isVisible) return;
        $("body").append(Handlebars.compile(template.help)({}));
        this.isVisible = true;
        var $help = $("#help");
        $help.css("left", ($("html").width() - $help.outerWidth()) / 2)
        $help.find(".closeButton").click(() => {
            this.hide();
        });
        var r = {};
        $help.find(".menu a").each(function () {
            var e = $(this).attr("data-id");
            r[e] = $help.find("#" + e),
                $(this).click(function () {
                    for (var t in r)
                        r[t].hide();
                    r[e].fadeIn();
                });
        })
        $("#gettingStarted").show()
        $("#helpBg").click(() => {
            this.hide();
        });
    }
    hide() {
        this.isVisible = false
        $("#help").remove()
        $("#helpBg").remove()
    }
    destroy() {
        this.hide()
        this.game.getEventManager().removeListenerForType("help")
        this.gameUiEm.removeListenerForType("help")
    }
}
class productionTreeNode {
    constructor(component) {
        this.component = component
        this.producers = []
        this.consumpers = []
    }
    getComponent() {
        return this.component;
    }
    _addConsumerLink(e) {
        this.consumpers.push(e);
    }
    _addProducerLink(e) {
        this.producers.push(e);
    }
    toGraph(e, t, n, level) {
        if (n[this.component.id]) {
            if (level > n[this.component.id].level) {
                n[this.component.id].level = level;
                for (var i in this.producers)
                    this.producers[i].getProducerNode().toGraph(e, t, n, level + 1);
            }
            return;
        }
        var s = {
            id: this.component.id,
            label: this.component.name,
            shape: "box",
            level: level
        };
        n[this.component.id] = s
        e.push(s)
        for (var i in this.producers) {
            this.producers[i].toGraph(e, t, n, level + 1)
            this.producers[i].getProducerNode().toGraph(e, t, n, level + 1)
        }
    }
}
class productionTreeLink {
    constructor(producerNode, consumerNode, resourceId) {
        if (!producerNode)
            throw new Error("producer must be set for resource " + resourceId);
        if (!consumerNode)
            throw new Error("consumer must be set for resource " + resourceId);
        this.producerNode = producerNode
        this.consumerNode = consumerNode
        this.resourceId = resourceId
        this.producerAmount = null
        this.consumerAmount = null
        this.calculateStuff()
        this.canSupport = Math.round(this.producerAmount / this.consumerAmount * 100) / 100
        this.producerNode._addConsumerLink(this)
        this.consumerNode._addProducerLink(this)
    }
    calculateStuff() {
        var e, t = this.producerNode.getComponent();
        t.strategy.type == "buyer" ? (e = t.strategy.purchaseResources[this.resourceId], this.producerAmount = e.amount / t.strategy.interval) : t.strategy.type == "converter" && (e = t.strategy.production[this.resourceId], this.producerAmount = e.amount / t.strategy.interval);
        var n = this.consumerNode.getComponent();
        n.strategy.type == "converter" ? (e = n.strategy.inputResources[this.resourceId], this.consumerAmount = e.perOutputResource / n.strategy.interval) : n.strategy.type == "seller" && (e = n.strategy.resources[this.resourceId], this.consumerAmount = e.amount / n.strategy.interval);
    }
    getProducerNode() {
        return this.producerNode;
    }
    getConsumerNode() {
        return this.consumerNode;
    }
    getResourceId() {
        return this.resourceId;
    }
    getCanSupport() {
        return this.canSupport;
    }
    getProducerAmount() {
        return this.producerAmount;
    }
    getConsumerAmount() {
        return this.consumerAmount;
    }
    toGraph(e, t, n, r) {
        t.push({
            from: this.producerNode.getComponent().id,
            to: this.consumerNode.getComponent().id,
            arrows: "to",
            label: Math.round(this.canSupport * 100) / 100
        });
    }
}
class ProductionIndex {
    constructor(meta) {
        this.meta = meta
        this.nodes = {}
        this.producers = {}
        this.consumers = {}
        this.endNodes = []
        this.validStrategies = {
            buyer: true,
            seller: true,
            converter: true
        };
    }
    getEndNodes() {
        return this.endNodes;
    }
    getNode(e) {
        return this.nodes[e];
    }
    build() {
        for (var n in this.meta.components) {
            var r = this.meta.components[n];
            if (!this.validStrategies[r.strategy.type]) continue;
            var i = new productionTreeNode(r);
            this.nodes[r.id] = i
            this.indexComponent(r)
            r.strategy.type == "seller" && this.endNodes.push(i)
        }
        for (var s in this.producers)
            for (var o = 0; o < this.producers[s].length; o++) {
                var u = this.producers[s][o];
                if (!this.consumers[s]) continue;
                for (var a = 0; a < this.consumers[s].length; a++) {
                    var f = this.consumers[s][a];
                    new productionTreeLink(this.nodes[u.componentId], this.nodes[f.componentId], s);
                }
            }
        return this;
    }
    indexComponent(e) {
        var t = e.strategy;
        t.type == "buyer" ? this.addToProducerIndex(e.id, t.purchaseResources) : t.type == "converter" ? (this.addToProducerIndex(e.id, t.production), this.addToConsumersIndex(e.id, t.inputResources)) : t.type == "seller" && this.addToConsumersIndex(e.id, t.resources);
    }
    addToProducerIndex(componentId, t) {
        for (var resourceId in t) {
            this.producers[resourceId] || (this.producers[resourceId] = [])
            this.producers[resourceId].push({
                componentId: componentId,
                resourceId: resourceId
            });
        }

    }
    addToConsumersIndex(componentId, t) {
        for (var resourceId in t) {
            this.consumers[resourceId] || (this.consumers[resourceId] = [])
            this.consumers[resourceId].push({
                componentId: componentId,
                resourceId: resourceId
            });
        }

    }
}
class StatisticsUi {
    constructor(gameUiEm, factory, imageMap) {
        this.gameUiEm = gameUiEm
        this.factory = factory
        this.imageMap = imageMap
        this.game = factory.getGame()
        this.manager = this.game.getAchievementsManager()
    }
    display(container) {
        this.container = container
        this.container.html(Handlebars.compile(template.statistics)({}))
        this.container.find(".backButton").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY);
        })
        this.game.getEventManager().addListener("statisticsUi", GameEvent.GAME_TICK, () => {
            this.update();
        });
        var n = new ProductionGraphUi((new ProductionTreeBuilder(this.factory)).buildTree("tankSeller", 100), this.imageMap);
        n.display(this.container.find(".graph"))
        this.update()
    }
    update() {
        var e = this;
    }
    destroy() {
        this.game.getEventManager().removeListenerForType("statisticsUi")
        this.gameUiEm.removeListenerForType("statisticsUi")
        this.container.html("")
        this.container = null
    }
}
class PurchasesUi {
    constructor(gameUiEm, play) {
        this.gameUiEm = gameUiEm
        this.play = play
        this.purchasesManager = this.play.getPurchasesManager()
    }
    init() {
        this.gameUiEm.addListener("purchases", GameUiEvent.SHOW_PURCHASES, () => {
            this.display();
        })
        return this
    }
    display() {
        var self = this,
            r = UrlHandler.identifySite(),
            i = {
                mainSiteVersion: r == "localhost" || r == "direct"
            },
            s = this.play.getMeta();
        for (var o in s.productsLayout) {
            var u = s.productsLayout[o];
            i[o] = [];
            for (var a in u) {
                var f = s.productsById[u[a]];
                if (!this.purchasesManager.isVisible(f.id))
                    continue;
                i[o].push({
                    isItem: true,
                    id: f.id,
                    name: f.name,
                    description: f.description,
                    priceStr: f.priceStr[this.purchasesManager.getPriceKey()],
                    isBought: this.purchasesManager.getIsUnlocked(f.id)
                });
            }
        }
        $("body").append(Handlebars.compile(template.purchases)(i))
        this.bg = $("#purchasesBg")
        this.element = $("#purchases")
        this.element.css("left", ($("html").width() - this.element.outerWidth()) / 2)
        this.element.find(".closeButton").click(() => {
            self.hide();
        })
        this.element.find(".item").click(function () {
            var e = $(this).attr("data-id");
            self.purchasesManager.getIsUnlocked(e) || self.purchasesManager.startPurchase(e, () => {
                self.hide()
                self.display();
            });
        })
        this.bg.click(() => {
            self.hide();
        });
    }
    hide() {
        this.element && this.element.remove()
        this.bg && this.bg.remove()
    }
    destroy() {
        this.hide()
        this.gameUiEm.removeListenerForType("purchases");
    }
}
var LoadingUi_t = 0;
class LoadingUi {
    constructor(title) {
        this.title = title
        this.title = "载入中..."
        this.id = "loading" + LoadingUi_t++
        this.idBg = this.id + "Bg"
    }
    setClickCallback(clickCallback) {
        this.clickCallback = clickCallback
        return this
    }
    display() {
        this.container = $("body")
        this.container.append(Handlebars.compile(template.loading)({
            id: this.id,
            idBg: this.idBg,
            title: this.title
        }))
        this.element = this.container.find("#" + this.id)
        this.bg = this.container.find("#" + this.idBg)
        this.element.css("top", Math.round(($(window).height() - this.element.height()) / 2))
        this.element.css("left", Math.round(($(window).width() - this.element.width()) / 2))
        this.element.hide().fadeIn(200)
        this.bg.hide().fadeIn(200)
        this.clickCallback && this.bg.click(() => {
            this.clickCallback()
            this.hide()
        })
        return this;
    }
    hide() {
        this.element && this.element.fadeOut(200, () => {
            this.element.remove();
        })
        this.bg && this.bg.fadeOut(200, () => {
            this.bg.remove();
        });
    }
}
class SettingsUi {
    constructor(gameUiEm, play, game, userHash, saveManager) {
        this.gameUiEm = gameUiEm
        this.play = play
        this.game = game
        this.userHash = userHash
        this.saveManager = saveManager
        this.isVisible = false
    }
    init() {
        this.gameUiEm.addListener("settingsUi", GameUiEvent.SHOW_SETTINGS, () => {
            this.display();
        })
        return this;
    }
    display() {
        if (this.isVisible) return;
        var e = false,
            n = (new LoadingUi).setClickCallback(() => {
                e = true;
            }).display();
        this.saveManager.getSavesInfo(["slot1", "slot2", "slot3"], (t) => {
            if (e) return;
            n.hide()
            this._display(t)
        });
    }
    _display(t) {
        var saveSlots = [];
        for (var i = 1; i <= 3; i++) {
            var s = t["slot" + i];
            saveSlots.push({
                id: "slot" + i,
                name: "存档 " + i,
                hasSave: !!s,
                lastSave: s ? dateToStr(new Date(s.timestamp * 1e3), false) : "-",
                ticks: s ? s.ver : "-"
            });
        }
        $("body").append(Handlebars.compile(template.settings)({
            userHash: this.userHash.toString(),
            cloudSaveInterval: Math.ceil(this.saveManager.getCloudSaveInterval() / 6e4) + "分钟",
            localSaveInterval: Math.ceil(this.saveManager.getLocalSaveInterval() / 1e3) + "秒钟",
            saveSlots: saveSlots,
            devMode: this.play.isDevMode()
        }));
        var self = this;
        this.isVisible = true;
        var u = $("#settings");
        u.css("left", ($("html").width() - u.outerWidth()) / 2)
        u.find(".closeButton").click(() => {
            this.hide();
        })
        u.find("#userHash").click(function () {
            $(this).get(0).setSelectionRange(0, $(this).val().length);
        })
        u.find("#updateUserHashButton").click(() => {
            var e = u.find("#updateUserHash").val();
            e && (this.userHash.updateUserHash(e), document.location = document.location);
        })
        u.find("#copyToClipboardButton").click(function () {
            $("#userHash").get(0).select();
            try {
                var e = document.execCommand("copy"), t = e ? "successful" : "unsuccessful";
                console.log("Copying text command was " + t);
            } catch (n) {
                console.log("Oops, unable to copy");
            }
        })
        u.find(".saveToSlot").click(function () {
            var e = $(this).attr("data-id");
            self.saveManager.saveManual(e, function () {
                self.hide();
            });
        })
        u.find(".loadSlot").click(function () {
            var e = $(this).attr("data-id");
            (new ConfirmUi("加载游戏", "你确定要加载游戏吗?")).setCancelTitle("是的,加载游戏").setOkTitle("不!!!").setCancelCallback(function () {
                self.saveManager.loadManual(e, function () {
                    self.hide()
                    self.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORIES);
                });
            }).display();
        })
        u.find("#loadDataButton").click(function () {
            var data = u.find("#loadData").val();
            self.saveManager.updateGameFromSaveData({
                data: data
            })
            self.hide()
            self.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORIES)
        })
        u.find("#resetGame").click(function () {
            var e = (new ConfirmUi("Reset game", "你确定要重置游戏吗?")).setCancelTitle("是的,重置游戏").setOkTitle("不!!!").setCancelCallback(function () {
                MainInstance.destroy()
                MainInstance.init(true)
                self.destroy()
            }).display();
        })
        $("#settingsBg").click(function () {
            self.hide();
        });
    }
    hide() {
        this.isVisible = false
        $("#settings").remove()
        $("#settingsBg").remove()
    }
    destroy() {
        this.hide()
        this.game.getEventManager().removeListenerForType("settingsUi")
        this.gameUiEm.removeListenerForType("settingsUi")
    }
}
class TimeTravelUi {
    constructor(gameUiEm, play) {
        this.gameUiEm = gameUiEm
        this.play = play
        this.game = play.getGame()
        this.isVisible = false
    }
    init() {
        this.gameUiEm.addListener("help", GameUiEvent.SHOW_TIME_TRAVEL, () => {
            this.display();
        })
        return this;
    }
    display() {
        if (this.isVisible) return;
        var n = new PassTimeAction(this.game, this.play.getMeta().timeTravelTicketValue * 3600);
        $("body").append(Handlebars.compile(template.timeTravel)({
            tickets: this.game.getTicker().getTimeTravelTickets(),
            hasTickets: this.game.getTicker().getTimeTravelTickets() > 0,
            ticks: nf(n.getTicks()),
            profit: nf(n.getProfit()),
            profitPerTick: nf(Math.round(n.getProfit() / n.getTicks())),
            researchPoints: nf(n.getResearchPoints()),
            researchPointsPerTick: nf(Math.round(n.getResearchPoints() / n.getTicks()))
        }));
        this.isVisible = true;
        var i = $("#timeTravel");
        i.css("left", ($("html").width() - i.outerWidth()) / 2)
        i.find(".getMore").click(() => {
            this.gameUiEm.invokeEvent(GameUiEvent.SHOW_PURCHASES),
                this.hide();
        })
        i.find(".travel").click(() => {
            n.canPassTime() ? (n.passTime(), this.hide(), this.display()) : alert("你没有滴答券进行时间旅行!");
        })
        i.find(".refresh").click(() => {
            this.hide()
            this.display();
        })
        i.find(".closeButton").click(() => {
            this.hide();
        })
        $("#timeTravelBg").click(() => {
            this.hide();
        });
    }
    hide() {
        this.isVisible = false
        $("#timeTravel").remove()
        $("#timeTravelBg").remove()
    }
    destroy() {
        this.hide()
        this.game.getEventManager().removeListenerForType("help")
        this.gameUiEm.removeListenerForType("help")
    }
}
class GameUi {
    constructor(globalUiEm, game, play, imageMap) {
        this.globalUiEm = globalUiEm
        this.gameUiEm = new EventManager(GameUiEvent, "GameUi")
        this.play = play
        this.game = game
        this.imageMap = imageMap
        this.focusInterval = null
    }
    display(container) {
        this.game.getMeta().isMission && this.game.init()
        this.container = container
        this.setupEvents()
        this.helpUi = (new HelpUi(this.gameUiEm, this.game)).init()
        this.purchasesUi = (new PurchasesUi(this.gameUiEm, this.play)).init()
        this.settingsUi = (new SettingsUi(this.gameUiEm, this.play, this.game, this.play.getUserHash(), this.play.getSaveManager())).init()
        this.timeTravelUi = (new TimeTravelUi(this.gameUiEm, this.play)).init()
        this._showUi("factories")
        this.game.getMeta().isMission && this.gameUiEm.invokeEvent(GameUiEvent.SHOW_FACTORY, "mission")
    }
    setupEvents() {
        var t = null;
        this.gameUiEm.addListener("GameUi", GameUiEvent.SHOW_FACTORY, (e) => {
            e ? t = e : e = t
            this._showUi("factory", e);
        })
        this.gameUiEm.addListener("GameUi", GameUiEvent.SHOW_FACTORIES, () => {
            this._showUi("factories");
        })
        this.gameUiEm.addListener("GameUi", GameUiEvent.SHOW_RESEARCH, () => {
            this._showUi("research");
        })
        this.gameUiEm.addListener("GameUi", GameUiEvent.SHOW_UPGRADES, (e) => {
            e ? t = e : e = t
            this._showUi("upgrades", e);
        })
        this.gameUiEm.addListener("GameUi", GameUiEvent.SHOW_ACHIEVEMENTS, () => {
            this._showUi("achievements");
        })
        this.gameUiEm.addListener("GameUi", GameUiEvent.SHOW_STATISTICS, () => {
            this._showUi("statistics", t);
        })
        this.game.getEventManager().addListener("GameUi", GameEvent.ACHIEVEMENT_RECEIVED, (e) => {
            var t = new AchievementPopupUi(this.game, e);
            t.display();
        })
        this.globalUiEm.addListener("GameUi", GlobalUiEvent.FOCUS, () => {
            this.game.getEventManager().invokeEvent(GameEvent.FOCUS);
        })
        this.globalUiEm.addListener("GameUi", GlobalUiEvent.BLUR, () => {
            this.game.getEventManager().invokeEvent(GameEvent.BLUR);
        })
    }
    _showUi(e, o) {
        this._destroyCurrentUi()
        e == "factory" ?
            this.currentUi = new FactoryUi(this.globalUiEm, this.gameUiEm, this.game.getFactory(o), this.play, this.imageMap) :
            e == "factories" ?
                this.currentUi = new FactoriesUi(this.globalUiEm, this.gameUiEm, this.game) :
                e == "research" ?
                    this.currentUi = new ResearchUi(this.gameUiEm, this.game) :
                    e == "upgrades" ?
                        this.currentUi = new UpgradesUi(this.gameUiEm, this.game.getFactory(o)) :
                        e == "achievements" ?
                            this.currentUi = new AchievementsUi(this.gameUiEm, this.game) :
                            e == "statistics" && (this.currentUi = new StatisticsUi(this.gameUiEm, this.game.getFactory(o), this.imageMap))
        this.currentUi.display(this.container);
    }
    _destroyCurrentUi() {
        this.currentUi && (this.currentUi.destroy(), this.currentUi = null);
    }
    destroy() {
        this._destroyCurrentUi()
        this.helpUi.destroy()
        this.purchasesUi.destroy()
        this.settingsUi.destroy()
        this.timeTravelUi.destroy()
        this.game.getMeta().isMission && this.game.destroy()
        this.globalUiEm.removeListenerForType("GameUi")
        this.gameUiEm.removeListenerForType("GameUi")
        this.game.getEventManager().removeListenerForType("GameUi")
        this.container = null
        this.focusInterval && clearInterval(this.focusInterval)
    }
}
class MissionsUi {
    constructor(globalUiEm, missions) {
        this.globalUiEm = globalUiEm
        this.missions = missions
    }
    display(container) {
        var n = this
        this.container = container
        var missions = []
        for (var i in this.missions) {
            var mission = this.missions[i];
            missions.push({
                id: mission.id,
                name: mission.name,
                isBought: true
            });
        }
        this.container.html(Handlebars.compile(template.missions)({
            missions: missions
        }))
        this.container.find(".missionButton").click(function (e) {
            var t = $(this).attr("data-id");
            n.globalUiEm.invokeEvent(GlobalUiEvent.SHOW_MISSION, t);
        });
    }
    destroy() {
        this.globalUiEm.removeListenerForType("missionsUi")
        this.container && this.container.html("")
        this.container = null
    }
}
var RunningInBackgroundInfoUi_n = 15e3;
class RunningInBackgroundInfoUi {
    constructor(globalUiEm) {
        this.globalUiEm = globalUiEm
        this.timer = null;
    }
    init() {
        this.globalUiEm.addListener("RunningInBackgroundInfoUi", GlobalUiEvent.FOCUS, () => {
            this.hide();
        })
        this.globalUiEm.addListener("RunningInBackgroundInfoUi", GlobalUiEvent.BLUR, () => {
            this.delayedDisplay();
        })
        //插件
        this.globalUiEm.addListener('RunningInBackgroundInfoUi', START_BACKGROUND_MODE, () => {
            this.play.game.getEventManager().invokeEvent(BACKGROUND_MODE_STARTED);
            this.display();
        });

        this.globalUiEm.addListener('RunningInBackgroundInfoUi', STOP_BACKGROUND_MODE, () => {
            this.play.game.getEventManager().invokeEvent(BACKGROUND_MODE_STOPPED);
            this.hide();
        })
    }
    destroy() {
        this.globalUiEm.removeListenerForType("RunningInBackgroundInfoUi");
    }
    // delayedDisplay() {
    //     this.timer && clearTimeout(this.timer),
    //         this.timer = setTimeout(function () {
    //             this.display();
    //         }.bind(this), RunningInBackgroundInfoUi_n);
    // }
    display() {
        this.container = $("body")
        this.container.append(Handlebars.compile(template.runningInBackgroundInfoUi)({}))
        this.backgroundElement = this.container.find(".runningInBackgroundInfoUiBg")
        this.containerElement = this.container.find(".runningInBackgroundInfoUi")
        this.containerElement.css("left", this.container.width() / 2 - this.containerElement.outerWidth() / 2).css("top", 150)
        this.backgroundElement.hide().fadeIn(500)
        this.containerElement.hide().fadeIn(500)
        //插件
        const blur = () => {
            this.globalUiEm.invokeEvent(STOP_BACKGROUND_MODE);
        };

        this.backgroundElement.click(blur);
        this.containerElement.click(blur);
    }
    hide() {
        this.timer && clearTimeout(this.timer)
        this.backgroundElement && (this.backgroundElement.remove(), this.backgroundElement = null)
        this.containerElement && (this.containerElement.remove(), this.containerElement = null)
    }
    //插件
    delayedDisplay() { }

}
class IntroUi {
    constructor() {
        this.isVisible = false;
    }
    display() {
        if (this.isVisible) return;
        $("body").append(Handlebars.compile(template.intro)({}));
        var t = this;
        this.isVisible = true;
        var n = $("#intro");
        n.css("left", ($("html").width() - n.width()) / 2)
        n.find(".closeButton").click(function () {
            t.hide();
        });
        var r = {};
        n.find(".menu a").each(function () {
            var e = $(this).attr("data-id");
            r[e] = n.find("#" + e)
            $(this).click(function () {
                for (var t in r)
                    r[t].hide();
                r[e].fadeIn();
            });
        })
        $("#gettingStarted").show()
        $("#introBg").click(function () {
            t.hide();
        });
    }
    hide() {
        this.isVisible = false
        $("#intro").remove()
        $("#introBg").remove()
    }
    destroy() {
        this.hide()
        this.game.getEventManager().removeListenerForType("intro")
        this.gameUiEm.removeListenerForType("intro")
    }
}
class MainUi {
    constructor(play, imageMap) {
        this.globalUiEm = new EventManager(GlobalUiEvent, "MainUi")
        this.play = play
        this.imageMap = imageMap
    }
    setupFocusChecker() {
        var e = document.hasFocus();
        this.focusInterval = setInterval(() => {
            var t = document.hasFocus();
            e != t && (e = t, e ? this.globalUiEm.invokeEvent(GlobalUiEvent.FOCUS) : this.globalUiEm.invokeEvent(GlobalUiEvent.BLUR));
        }, 200);
    }
    display(container) {
        this.container = container
        this.runningInBackgroundInfoUi = new RunningInBackgroundInfoUi(this.globalUiEm)
        this.runningInBackgroundInfoUi.init()
        this.play.getGame().getTicker().getNoOfTicks() < 1e3 && (new IntroUi).display()
        this.setupFocusChecker()
        this.play.getGame().getIsPremium() ? logger.info("MainUi", "Premium version, skipping loading adds") : null;
        window.addEventListener("keypress", (e) => {
            this.globalUiEm.invokeEvent(GlobalUiEvent.KEY_PRESS, e);
        }, false)
        window.addEventListener("beforeunload", (e) => {
            this.play.getSaveManager().saveAuto();
        })
        this.globalUiEm.addListener("MainUi", GlobalUiEvent.SHOW_MAIN_GAME, () => {
            this._showUi("mainGame");
        })
        this.globalUiEm.addListener("MainUi", GlobalUiEvent.SHOW_MISSIONS, () => {
            this._showUi("missions");
        })
        this.globalUiEm.addListener("MainUi", GlobalUiEvent.SHOW_MISSION, (e) => {
            this._showUi("mission", e);
        })
        this.play.getGame().getEventManager().addListener("MainUi", GameEvent.GAME_TICK, () => {
            if (config.main.warnToStoreUserHashAfterTicks[this.play.getGame().getTicker().getNoOfTicks()]) {
                var e = "userHashTmpAlert" + Math.round(Math.random() * 1e10),
                    r = '你似乎很喜欢这个游戏!这里有一个很好的建议,可能会挽救一天的心血!<br />复制您的用户密匙.用户密匙是你找回购买的凭证.<br />你的用户密匙: <br /><input type="text" readonly="readonly" id="' + e + '" name="' + e + '" value="' + this.play.getUserHash().toString() + '" style="border: 1px solid red; background:black; color:red; font-weight:bold; padding: 4px; margin: 3px; width:280px; font-size:0.9em; text-align:center;"/><br /> ' + "如果你丢了这个,几乎没有办法恢复你的游戏.谨慎行事,保留备份!<br />" + "您也可以在设置中找到您的用户密匙. <br />" + "<br />" + "如果你已经这样做了,请忽略这个提醒,好好享受!<br />";
                (new AlertUi("将用户密匙保存到安全位置!", r)).display()
                $("#" + e).click(function () {
                    $(this).get(0).setSelectionRange(0, $(this).val().length);
                });
            }
        })
        this._showUi("mainGame");
        //插件
        this.runningInBackgroundInfoUi.play = this.play;
    }
    _showUi(t, n) {
        this._destroyCurrentUi()
        t == "mainGame" ? this.currentUi = new GameUi(this.globalUiEm, this.play.getGame(), this.play, this.imageMap) :
            t == "missions" ? this.currentUi = new MissionsUi(this.globalUiEm, Meta.missions) :
                t == "mission" && (this.currentUi = new GameUi(this.globalUiEm, this.play.getMission(n), this.play, this.imageMap))
        this.currentUi.display(this.container);
    }
    _destroyCurrentUi() {
        this.currentUi && (this.currentUi.destroy(), this.currentUi = null);
    }
    destroy() {
        this.runningInBackgroundInfoUi.destroy()
        this.globalUiEm.removeListenerForType("MainUi")
        this.play.getGame().getEventManager().removeListenerForType("MainUi")
        this.container = null
    }
}
class Main {
    constructor() { }
    init(e, t) {
        this.imageMap = this._createImageMap()
        this.imageMap.loadAll(() => {
            this.play = new Play(this.userHash, this.api)
            this.play.init(e, () => {
                this.play.isDevMode()
                this.mainUi = new MainUi(this.play, this.imageMap)
                this.mainUi.display($("#gameArea"))
                t && t()
            });
        });
    }
    _createImageMap() {
        return (new ImageMap(config.imageMap.path)).addImages({
            yellowSelection: "img/mouse/yellow.png",
            greenSelection: "img/mouse/green.png",
            redSelection: "img/mouse/red.png",
            blueSelection: "img/mouse/selected.png",
            cantPlace: "img/mouse/cantPlace.png",
            terrains: "img/terrains.png",
            components: "img/components.png",
            componentIcons: "img/componentIcons.png",
            transportLine: "img/transportLine.png",
            resources: "img/resources.png"
        });
    }
    destroy() {
        this.mainUi.destroy()
        this.play.destroy()
    }
}
String.prototype.lcFirst = function () {
    return this.charAt(0).toLowerCase() + this.slice(1)
}
String.prototype.ucFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
var MainInstance;
GAME_LOADED = true
window.onerror = oldErrorHandler
MainInstance = new Main()
MainInstance.init(false, () => 0)
//MainInstance.play.game.getTicker().addBonusTicks(10000000)
//
var ttt = {
    "滴答奖励"(e) {
        MainInstance.play.purchasesManager.strategies.bonusTicks.apply({ "amount": e })
    },//滴答奖励
    "滴答卷"(e) {
        MainInstance.play.purchasesManager.strategies.timeTravelTickets.apply({ "amount": e })
    },//滴答卷
    "研究倍数"(e) {
        MainInstance.play.purchasesManager.strategies.researchProductionBonus.apply({ "bonus": e })
    },//研究倍数
    "额外滴答"(e) {
        MainInstance.play.purchasesManager.strategies.extraTicks.apply({ "bonus": e })
    },//额外滴答
    "利润倍数"(e) {
        MainInstance.play.purchasesManager.strategies.extraProfit.apply({ "bonus": e })
    },//利润倍数
    "全屏"(e) {
        MainInstance.play.game.setIsPremium(true)
    },
    aaa(e) {
        MainInstance.play.purchasesManager.strategies.bonusTicks.apply({ "amount": 1000000 })
        MainInstance.play.purchasesManager.strategies.timeTravelTickets.apply({ "amount": 1000000 })
    }
}