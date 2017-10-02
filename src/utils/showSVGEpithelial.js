/**
 * Created by dsar941 on 5/11/2017.
 */
var solutesBouncing = require("./solutesBouncing.js").solutesBouncing;
var getTextWidth = require("../utils/misc.js").getTextWidth;
var uniqueify = require("../utils/misc.js").uniqueify;
var uniqueifyjsonFlux = require("../utils/misc.js").uniqueifyjsonFlux;
var sendPostRequest = require("../libs/ajax-utils.js").sendPostRequest;
var sendGetRequest = require("../libs/ajax-utils.js").sendGetRequest;
var showLoading = require("../utils/misc.js").showLoading;

var showsvgEpithelial = function (concentration_fma, source_fma, sink_fma, apicalMembrane, basolateralMembrane, membrane) {

    var apicalID = "http://identifiers.org/fma/FMA:84666";
    var basolateralID = "http://identifiers.org/fma/FMA:84669";
    var paracellularID = "http://identifiers.org/fma/FMA:67394";
    var luminalID = "http://identifiers.org/fma/FMA:74550";
    var cytosolID = "http://identifiers.org/fma/FMA:66836";
    var interstitialID = "http://identifiers.org/fma/FMA:9673";
    var Nachannel = "http://purl.obolibrary.org/obo/PR_000014527";
    var Clchannel = "http://purl.obolibrary.org/obo/PR_Q06393";
    var Kchannel = "http://purl.obolibrary.org/obo/PR_P15387";

    var tempapical = [];
    var tempBasolateral = [];
    var paracellularMembrane = [];

    var endpoint = "https://models.physiomeproject.org/pmr2_virtuoso_search";

    /*
     * relatedModel - all related models
     * relatedModelValue - filtered related models which have #protein
     * relatedModelID - relatedModel which have #protein
     * */
    var relatedModel = [], relatedModelValue = [], relatedModelID = [], workspaceName = "";
    var membraneModel = [], membraneModelValue = [], membraneModelID = [], membraneObject = [];
    var proteinName, proteinText, cellmlModel, biological_meaning, biological_meaning2, speciesName, geneName;
    var idProtein = 0, idAltProtein = 0, idMembrane = 0, loc, typeOfModel, altCellmlModel = "", cthis;
    var icircleGlobal, organIndex, model_entity, model_entity2;

    var line = [], mindex;

    var dx = [], dy = [],
        dxtext = [], dytext = [], dxtext2 = [], dytext2 = [],
        dx1line = [], dy1line = [], dx2line = [], dy2line = [],
        dx1line2 = [], dy1line2 = [], dx2line2 = [], dy2line2 = [];

    var id = 0;

    var organ = [
        {
            "key": [
                {
                    "key": "http://identifiers.org/fma/FMA:7203",
                    "value": "kidney"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:84666",
                    "value": "apical plasma membrane"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:70973",
                    "value": "epithelial cell of proximal tubule"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:70981",
                    "value": "epithelial cell of Distal tubule"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:17693",
                    "value": "proximal convoluted tubule"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:17721",
                    "value": "distal convoluted tubule"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:66836",
                    "value": "portion of cytosol"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:84669",
                    "value": "basolateralMembrane plasma membrane"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:17716",
                    "value": "proximal straight tubule"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:17717",
                    "value": "ascending limb of loop of Henle"
                },
                {
                    "key": "http://identifiers.org/fma/FMA:17705",
                    "value": "descending limb of loop of Henle"
                },
                {
                    "key": "http://identifiers.org/go/GO:0072061",
                    "value": "inner medullary collecting duct development"
                },
                {
                    "key": "http://identifiers.org/ma/MA:0002595",
                    "value": "renal medullary capillary"
                },
                {
                    "key": "http://identifiers.org/uberon/UBERON:0004726",
                    "value": "vasa recta"
                },
                {
                    "key": "http://identifiers.org/uberon/UBERON:0009091",
                    "value": "vasa recta ascending limb"
                },
                {
                    "key": "http://identifiers.org/uberon/UBERON:0004775",
                    "value": "outer renal medulla vasa recta"
                },
                {
                    "key": "http://identifiers.org/uberon/UBERON:0004776",
                    "value": "inner renal medulla vasa recta"
                }
            ],

            "value": "Kidney"
        }
    ];

    // Extract apical fluxes
    for (var i = 0; i < apicalMembrane.length; i++) {
        tempapical.push({
            srctext: apicalMembrane[i].variable_text,
            srcfma: apicalMembrane[i].source_fma,
            snkfma: apicalMembrane[i].sink_fma
        });

        tempapical.push({
            srctext: apicalMembrane[i].variable_text2,
            srcfma: apicalMembrane[i].source_fma2,
            snkfma: apicalMembrane[i].sink_fma2
        });
    }

    // Extract basolateral fluxes
    for (var i = 0; i < basolateralMembrane.length; i++) {
        tempBasolateral.push({
            srctext: basolateralMembrane[i].variable_text,
            srcfma: basolateralMembrane[i].source_fma,
            snkfma: basolateralMembrane[i].sink_fma
        });

        tempBasolateral.push({
            srctext: basolateralMembrane[i].variable_text2,
            srcfma: basolateralMembrane[i].source_fma2,
            snkfma: basolateralMembrane[i].sink_fma2
        });
    }

    // remove apical fluxes from membrane array
    for (var i = 0; i < tempapical.length; i++) {
        for (var j = 0; j < membrane.length; j++) {
            if (tempapical[i].srctext == membrane[j].variable_text &&
                tempapical[i].srcfma == membrane[j].source_fma &&
                tempapical[i].snkfma == membrane[j].sink_fma) {

                membrane.splice(j, 1);
            }
        }
    }

    // remove basolateral fluxes from membrane array
    for (var i = 0; i < tempBasolateral.length; i++) {
        for (var j = 0; j < membrane.length; j++) {
            if (tempBasolateral[i].srctext == membrane[j].variable_text &&
                tempBasolateral[i].srcfma == membrane[j].source_fma &&
                tempBasolateral[i].snkfma == membrane[j].sink_fma) {

                membrane.splice(j, 1);
            }
        }
    }

    // TODO: Hard coded for Nachannel, Clchannel, Kchannel
    for (var i = 0; i < membrane.length; i++) {
        if (membrane[i].med_fma == apicalID && (membrane[i].med_pr == Nachannel ||
            membrane[i].med_pr == Clchannel || membrane[i].med_pr == Kchannel)) {
            apicalMembrane.push(
                {
                    solute_chebi: membrane[i].solute_chebi,
                    solute_text: membrane[i].solute_text,
                    variable_text: membrane[i].variable_text,
                    source_fma: membrane[i].source_fma,
                    sink_fma: membrane[i].sink_fma,
                    solute_chebi2: "",
                    solute_text2: "",
                    variable_text2: "channel",
                    source_fma2: "",
                    sink_fma2: "",
                    model_entity: membrane[i].model_entity,
                    model_entity2: "",
                    med_fma: membrane[i].med_fma,
                    med_pr: membrane[i].med_pr,
                    med_pr_text: membrane[i].med_pr_text,
                    med_pr_text_syn: membrane[i].med_pr_text_syn
                });
        }

        if (membrane[i].med_fma == basolateralID && (membrane[i].med_pr == Nachannel ||
            membrane[i].med_pr == Clchannel || membrane[i].med_pr == Kchannel)) {
            basolateralMembrane.push(
                {
                    solute_chebi: membrane[i].solute_chebi,
                    solute_text: membrane[i].solute_text,
                    variable_text: membrane[i].variable_text,
                    source_fma: membrane[i].source_fma,
                    sink_fma: membrane[i].sink_fma,
                    solute_chebi2: "",
                    solute_text2: "",
                    variable_text2: "channel",
                    source_fma2: "",
                    sink_fma2: "",
                    model_entity: membrane[i].model_entity,
                    model_entity2: "",
                    med_fma: membrane[i].med_fma,
                    med_pr: membrane[i].med_pr,
                    med_pr_text: membrane[i].med_pr_text,
                    med_pr_text_syn: membrane[i].med_pr_text_syn
                });
        }

        if (membrane[i].source_fma == luminalID && membrane[i].sink_fma == interstitialID) {
            paracellularMembrane.push(
                {
                    solute_chebi: membrane[i].solute_chebi,
                    solute_text: membrane[i].solute_text,
                    variable_text: membrane[i].variable_text,
                    source_fma: membrane[i].source_fma,
                    sink_fma: membrane[i].sink_fma,
                    solute_chebi2: "",
                    solute_text2: "",
                    variable_text2: "diffusive channel",
                    source_fma2: "",
                    sink_fma2: "",
                    model_entity: membrane[i].model_entity,
                    model_entity2: "",
                    med_fma: membrane[i].med_fma,
                    med_pr: membrane[i].med_pr,
                    med_pr_text: membrane[i].med_pr_text,
                    med_pr_text_syn: membrane[i].med_pr_text_syn
                });
        }
    }

    // single flux
    for (var i = 0; i < membrane.length; i++) {
        if (membrane[i].med_fma == apicalID && membrane[i].variable_text2 != "channel" &&
            membrane[i].variable_text2 != "diffusive channel") {
            apicalMembrane.push(
                {
                    solute_chebi: membrane[i].solute_chebi,
                    solute_text: membrane[i].solute_text,
                    variable_text: membrane[i].variable_text,
                    source_fma: membrane[i].source_fma,
                    sink_fma: membrane[i].sink_fma,
                    solute_chebi2: "",
                    solute_text2: "",
                    variable_text2: "single flux",
                    source_fma2: membrane[i].source_fma,
                    sink_fma2: membrane[i].sink_fma,
                    model_entity: membrane[i].model_entity,
                    model_entity2: "",
                    med_fma: membrane[i].med_fma,
                    med_pr: membrane[i].med_pr,
                    med_pr_text: membrane[i].med_pr_text,
                    med_pr_text_syn: membrane[i].med_pr_text_syn
                });
        }

        if (membrane[i].med_fma == basolateralID && membrane[i].variable_text2 != "channel" &&
            membrane[i].variable_text2 != "diffusive channel") {
            basolateralMembrane.push(
                {
                    solute_chebi: membrane[i].solute_chebi,
                    solute_text: membrane[i].solute_text,
                    variable_text: membrane[i].variable_text,
                    source_fma: membrane[i].source_fma,
                    sink_fma: membrane[i].sink_fma,
                    solute_chebi2: "",
                    solute_text2: "",
                    variable_text2: "single flux",
                    source_fma2: membrane[i].source_fma,
                    sink_fma2: membrane[i].sink_fma,
                    model_entity: membrane[i].model_entity,
                    model_entity2: "",
                    med_fma: membrane[i].med_fma,
                    med_pr: membrane[i].med_pr,
                    med_pr_text: membrane[i].med_pr_text,
                    med_pr_text_syn: membrane[i].med_pr_text_syn
                });
        }
    }

    console.log("membrane: ", membrane);
    console.log("concentration_fma: ", concentration_fma);
    console.log("source_fma: ", source_fma);
    console.log("sink_fma: ", sink_fma);
    console.log("apicalMembrane: ", apicalMembrane);
    console.log("basolateralMembrane: ", basolateralMembrane);
    console.log("paracellularMembrane: ", paracellularMembrane);

    var combinedMembrane = [];

    for (var i = 0; i < apicalMembrane.length; i++)
        combinedMembrane.push(apicalMembrane[i]);
    for (var i = 0; i < basolateralMembrane.length; i++)
        combinedMembrane.push(basolateralMembrane[i]);
    for (var i = 0; i < paracellularMembrane.length; i++)
        combinedMembrane.push(paracellularMembrane[i]);

    console.log("combinedMembrane: ", combinedMembrane);

    var g = $("#svgVisualize"),
        wth = 1200,
        hth = 900,
        width = 300,
        height = 400;

    var w = 800,
        h = height + 500; // Init 400 + 500 = 900

    var prevHeight = height;

    if (apicalMembrane.length > basolateralMembrane.length && apicalMembrane.length > 4)
        height += 50 * (apicalMembrane.length - 4);

    if (basolateralMembrane.length > apicalMembrane.length && basolateralMembrane.length > 4)
        height += 50 * (basolateralMembrane.length - 4);

    if (prevHeight != height) {
        h += (height - prevHeight);
        hth += (height - prevHeight);
    }

    console.log("Prev and Height: ", prevHeight, height, h, hth);

    var svg = d3.select("#svgVisualize").append("svg")
        .attr("width", wth)
        .attr("height", hth);

    var newg = svg.append("g")
        .data([{x: w / 3, y: height / 3}]);

    var newgdefs = svg.append("g");
    newgdefs.append("defs")
        .append("pattern")
        .attr("id", "basicPattern")
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 4)
        .attr("height", 4)
        .append("circle")
        .attr("cx", "0")
        .attr("cy", "0")
        .attr("r", "1.5")
        .attr("stroke", "#6495ED")
        .attr("stroke-width", 1.5);

    var dragrect = newg.append("rect")
        .attr("x", function (d) {
            return d.x;
        })
        .attr("y", function (d) {
            return d.y;
        })
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 10)
        .attr("ry", 20)
        .attr("fill", "white")
        .attr("stroke", "url(#basicPattern)")
        .attr("stroke-width", 25);

    // Extracellular rectangle
    var extracellular = newg.append("rect")
        .attr("id", luminalID)
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w / 3 - 30)
        .attr("height", h)
        .attr("stroke", function (d) {
            svg.append("text")
                .style("font", "16px sans-serif")
                .attr("stroke", "purple")
                .attr("opacity", 0.5)
                .attr("x", 850)
                .attr("y", 70)
                .text("Luminal Compartment");

            return "purple";
        })
        .attr("strokeWidth", "6px")
        .attr("fill", "white");

    // Intracellular rectangle
    var intracellular = newg.append("rect")
        .attr("id", cytosolID)
        .attr("x", w / 3 + 30)
        .attr("y", height / 3 + 20)
        .attr("width", width - 60)
        .attr("height", height - 40)
        .attr("stroke", function (d) {
            svg.append("text")
                .style("font", "16px sans-serif")
                .attr("stroke", "blue")
                .attr("opacity", 0.5)
                .attr("x", 850)
                .attr("y", 95)
                .text("Cytosol Compartment");

            return "blue";
        })
        .attr("strokeWidth", "6px")
        .attr("fill", "white");

    // Interstitial fluid rectangle
    var interstitial = newg.append("rect")
        .attr("id", interstitialID)
        .attr("x", w / 3 + width + 30)
        .attr("y", 0)
        .attr("width", w - (w / 3 + width + 30))
        .attr("height", h)
        .attr("stroke", function (d) {
            svg.append("text")
                .style("font", "16px sans-serif")
                .attr("stroke", "teal")
                .attr("opacity", 0.5)
                .attr("x", 850)
                .attr("y", 120)
                .text("Interstitial Fluid");

            return "teal";
        })
        .attr("strokeWidth", "6px")
        .attr("fill", "white");

    // Interstitial fluid rectangle
    var interstitial2 = newg.append("rect")
        .attr("id", interstitialID)
        .attr("x", w / 3 - 10)
        .attr("y", 0)
        .attr("width", width + 40)
        .attr("height", height / 3 - 30)
        .attr("stroke", "teal")
        .attr("strokeWidth", "6px")
        .attr("fill", "white");

    // Paracellular rectangle
    var paracellular = newg.append("rect")
        .attr("id", paracellularID)
        .attr("x", w / 3 - 10)
        .attr("y", height / 3 + height + 30)
        .attr("width", width + 20)
        .attr("height", height / 3)
        .attr("stroke", function (d) {
            svg.append("text")
                .style("font", "16px sans-serif")
                .attr("stroke", "violet")
                .attr("opacity", 0.5)
                .attr("x", 850)
                .attr("y", 145)
                .text("Paracellular Pathway");

            return "violet";
        })
        .attr("strokeWidth", "6px")
        .attr("fill", "white");

    var solutes = [];

    for (var i = 0; i < concentration_fma.length; i++) {

        // luminal(1), cytosol(2), interstitial(3), interstitial2(4), paracellular(5)
        for (var j = 1; j <= 5; j++) {
            if (concentration_fma[i].fma == $("rect")[j].id)
                break;
        }

        // compartments
        if (concentration_fma[i].fma == $("rect")[j].id) {
            var xrect = $("rect")[j].x.baseVal.value;
            var yrect = $("rect")[j].y.baseVal.value;
            var xwidth = $("rect")[j].width.baseVal.value;
            var yheight = $("rect")[j].height.baseVal.value;

            var indexOfHash = concentration_fma[i].name.search("#");
            var value = concentration_fma[i].name.slice(indexOfHash + 1);
            var indexOfdot = value.indexOf('.');
            value = value.slice(indexOfdot + 1);

            solutes.push(
                {
                    compartment: $("rect")[j].id,
                    xrect: xrect,
                    yrect: yrect,
                    width: xwidth,
                    height: yheight,
                    value: value,
                    length: getTextWidth(value, 12) //value.length
                });
        }
    }

    solutesBouncing(newg, solutes);

    // line apical and basolateral
    var x = $("rect")[0].x.baseVal.value;
    var y = $("rect")[0].y.baseVal.value;

    var lineapical = newg.append("line")
        .attr("id", apicalID)
        .attr("x1", function (d) {
            return d.x;
        })
        .attr("y1", function (d) {
            return d.y + 10;
        })
        .attr("x2", function (d) {
            return d.x;
        })
        .attr("y2", function (d) {
            return d.y + height - 10;
        })
        .attr("stroke", function (d) {
            svg.append("text")
                .style("font", "16px sans-serif")
                .attr("stroke", "green")
                .attr("x", 850)
                .attr("y", 20)
                .text("Apical Membrane");

            return "green";
        })
        .attr("stroke-width", 25)
        .attr("opacity", 0.5);

    var linebasolateral = newg.append("line")
        .attr("id", basolateralID)
        .attr("x1", function (d) {
            return d.x + width;
        })
        .attr("y1", function (d) {
            return d.y + 10;
        })
        .attr("x2", function (d) {
            return d.x + width;
        })
        .attr("y2", function (d) {
            return d.y + height - 10;
        })
        .attr("stroke", function (d) {
            svg.append("text")
                .style("font", "16px sans-serif")
                .attr("stroke", "orange")
                .attr("x", 850)
                .attr("y", 45)
                .text("Basolateral Membrane");

            return "orange";
        })
        .attr("stroke-width", 25)
        .attr("opacity", 0.5);

    var px = 265, py = height / 3 + height + height / 3 + 60; // 720
    // Neighbour epithelial cell
    newg.append("polygon")
        .attr("transform", "translate(" + px + ", " + py + ")")
        .attr("points", "0,0 0,100 0,0 300,0 300,100 300,0")
        .attr("fill", "white")
        .attr("stroke", "url(#basicPattern)")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 25);

    // Circle and line arrow from lumen to cytosol
    var xrect = $("rect")[0].x.baseVal.value;
    var yrect = $("rect")[0].y.baseVal.value;

    console.log("$(rect)", $("rect"));

    // Paracellular membrane
    var xprect = $("rect")[5].x.baseVal.value;
    var yprect = $("rect")[5].y.baseVal.value;
    var xpvalue = xprect + 10;
    var ypvalue = yprect + 25;
    var ypdistance = 35;

    var radius = 20,
        lineLen = 50, polygonlineLen = 60, pcellLen = 100,

        xvalue = xrect - lineLen / 2, // x coordinate before epithelial rectangle
        yvalue = yrect + 10 + 50, // initial distance 50
        cxvalue = xrect, cyvalue = yrect + 10 + 50, // initial distance 50
        ydistance = 70,

        yvalueb = yrect + 10 + 50, // initial distance 50
        cyvalueb = yrect + 10 + 50, // initial distance 50

        circlewithlineg = [], circlewithtext = [],
        linewithlineg = [], linewithlineg2 = [],
        linewithtextg = [], linewithtextg2 = [], polygon = [];

    // TODO: does not work for bi-directional arrow, Fix this
    // SVG checkbox with drag on-off
    var checkboxsvg = newg.append("g");

    var checkBox = [], checkedchk = [],
        ydistancechk = 50, yinitialchk = 185, ytextinitialchk = 200,
        markerWidth = 4, markerHeight = 4;

    for (var i = 0; i < combinedMembrane.length; i++) {
        checkBox[i] = new d3CheckBox();
    }

    var update = function () {
        for (var i = 0; i < combinedMembrane.length; i++) {
            checkedchk[i] = checkBox[i].checked();
            if (checkedchk[i] == true) {
                circlewithlineg[i].call(d3.drag().on("drag", dragcircleline).on("end", dragcircleendline));
            }
            else {
                circlewithlineg[i].call(d3.drag().on("end", dragcircleunchecked));
            }
        }
    };

    for (var i = 0; i < combinedMembrane.length; i++) {
        // var textvaluechk = combinedMembrane[i].variable_text + " " + combinedMembrane[i].variable_text2;
        var textvaluechk = combinedMembrane[i].med_pr_text;
        var indexOfParen = textvaluechk.indexOf('(');
        textvaluechk = textvaluechk.slice(0, indexOfParen - 1) + ' (' + combinedMembrane[i].med_pr_text_syn + ')';

        checkBox[i].x(850).y(yinitialchk).checked(false).clickEvent(update);
        checkBox[i].xtext(890).ytext(ytextinitialchk).text("" + textvaluechk + "");

        checkboxsvg.call(checkBox[i]);

        yinitialchk += ydistancechk;
        ytextinitialchk += ydistancechk;
    }

    function d3CheckBox() {

        var size = 20,
            x = 0,
            y = 0,
            rx = 0,
            ry = 0,
            markStrokeWidth = 2,
            boxStrokeWidth = 2,
            checked = false,
            clickEvent,
            xtext = 0,
            ytext = 0,
            text = "Empty";

        function checkBox(selection) {
            var g = selection.append("g"),
                box = g.append("rect")
                    .attr("width", size)
                    .attr("height", size)
                    .attr("x", x)
                    .attr("y", y)
                    .attr("rx", rx)
                    .attr("ry", ry)
                    .styles({
                        "fill-opacity": 0,
                        "stroke-width": boxStrokeWidth,
                        "stroke": "black"
                    }),
                txt = g.append("text").attr("x", xtext).attr("y", ytext).text("" + text + "");

            //Data to represent the check mark
            var coordinates = [
                {x: x + (size / 8), y: y + (size / 3)},
                {x: x + (size / 2.2), y: (y + size) - (size / 4)},
                {x: (x + size) - (size / 8), y: (y + (size / 10))}
            ];

            var line = d3.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                });

            var mark = g.append("path")
                .attr("d", line(coordinates))
                .styles({
                    "stroke-width": markStrokeWidth,
                    "stroke": "black",
                    "fill": "none",
                    "opacity": (checked) ? 1 : 0
                });

            g.on("click", function () {
                checked = !checked;
                mark.style("opacity", (checked) ? 1 : 0);

                if (clickEvent) {
                    clickEvent();
                }

                d3.event.stopPropagation();
            });
        }

        checkBox.size = function (val) {
            size = val;
            return checkBox;
        }

        checkBox.x = function (val) {
            x = val;
            return checkBox;
        }

        checkBox.y = function (val) {
            y = val;
            return checkBox;
        }

        checkBox.rx = function (val) {
            rx = val;
            return checkBox;
        }

        checkBox.ry = function (val) {
            ry = val;
            return checkBox;
        }

        checkBox.markStrokeWidth = function (val) {
            markStrokeWidth = val;
            return checkBox;
        }

        checkBox.boxStrokeWidth = function (val) {
            boxStrokeWidth = val;
            return checkBox;
        }

        checkBox.checked = function (val) {
            if (val === undefined) {
                return checked;
            } else {
                checked = val;
                return checkBox;
            }
        }

        checkBox.clickEvent = function (val) {
            clickEvent = val;
            return checkBox;
        }

        checkBox.xtext = function (val) {
            xtext = val;
            return checkBox;
        }

        checkBox.ytext = function (val) {
            ytext = val;
            return checkBox;
        }

        checkBox.text = function (val) {
            text = val;
            return checkBox;
        }

        return checkBox;
    }

    var div = d3.select("#svgVisualize").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var state = 0;
    $(document).on({
        mousedown: function () {
            // console.log("mousedown: ", event.which);

            // 1 => left click, 2 => middle click, 3 => right click
            if (event.which == 2)
                div.style("display", "none");
        },

        click: function () {
            // Change marker direction and text position
            if (event.target.localName == "line" && event.target.nodeName == "line") {

                // marker direction
                var id = event.srcElement.id;
                markerDir(id);

                // text position
                var idText = event.srcElement.nextSibling.firstChild.id;
                var textContent = event.srcElement.nextSibling.firstChild.innerHTML;
                var textWidth = getTextWidth(textContent, 12);
                if (state == 0) {
                    d3.select("#" + idText + "")
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("x", event.srcElement.x1.baseVal.value - textWidth - 10)
                        .attr("y", event.srcElement.y1.baseVal.value + 5);

                    state = 1;
                }
                else {
                    d3.select("#" + idText + "")
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("x", event.srcElement.x1.baseVal.value + textWidth + 20)
                        .attr("y", event.srcElement.y1.baseVal.value + 5);

                    state = 0;
                }
            }
        }
    });

    // apical, basolateral, and paracellular membrane
    for (var i = 0; i < combinedMembrane.length; i++) {
        model_entity = combinedMembrane[i].model_entity;

        var tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
            "rawfile" + "/" + "HEAD" + "/" + model_entity;

        if (combinedMembrane[i].model_entity2 != undefined)
            model_entity2 = combinedMembrane[i].model_entity2;
        else model_entity2 = "";

        var mediator_fma = combinedMembrane[i].med_fma,
            mediator_pr = combinedMembrane[i].med_pr,
            mediator_pr_text = combinedMembrane[i].med_pr_text,
            mediator_pr_text_syn = combinedMembrane[i].med_pr_text_syn,

            solute_chebi = combinedMembrane[i].solute_chebi,
            solute_chebi2 = combinedMembrane[i].solute_chebi2,
            solute_text = combinedMembrane[i].solute_text,
            solute_text2 = combinedMembrane[i].solute_text2,

            textvalue = combinedMembrane[i].variable_text,
            textvalue2 = combinedMembrane[i].variable_text2,
            src_fma = combinedMembrane[i].source_fma,
            src_fma2 = combinedMembrane[i].source_fma2,
            snk_fma = combinedMembrane[i].sink_fma,
            snk_fma2 = combinedMembrane[i].sink_fma2,
            textWidth = getTextWidth(textvalue, 12),

            tempID = circlewithlineg.length;

        /*  Apical Membrane */
        if (mediator_fma == apicalID) {
            // case 1
            if ((src_fma == luminalID && snk_fma == cytosolID) && (src_fma2 == luminalID && snk_fma2 == cytosolID)) {
                var lineg = newg.append("g").data([{x: xvalue, y: yvalue}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#end)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue + lineLen + 10, y: yvalue + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue, y: cyvalue}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", apicalID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "lightgreen")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue, y: yvalue + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-end", "url(#end)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue + lineLen + 10, y: yvalue + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                console.log("x,y,i apical: ", linewithtextg[i].attr("x"), linewithtextg[i].attr("y"), i);

                // increment y-axis of line and circle
                yvalue += ydistance;
                cyvalue += ydistance;
            }

            // case 2
            if ((src_fma == cytosolID && snk_fma == luminalID) && (src_fma2 == cytosolID && snk_fma2 == luminalID)) {
                var lineg = newg.append("g").data([{x: xvalue, y: yvalue}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-start", "url(#start)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue - 30, y: yvalue + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue, y: cyvalue}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", apicalID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "lightgreen")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue, y: yvalue + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-end", "url(#end)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue - textWidth - 10, y: yvalue + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                // increment y-axis of line and circle
                yvalue += ydistance;
                cyvalue += ydistance;
            }

            // case 3
            if ((src_fma == luminalID && snk_fma == cytosolID) && (src_fma2 == cytosolID && snk_fma2 == luminalID)) {
                var lineg = newg.append("g").data([{x: xvalue, y: yvalue}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#end)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue + lineLen + 10, y: yvalue + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue, y: cyvalue}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", apicalID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "lightgreen")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue, y: yvalue + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-start", "url(#start)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue - textWidth - 10, y: yvalue + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                // increment y-axis of line and circle
                yvalue += ydistance;
                cyvalue += ydistance;
            }

            // case 4
            if ((src_fma == cytosolID && snk_fma == luminalID) && (src_fma2 == luminalID && snk_fma2 == cytosolID)) {
                var lineg = newg.append("g").data([{x: xvalue, y: yvalue}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-start", "url(#start)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue - 30, y: yvalue + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue, y: cyvalue}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", apicalID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "lightgreen")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue, y: yvalue + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-end", "url(#end)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue + lineLen + 10, y: yvalue + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                // increment y-axis of line and circle
                yvalue += ydistance;
                cyvalue += ydistance;
            }

            // case 5
            if ((src_fma == luminalID && snk_fma == cytosolID) && (textvalue2 == "channel")) {
                var polygong = newg.append("g").data([{x: xvalue - 5, y: yvalue}]);
                linewithlineg[i] = polygong.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + polygonlineLen;
                        return d.x + polygonlineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#end)")
                    .attr("cursor", "pointer");

                var linegtext = polygong.append("g").data([{x: xvalue + polygonlineLen + 10, y: yvalue + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                // Polygon
                circlewithlineg[i] = polygong.append("g").append("polygon")
                    .attr("transform", "translate(" + (xvalue - 5) + "," + (yvalue - 30) + ")")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", apicalID)
                    .attr("cx", function (d) {
                        dx[i] = xvalue - 5;
                        return dx[i];
                    })
                    .attr("cy", function (d) {
                        dy[i] = yvalue - 30;
                        return dy[i];
                    })
                    .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30")
                    .attr("fill", "yellow")
                    .attr("stroke", "black")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // text inside polygon
                var polygontext = polygong.append("g").data([{x: xvalue + 12, y: yvalue + 4}]);
                circlewithtext[i] = polygontext.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-size", "10px")
                    .attr("fill", "red")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                // increment y-axis of line and circle
                yvalue += ydistance;
                cyvalue += ydistance;
            }

            // case 6
            if ((src_fma == cytosolID && snk_fma == luminalID) && (textvalue2 == "channel")) {
                var polygong = newg.append("g").data([{x: xvalue - 5, y: yvalue}]);
                linewithlineg[i] = polygong.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + polygonlineLen;
                        return d.x + polygonlineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-start", "url(#start)")
                    .attr("cursor", "pointer");

                var linegtext = polygong.append("g").data([{x: xvalue - 30, y: yvalue + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                // Polygon
                circlewithlineg[i] = polygong.append("g").append("polygon")
                    .attr("transform", "translate(" + (xvalue - 5) + "," + (yvalue - 30) + ")")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", apicalID)
                    .attr("cx", function (d) {
                        dx[i] = xvalue - 5;
                        return dx[i];
                    })
                    .attr("cy", function (d) {
                        dy[i] = yvalue - 30;
                        return dy[i];
                    })
                    .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30")
                    .attr("fill", "yellow")
                    .attr("stroke", "black")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // text inside polygon
                var polygontext = polygong.append("g").data([{x: xvalue + 12, y: yvalue + 4}]);
                circlewithtext[i] = polygontext.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-size", "10px")
                    .attr("fill", "red")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                // increment y-axis of line and circle
                yvalue += ydistance;
                cyvalue += ydistance;
            }
        }

        /*  Basolateral Membrane */
        if (mediator_fma == basolateralID) {
            // case 1
            if ((src_fma == cytosolID && snk_fma == interstitialID) && (src_fma2 == cytosolID && snk_fma2 == interstitialID)) {
                var lineg = newg.append("g").data([{x: xvalue + width, y: yvalueb}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#end)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue + lineLen + 10 + width, y: yvalueb + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue + width, y: cyvalueb}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", basolateralID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "orange")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue + width, y: yvalueb + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-end", "url(#end)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue + lineLen + 10 + width, y: yvalueb + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                // increment y-axis of line and circle
                yvalueb += ydistance;
                cyvalueb += ydistance;
            }

            // case 2
            if ((src_fma == interstitialID && snk_fma == cytosolID) && (src_fma2 == interstitialID && snk_fma2 == cytosolID)) {
                var lineg = newg.append("g").data([{x: xvalue + width, y: yvalueb}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-start", "url(#start)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue - 30 + width, y: yvalueb + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue + width, y: cyvalueb}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", basolateralID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "orange")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue + width, y: yvalueb + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-start", "url(#start)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue - textWidth - 10 + width, y: yvalueb + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                console.log("x,y,i baso: ", linewithtextg[i].attr("x"), linewithtextg[i].attr("y"), i);

                // increment y-axis of line and circle
                yvalueb += ydistance;
                cyvalueb += ydistance;
            }

            // case 3
            if ((src_fma == cytosolID && snk_fma == interstitialID) && (src_fma2 == interstitialID && snk_fma2 == cytosolID)) {
                var lineg = newg.append("g").data([{x: xvalue + width, y: yvalueb}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#end)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue + lineLen + 10 + width, y: yvalueb + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue + width, y: cyvalueb}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", basolateralID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "orange")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue + width, y: yvalueb + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-start", "url(#start)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue - textWidth - 10 + width, y: yvalueb + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                // increment y-axis of line and circle
                yvalueb += ydistance;
                cyvalueb += ydistance;
            }

            // case 4
            if ((src_fma == interstitialID && snk_fma == cytosolID) && (src_fma2 == cytosolID && snk_fma2 == interstitialID)) {
                var lineg = newg.append("g").data([{x: xvalue + width, y: yvalueb}]);
                linewithlineg[i] = lineg.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + lineLen;
                        return d.x + lineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-start", "url(#start)")
                    .attr("cursor", "pointer");

                var linegtext = lineg.append("g").data([{x: xvalue - 30 + width, y: yvalueb + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                var linegcircle = lineg.append("g").data([{x: cxvalue + width, y: cyvalueb}]);
                circlewithlineg[i] = linegcircle.append("circle")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", basolateralID)
                    .attr("cx", function (d) {
                        dx[i] = d.x;
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        dy[i] = d.y + radius;
                        return d.y + radius;
                    })
                    .attr("r", radius)
                    .attr("fill", "orange")
                    .attr("stroke-width", 20)
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                // protein name inside this circle
                circlewithtext[i] = linegcircle.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dx[i] = d.x;
                        return d.x - 15;
                    })
                    .attr("y", function (d) {
                        dy[i] = d.y;
                        return d.y + 23;
                    })
                    .attr("font-size", "12px")
                    .attr("fill", "red")
                    .attr("fontWeight", "bold")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                if (textvalue2 != "single flux") {
                    var lineg2 = lineg.append("g").data([{x: xvalue + width, y: yvalueb + radius * 2}]);
                    linewithlineg2[i] = lineg2.append("line")
                        .attr("id", "linewithlineg2" + tempID)
                        .attr("x1", function (d) {
                            dx1line2[i] = d.x;
                            return d.x;
                        })
                        .attr("y1", function (d) {
                            dy1line2[i] = d.y;
                            return d.y;
                        })
                        .attr("x2", function (d) {
                            dx2line2[i] = d.x + lineLen;
                            return d.x + lineLen;
                        })
                        .attr("y2", function (d) {
                            dy2line2[i] = d.y;
                            return d.y;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 2)
                        .attr("marker-end", "url(#end)")
                        .attr("cursor", "pointer");

                    var linegtext2 = lineg2.append("g").data([{
                        x: xvalue + lineLen + 10 + width, y: yvalueb + radius * 2 + markerHeight
                    }]);
                    linewithtextg2[i] = linegtext2.append("text")
                        .attr("id", "linewithtextg2" + tempID)
                        .attr("x", function (d) {
                            dxtext2[i] = d.x;
                            return d.x;
                        })
                        .attr("y", function (d) {
                            dytext2[i] = d.y;
                            return d.y;
                        })
                        .attr("font-family", "Times New Roman")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "red")
                        .attr("cursor", "pointer")
                        .text(solute_text2);
                }

                // increment y-axis of line and circle
                yvalueb += ydistance;
                cyvalueb += ydistance;
            }

            // case 5
            if ((src_fma == interstitialID && snk_fma == cytosolID) && (textvalue2 == "channel")) {
                var polygong = newg.append("g").data([{x: xvalue - 5 + width, y: yvalueb}]);
                linewithlineg[i] = polygong.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + polygonlineLen;
                        return d.x + polygonlineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-start", "url(#start)")
                    .attr("cursor", "pointer");

                var linegtext = polygong.append("g").data([{x: xvalue - 30 + width, y: yvalueb + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                // Polygon
                circlewithlineg[i] = polygong.append("g").append("polygon")
                    .attr("transform", "translate(" + (xvalue - 5 + width) + "," + (yvalueb - 30) + ")")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", basolateralID)
                    .attr("cx", function (d) {
                        dx[i] = xvalue - 5 + width;
                        return dx[i];
                    })
                    .attr("cy", function (d) {
                        dy[i] = yvalueb - 30;
                        return dy[i];
                    })
                    .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30")
                    .attr("fill", "yellow")
                    .attr("stroke", "black")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                var polygontext = polygong.append("g").data([{x: xvalue + 12 + width, y: yvalueb + 4}]);
                circlewithtext[i] = polygontext.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-size", "10px")
                    .attr("fill", "red")
                    .attr("cursor", "move")
                    .text(mediator_pr_text_syn);

                // increment y-axis of line and circle
                yvalueb += ydistance;
                cyvalueb += ydistance;
            }

            // case 6
            if ((src_fma == cytosolID && snk_fma == interstitialID) && (textvalue2 == "channel")) {
                var polygong = newg.append("g").data([{x: xvalue - 5 + width, y: yvalueb}]);
                linewithlineg[i] = polygong.append("line")
                    .attr("id", "linewithlineg" + tempID)
                    .attr("x1", function (d) {
                        dx1line[i] = d.x;
                        return d.x;
                    })
                    .attr("y1", function (d) {
                        dy1line[i] = d.y;
                        return d.y;
                    })
                    .attr("x2", function (d) {
                        dx2line[i] = d.x + polygonlineLen;
                        return d.x + polygonlineLen;
                    })
                    .attr("y2", function (d) {
                        dy2line[i] = d.y;
                        return d.y;
                    })
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("marker-end", "url(#end)")
                    .attr("cursor", "pointer");

                var linegtext = polygong.append("g").data([{x: xvalue + lineLen + 10 + width, y: yvalueb + 5}]);
                linewithtextg[i] = linegtext.append("text")
                    .attr("id", "linewithtextg" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-family", "Times New Roman")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold")
                    .attr("fill", "red")
                    .attr("cursor", "pointer")
                    .text(solute_text);

                // Polygon
                circlewithlineg[i] = polygong.append("g").append("polygon")
                    .attr("transform", "translate(" + (xvalue - 5 + width) + "," + (yvalueb - 30) + ")")
                    .attr("id", function (d) {
                        if (model_entity2 == "") {
                            src_fma2 = "";
                            snk_fma2 = "";
                            combinedMembrane[i].source_fma2 = "";
                            combinedMembrane[i].sink_fma2 = "";
                        }
                        return [
                            model_entity, model_entity2,
                            textvalue, textvalue2,
                            src_fma, snk_fma, src_fma2, snk_fma2,
                            mediator_fma, mediator_pr,
                            solute_chebi, solute_chebi2, solute_text, solute_text2,
                            mediator_pr_text, mediator_pr_text_syn
                        ];
                    })
                    .attr("index", tempID)
                    .attr("membrane", basolateralID)
                    .attr("cx", function (d) {
                        dx[i] = xvalue - 5 + width;
                        return dx[i];
                    })
                    .attr("cy", function (d) {
                        dy[i] = yvalueb - 30;
                        return dy[i];
                    })
                    .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30")
                    .attr("fill", "yellow")
                    .attr("stroke", "black")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-linejoin", "round")
                    .attr("cursor", "move")
                    .on("mouseover", function () {
                        div.style("display", "inline");
                        div.transition()
                            .duration(200)
                            .style("opacity", 1);

                        var id = d3.select(this)._groups[0][0].id,
                            indexOfComma = id.indexOf(','),
                            tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                                "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                        div.html(
                            '<b>CellML </b> ' +
                            '<a href="' + tempworkspace + '" target="_blank">' +
                            '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>SEDML </b> ' +
                            '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                            '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                            '<br/>' +
                            '<b>Click middle mouse to close</b>')
                            .style("left", d3.mouse(this)[0] + 140 + "px")
                            .style("top", d3.mouse(this)[1] + 90 + "px");
                    });

                var polygontext = polygong.append("g").data([{x: xvalue + 12 + width, y: yvalueb + 4}]);
                circlewithtext[i] = polygontext.append("text")
                    .attr("id", "circlewithtext" + tempID)
                    .attr("x", function (d) {
                        dxtext[i] = d.x;
                        return d.x;
                    })
                    .attr("y", function (d) {
                        dytext[i] = d.y;
                        return d.y;
                    })
                    .attr("font-size", "10px")
                    .attr("fill", "red")
                    .attr("cursor", "move")
                    .text(solute_text);

                // increment y-axis of line and circle
                yvalueb += ydistance;
                cyvalueb += ydistance;
            }
        }

        /*  Paracellular Membrane */
        if (textvalue2 == "diffusive channel") {
            var lineg = newg.append("g").data([{x: xpvalue, y: ypvalue + 5}]);
            circlewithlineg[i] = lineg.append("text") // linewithtextg
                .attr("id", "linewithtextg" + tempID)
                .attr("index", tempID)
                .attr("x", function (d) {
                    dx[i] = d.x; // dxtext
                    return d.x;
                })
                .attr("y", function (d) {
                    dy[i] = d.y; // dytext
                    return d.y;
                })
                .attr("font-family", "Times New Roman")
                .attr("font-size", "12px")
                .attr("font-weight", "bold")
                .attr("fill", "red")
                .attr("cursor", "move")
                .text(solute_text)
                .on("mouseover", function () {
                    div.style("display", "inline");
                    div.transition()
                        .duration(200)
                        .style("opacity", 1);

                    var id = d3.select(this)._groups[0][0].id,
                        indexOfComma = id.indexOf(','),
                        tempworkspace = "https://models.physiomeproject.org/workspace/267" + "/" +
                            "rawfile" + "/" + "HEAD" + "/" + id.slice(0, indexOfComma);

                    div.html(
                        '<b>CellML </b> ' +
                        '<a href="' + tempworkspace + '" target="_blank">' +
                        '<img border="0" alt="CellML" src="img/cellml.png" width="30" height="20"></a>' +
                        '<br/>' +
                        '<b>SEDML </b> ' +
                        '<a href="https://sed-ml.github.io/index.html" target="_blank">' +
                        '<img border="0" alt="SEDML" src="img/SEDML.png" width="30" height="20"></a>' +
                        '<br/>' +
                        '<b>Click middle mouse to close</b>')
                        .style("left", d3.mouse(this)[0] + 140 + "px")
                        .style("top", d3.mouse(this)[1] + 90 + "px");
                });

            var linetextg = lineg.append("g").data([{x: xpvalue + 25, y: ypvalue}]);
            linewithlineg[i] = linetextg.append("line")
                .attr("id", "linewithlineg" + tempID)
                .attr("index", tempID)
                .attr("x1", function (d) {
                    dx1line[i] = d.x;
                    return d.x;
                })
                .attr("y1", function (d) {
                    dy1line[i] = d.y;
                    return d.y;
                })
                .attr("x2", function (d) {
                    dx2line[i] = d.x + pcellLen;
                    return d.x + pcellLen;
                })
                .attr("y2", function (d) {
                    dy2line[i] = d.y;
                    return d.y;
                })
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("marker-end", "url(#end)")
                .attr("cursor", "move");

            ypvalue += ypdistance;
        }
    }

    var initdragcircleandend = function () {
        var membrane = $(cthis).attr("membrane");
        for (var i = 0; i < $("line").length; i++) {
            if ($("line")[i].id == membrane && i == 0) {
                mindex = 1;
                break;
            }
            if ($("line")[i].id == membrane && i == 1) {
                mindex = 0;
                break;
            }
        }

        // console.log("membrane, mindex: ", membrane, mindex);
    }

    function dragcircleline(d) {
        // console.log("this: ", this);
        // console.log("d3.select(this): ", d3.select(this));
        // icircleGlobal = this.getAttribute("index");
        icircleGlobal = $(this).attr("index");

        cthis = this; // remember to debug cthis!!

        // console.log("cthis in dragcircleline: ", cthis);
        // console.log("index: ", icircleGlobal);

        var dx = d3.event.dx;
        var dy = d3.event.dy;

        if ($(this).prop("tagName") == "circle") {
            d3.select(this)
                .attr("cx", parseFloat($(this).prop("cx").baseVal.value) + dx)
                .attr("cy", parseFloat($(this).prop("cy").baseVal.value) + dy);
        }

        if ($(this).prop("tagName") == "text") {
            circlewithlineg[icircleGlobal] // text
                .attr("x", parseFloat(d3.select("#" + "linewithtextg" + icircleGlobal).attr("x")) + dx)
                .attr("y", parseFloat(d3.select("#" + "linewithtextg" + icircleGlobal).attr("y")) + dy);
        }

        if ($(this).prop("tagName") == "polygon") {
            var xNew = [], yNew = [], points = "";
            var pointsLen = d3.select(this)._groups[0][0].points.length;

            for (var i = 0; i < pointsLen; i++) {
                xNew[i] = parseFloat(d3.select(this)._groups[0][0].points[i].x) + dx;
                yNew[i] = parseFloat(d3.select(this)._groups[0][0].points[i].y) + dy;

                points = points.concat("" + xNew[i] + "").concat(",").concat("" + yNew[i] + "");

                if (i != pointsLen - 1)
                    points = points.concat(" ");
            }

            d3.select(this).attr("points", points);
        }

        if (circlewithtext[icircleGlobal] != undefined) {
            // text inside circle
            circlewithtext[icircleGlobal]
                .attr("x", parseFloat(d3.select("#" + "circlewithtext" + icircleGlobal).attr("x")) + dx)
                .attr("y", parseFloat(d3.select("#" + "circlewithtext" + icircleGlobal).attr("y")) + dy);
        }

        if (linewithlineg[icircleGlobal] != undefined) {
            // line 1
            linewithlineg[icircleGlobal]
                .attr("x1", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("x1")) + dx)
                .attr("y1", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("y1")) + dy)
                .attr("x2", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("x2")) + dx)
                .attr("y2", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("y2")) + dy);
        }

        if (linewithtextg[icircleGlobal] != undefined) {
            // text 1
            linewithtextg[icircleGlobal]
                .attr("x", parseFloat(d3.select("#" + "linewithtextg" + icircleGlobal).attr("x")) + dx)
                .attr("y", parseFloat(d3.select("#" + "linewithtextg" + icircleGlobal).attr("y")) + dy);
        }

        if (linewithlineg2[icircleGlobal] != undefined) {
            // line 2
            linewithlineg2[icircleGlobal]
                .attr("x1", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("x1")) + dx)
                .attr("y1", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("y1")) + dy)
                .attr("x2", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("x2")) + dx)
                .attr("y2", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("y2")) + dy);
        }

        if (linewithtextg2[icircleGlobal] != undefined) {
            // text 2
            linewithtextg2[icircleGlobal]
                .attr("x", parseFloat(d3.select("#" + "linewithtextg2" + icircleGlobal).attr("x")) + dx)
                .attr("y", parseFloat(d3.select("#" + "linewithtextg2" + icircleGlobal).attr("y")) + dy);
        }

        // initdragcircleandend();
        for (var i = 0; i < $("line").length; i++) {
            if ($("line")[i].id == $(this).attr("membrane") && i == 0) {
                mindex = 1;
                break;
            }
            if ($("line")[i].id == $(this).attr("membrane") && i == 1) {
                mindex = 0;
                break;
            }
        }

        // If paracellular's diffusive channel Then undefined
        if ($("line")[mindex] != undefined) {
            // detect basolateralMembrane - 0 apical, 1 basolateralMembrane, 3 cell junction
            var lineb_x = $($("line")[mindex]).prop("x1").baseVal.value;
            var lineb_y1 = $($("line")[mindex]).prop("y1").baseVal.value;
            var lineb_y2 = $($("line")[mindex]).prop("y2").baseVal.value;

            var cx, cy;
            if ($(this).prop("tagName") == "circle") {
                cx = $(this).prop("cx").baseVal.value;
                cy = $(this).prop("cy").baseVal.value;
            }

            if ($(this).prop("tagName") == "polygon") {
                cx = event.x;
                cy = event.y;
            }

            var lineb_id = $($("line")[mindex]).prop("id");
            var circle_id = $(this).prop("id");

            // if ((cx >= lineb_x && cx <= lineb_x + 1) &&
            //     (cy >= lineb_y1 && cy <= lineb_y2) && (lineb_id != circle_id)) {
            //     $($("line")[mindex]).css("stroke", "red");

            if ((cx >= lineb_x - radius / 2 && cx <= lineb_x + radius / 2) && (lineb_id != circle_id)) {
                $($("line")[mindex]).css("stroke", "red");

                var tempYvalue;
                if (mindex == 1) tempYvalue = yvalueb;
                else tempYvalue = yvalue;

                // if ((cx >= lineb_x && cx <= lineb_x + 5) &&
                //     (cy >= (tempYvalue + radius) && cy <= (tempYvalue + radius + 5)) && (lineb_id != circle_id)) {
                //     $($("line")[mindex]).css("stroke", "yellow");

                if ((cx >= lineb_x - radius / 2 && cx <= lineb_x + radius / 2) && (lineb_id != circle_id)) {
                    $($("line")[mindex]).css("stroke", "yellow");
                }
            }
            else {
                if (mindex == 1)
                    $($("line")[mindex]).css("stroke", "orange");

                else
                    $($("line")[mindex]).css("stroke", "green");
            }
        }
    }

    function dragcircleendline(d) {
        initdragcircleandend();

        // If paracellular's diffusive channel Then undefined
        if ($("line")[mindex] != undefined) {
            // detect basolateralMembrane - 0 apical, 1 basolateralMembrane, 3 cell junction
            var lineb_x = $($("line")[mindex]).prop("x1").baseVal.value;
            var lineb_y1 = $($("line")[mindex]).prop("y1").baseVal.value;
            var lineb_y2 = $($("line")[mindex]).prop("y2").baseVal.value;

            var cx, cy;
            if ($(cthis).prop("tagName") == "circle") {
                cx = $(cthis).prop("cx").baseVal.value;
                cy = $(cthis).prop("cy").baseVal.value;
            }

            if ($(cthis).prop("tagName") == "polygon") {
                cx = event.x;
                cy = event.y;
            }

            var lineb_id = $($("line")[mindex]).prop("id");
            var circle_id = $(cthis).prop("id");

            // if ((cx >= lineb_x && cx <= lineb_x + 1) &&
            //     (cy >= lineb_y1 && cy <= lineb_y2) && (lineb_id != circle_id)) {

            if ((cx >= lineb_x - radius / 2 && cx <= lineb_x + radius / 2) && (lineb_id != circle_id)) {

                var tempYvalue;
                if (mindex == 1) tempYvalue = yvalueb;
                else tempYvalue = yvalue;

                // if ((cx >= lineb_x && cx <= lineb_x + 5) &&
                //     (cy >= (tempYvalue + radius) && cy <= (tempYvalue + radius + 5)) && (lineb_id != circle_id)) {

                if ((cx >= lineb_x - radius / 2 && cx <= lineb_x + radius / 2) && (lineb_id != circle_id)) {

                    $($("line")[mindex]).css("stroke", "yellow");

                    var m = new welcomeModal({
                        id: 'myWelcomeModal',
                        header: 'Are you sure you want to move?',
                        footer: 'My footer',
                        footerCloseButton: 'No',
                        footerSaveButton: 'Yes'
                    });

                    $('#myWelcomeModal').modal({backdrop: 'static', keyboard: false});
                    m.show();

                    function welcomeModal(options) {
                        var $this = this;

                        options = options ? options : {};
                        $this.options = {};
                        $this.options.header = options.header !== undefined ? options.header : false;
                        $this.options.footer = options.footer !== undefined ? options.footer : false;
                        $this.options.closeButton = options.closeButton !== undefined ? options.closeButton : true;
                        $this.options.footerCloseButton = options.footerCloseButton !== undefined ? options.footerCloseButton : false;
                        $this.options.footerSaveButton = options.footerSaveButton !== undefined ? options.footerSaveButton : false;
                        $this.options.id = options.id !== undefined ? options.id : "myWelcomeModal";

                        /**
                         * Append modal window html to body
                         */
                        $this.createModal = function () {
                            $('body').append('<div id="' + $this.options.id + '" class="modal fade"></div>');
                            $($this.selector).append('<div class="modal-dialog custom-modal"><div class="modal-content"></div></div>');
                            var win = $('.modal-content', $this.selector);

                            if ($this.options.header) {
                                win.append('<div class="modal-header"><h4 class="modal-title" lang="de"></h4></div>');

                                if ($this.options.closeButton) {
                                    win.find('.modal-header').prepend('<button type="button" ' +
                                        'class="close" data-dismiss="modal">&times;</button>');
                                }
                            }

                            if ($this.options.footer) {
                                win.append('<div class="modal-footer"></div>');

                                if ($this.options.footerCloseButton) {
                                    win.find('.modal-footer').append('<a data-dismiss="modal" id="closeID" href="#" ' +
                                        'class="btn btn-default" lang="de">' + $this.options.footerCloseButton + '</a>');
                                }

                                if ($this.options.footerSaveButton) {
                                    win.find('.modal-footer').append('<a data-dismiss="modal" id="saveID" href="#" ' +
                                        'class="btn btn-default" lang="de">' + $this.options.footerSaveButton + '</a>');
                                }
                            }

                            // No button clicked!!
                            $("#closeID").click(function (event) {
                                console.log("No clicked!");
                                console.log("first close button clicked!");

                                moveBack();
                                membraneColorBack();
                            })

                            // Yes button clicked!!
                            $("#saveID").click(function (event) {

                                console.log("Yes clicked!");
                                console.log("first save button clicked!");

                                var m = new Modal({
                                    id: 'myModal',
                                    header: 'Recommender System',
                                    footer: 'My footer',
                                    footerCloseButton: 'Close',
                                    footerSaveButton: 'Save'
                                });

                                $('#myModal').modal({backdrop: 'static', keyboard: false});
                                m.getBody().html('<div id="modalBody"></div>');
                                m.show();

                                showLoading("#modalBody");

                                var circleID = $(cthis).prop("id").split(",");
                                console.log("circleID in myWelcomeModal: ", circleID);

                                // parsing
                                cellmlModel = circleID[0];
                                var indexOfHash = cellmlModel.search("#");
                                cellmlModel = cellmlModel.slice(0, indexOfHash);

                                cellmlModel = cellmlModel + "#" + cellmlModel.slice(0, cellmlModel.indexOf('.'));

                                console.log("cellmlModel: ", cellmlModel);

                                if (circleID[1] != "") {
                                    var query = 'SELECT ?Protein ?Biological_meaning ?Biological_meaning2 ' +
                                        'WHERE { GRAPH ?g { ' +
                                        '<' + cellmlModel + '> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . ' +
                                        '<' + circleID[0] + '> <http://purl.org/dc/terms/description> ?Biological_meaning . ' +
                                        '<' + circleID[1] + '> <http://purl.org/dc/terms/description> ?Biological_meaning2 . ' +
                                        '}}'
                                }
                                else {
                                    var query = 'SELECT ?Protein ?Biological_meaning ?Biological_meaning2 ' +
                                        'WHERE { GRAPH ?g { ' +
                                        '<' + cellmlModel + '> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . ' +
                                        '<' + circleID[0] + '> <http://purl.org/dc/terms/description> ?Biological_meaning . ' +
                                        '}}'
                                }

                                // protein name
                                sendPostRequest(
                                    endpoint,
                                    query,
                                    function (jsonModel) {

                                        console.log("jsonModel: ", jsonModel);

                                        proteinName = jsonModel.results.bindings[0].Protein.value;
                                        var endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" + proteinName;

                                        sendGetRequest(
                                            endpointprOLS,
                                            function (jsonPr) {

                                                if (jsonPr._embedded.terms[0]._links.has_gene_template != undefined)
                                                    var endpointgeneOLS = jsonPr._embedded.terms[0]._links.has_gene_template.href;

                                                sendGetRequest(
                                                    endpointgeneOLS,
                                                    function (jsonGene) {

                                                        if (jsonPr._embedded.terms[0]._links.only_in_taxon != undefined)
                                                            var endpointspeciesOLS = jsonPr._embedded.terms[0]._links.only_in_taxon.href;

                                                        sendGetRequest(
                                                            endpointspeciesOLS,
                                                            function (jsonSpecies) {

                                                                proteinText = jsonPr._embedded.terms[0].label;
                                                                var indexOfParen = proteinText.indexOf('(');
                                                                proteinText = proteinText.slice(0, indexOfParen - 1);
                                                                biological_meaning = jsonModel.results.bindings[0].Biological_meaning.value;

                                                                if (circleID[1] != "")
                                                                    biological_meaning2 = jsonModel.results.bindings[0].Biological_meaning2.value;
                                                                else
                                                                    biological_meaning2 = "";

                                                                speciesName = jsonSpecies._embedded.terms[0].label;
                                                                geneName = jsonGene._embedded.terms[0].label;
                                                                var indexOfParen = geneName.indexOf('(');
                                                                geneName = geneName.slice(0, indexOfParen - 1);

                                                                var query = 'SELECT ?cellmlmodel ' +
                                                                    'WHERE { GRAPH ?g { ' +
                                                                    '?cellmlmodel <http://www.obofoundry.org/ro/ro.owl#modelOf> <' + proteinName + '> . ' +
                                                                    '}}'

                                                                sendPostRequest(
                                                                    endpoint,
                                                                    query,
                                                                    function (jsonCellmlModel) {

                                                                        console.log("jsonCellmlModel: ", jsonCellmlModel);

                                                                        var query = 'SELECT ?located_in ' +
                                                                            'WHERE { GRAPH ?g { ' +
                                                                            '<' + cellmlModel + '> <http://www.obofoundry.org/ro/ro.owl#located_in> ?located_in . ' +
                                                                            '}}'

                                                                        // location of that cellml model
                                                                        sendPostRequest(
                                                                            endpoint,
                                                                            query,
                                                                            function (jsonLocatedin) {

                                                                                console.log("jsonLocatedin: ", jsonLocatedin);

                                                                                var counter = 0;
                                                                                // Type of model - kidney, lungs, etc
                                                                                for (var i = 0; i < jsonLocatedin.results.bindings.length; i++) {
                                                                                    for (var j = 0; j < organ.length; j++) {
                                                                                        for (var k = 0; k < organ[j].key.length; k++) {
                                                                                            if (jsonLocatedin.results.bindings[i].located_in.value == organ[j].key[k].key)
                                                                                                counter++;

                                                                                            if (counter == jsonLocatedin.results.bindings.length) {
                                                                                                typeOfModel = organ[j].value;
                                                                                                organIndex = j;
                                                                                                break;
                                                                                            }
                                                                                        }
                                                                                        if (counter == jsonLocatedin.results.bindings.length)
                                                                                            break;
                                                                                    }
                                                                                    if (counter == jsonLocatedin.results.bindings.length)
                                                                                        break;
                                                                                }

                                                                                loc = "";
                                                                                counter = 0;
                                                                                // get locations of the above type of model
                                                                                for (var i = 0; i < jsonLocatedin.results.bindings.length; i++) {
                                                                                    for (var j = 0; j < organ[organIndex].key.length; j++) {
                                                                                        if (jsonLocatedin.results.bindings[i].located_in.value == organ[organIndex].key[j].key) {
                                                                                            loc += organ[organIndex].key[j].value;

                                                                                            if (i == jsonLocatedin.results.bindings.length - 1)
                                                                                                loc += ".";
                                                                                            else
                                                                                                loc += ", ";

                                                                                            counter++;
                                                                                        }
                                                                                        if (counter == jsonLocatedin.results.bindings.length)
                                                                                            break;
                                                                                    }
                                                                                    if (counter == jsonLocatedin.results.bindings.length)
                                                                                        break;
                                                                                }

                                                                                // related cellml model, i.e. kidney, lungs, etc
                                                                                var query = 'SELECT ?cellmlmodel ?located_in ' +
                                                                                    'WHERE { GRAPH ?g { ' +
                                                                                    '?cellmlmodel <http://www.obofoundry.org/ro/ro.owl#located_in> ?located_in. ' +
                                                                                    '}}'

                                                                                sendPostRequest(
                                                                                    endpoint,
                                                                                    query,
                                                                                    function (jsonRelatedModel) {

                                                                                        console.log("jsonRelatedModel: ", jsonRelatedModel);

                                                                                        for (var i = 0; i < jsonRelatedModel.results.bindings.length; i++) {
                                                                                            for (var j = 0; j < organ[organIndex].key.length; j++) {
                                                                                                if (jsonRelatedModel.results.bindings[i].located_in.value == organ[organIndex].key[j].key) {
                                                                                                    // parsing
                                                                                                    var tempModel = jsonRelatedModel.results.bindings[i].cellmlmodel.value;
                                                                                                    var indexOfHash = tempModel.search("#");
                                                                                                    tempModel = tempModel.slice(0, indexOfHash);

                                                                                                    relatedModel.push(tempModel);

                                                                                                    break;
                                                                                                }
                                                                                            }
                                                                                        }

                                                                                        relatedModel = uniqueify(relatedModel);

                                                                                        // kidney, lungs, heart, etc
                                                                                        console.log("relatedModel: ", relatedModel);

                                                                                        console.log("jsonCellmlModel: ", jsonCellmlModel);

                                                                                        var alternativeCellmlArray = [],
                                                                                            cellmlModel2 = cellmlModel,
                                                                                            indexOfHash = cellmlModel2.search("#");
                                                                                        cellmlModel2 = cellmlModel2.slice(0, indexOfHash);
                                                                                        for (var i = 0; i < relatedModel.length; i++) {
                                                                                            if (relatedModel[i] != cellmlModel2) {
                                                                                                alternativeCellmlArray.push(relatedModel[i]);
                                                                                            }
                                                                                        }

                                                                                        relatedCellmlModel(
                                                                                            relatedModel,
                                                                                            alternativeCellmlArray,
                                                                                            $(cthis).attr("membrane")
                                                                                        );

                                                                                    }, true);
                                                                            }, true);
                                                                    }, true)
                                                            },
                                                            true);
                                                    },
                                                    true);

                                            }, true);

                                    }, true);

                                jQuery(window).trigger('resize');
                            })
                        };

                        /**
                         * Set header text. It makes sense only if the options.header is logical true.
                         * @param {String} html New header text.
                         */
                        $this.setHeader = function (html) {
                            $this.window.find('.modal-title').html(html);
                        };

                        /**
                         * Show modal window
                         */
                        $this.show = function () {
                            $this.window.modal('show');
                        };

                        $this.selector = "#" + $this.options.id;
                        if (!$($this.selector).length) {
                            $this.createModal();
                        }

                        $this.window = $($this.selector);
                        $this.setHeader($this.options.header);
                    }
                }
                else {
                    moveBack();

                    if (mindex == 1)
                        linebasolateral.transition().delay(1000).duration(1000).style("stroke", "orange");
                    else
                        lineapical.transition().delay(1000).duration(1000).style("stroke", "green");
                }
            }
            else {
                if (mindex == 1)
                    $($("line")[mindex]).css("stroke", "orange");
                else
                    $($("line")[mindex]).css("stroke", "green");
            }
        }
    }

    function dragcircleunchecked(d) {
        d3.select(this).classed("dragging", false);
    }

    // related kidney, lungs, etc model
    var relatedCellmlModel = function (relatedModel, alternativeCellmlArray, membrane) {

        var indexOfcellml = relatedModel[idProtein].search(".cellml");
        var modelname = relatedModel[idProtein].slice(0, indexOfcellml);

        modelname = relatedModel[idProtein] + "#" + modelname;

        var query = 'SELECT ?Protein ?workspaceName ' +
            'WHERE { GRAPH ?workspaceName { ' +
            '<' + modelname + '> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . ' +
            '}}'

        sendPostRequest(
            endpoint,
            query,
            function (jsonProtein) {

                if (jsonProtein.results.bindings.length == 0) {
                    idProtein++;
                    relatedCellmlModel(relatedModel, alternativeCellmlArray, membrane);
                }

                // console.log("jsonProtein.results.bindings: ", jsonProtein.results.bindings);
                var endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" +
                    jsonProtein.results.bindings[0].Protein.value;

                sendGetRequest(
                    endpointprOLS,
                    function (jsonPr) {

                        if (jsonProtein.results.bindings.length != 0) {
                            // relatedModelValue.push(jsonProtein.results.bindings[0].Protein.value);
                            relatedModelValue.push({
                                protein: jsonProtein.results.bindings[0].Protein.value,
                                prname: jsonPr._embedded.terms[0].label
                            });
                            relatedModelID.push(relatedModel[idProtein]);
                            workspaceName = jsonProtein.results.bindings[0].workspaceName.value;
                        }

                        idProtein++;

                        if (idProtein == relatedModel.length) {
                            idProtein = 0;

                            // console.log("alternativeCellmlArray Before: ", alternativeCellmlArray, membrane);

                            alternativeCellmlModel(alternativeCellmlArray, membrane);
                            return;
                        }

                        relatedCellmlModel(relatedModel, alternativeCellmlArray, membrane);
                    },
                    true);
            },
            true);
    }

    // alternative model of a dragged transporter, e.g. rat NHE3, mouse NHE3
    var alternativeCellmlModel = function (alternativeCellmlArray, membrane) {

        // console.log("alternativeCellmlArray: ", alternativeCellmlArray[idAltProtein], membrane, alternativeCellmlArray);
        var modelname;
        if (alternativeCellmlArray[idAltProtein] == undefined) {
            modelname = undefined;
        }
        else {
            var indexOfcellml = alternativeCellmlArray[idAltProtein].search(".cellml");
            modelname = alternativeCellmlArray[idAltProtein].slice(0, indexOfcellml);
            modelname = alternativeCellmlArray[idAltProtein] + "#" + modelname;
        }

        // console.log("modelname: ", modelname);

        var query = 'SELECT ?Protein ?workspaceName ' +
            'WHERE { GRAPH ?workspaceName { ' +
            '<' + modelname + '> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . ' +
            '}}'

        sendPostRequest(
            endpoint,
            query,
            function (jsonAltProtein) {
                // console.log("jsonAltProtein: ", jsonAltProtein);
                // console.log("jsonAltProtein OUTSIDE: ", jsonAltProtein);

                var flagvar = true;

                if (jsonAltProtein.results.bindings.length != 0) {
                    if (jsonAltProtein.results.bindings[0].Protein.value == proteinName) {

                        // console.log("jsonAltProtein INSIDE: ", jsonAltProtein);
                        console.log("jsonAltProtein INSIDE: ", jsonAltProtein.results.bindings[0].Protein.value);

                        flagvar = false;

                        var callOLS = function () {

                            // console.log("jsonAltProtein INSIDE callOLS: ", jsonAltProtein);

                            workspaceName = jsonAltProtein.results.bindings[0].workspaceName.value;
                            var pruri = jsonAltProtein.results.bindings[0].Protein.value;
                            var workspaceuri = workspaceName + "/" + "rawfile" + "/" + "HEAD" + "/" + alternativeCellmlArray[idAltProtein];

                            var endpointOLS = "https://www.ebi.ac.uk/ols/api/ontologies/pr/terms?iri=" + pruri;

                            sendGetRequest(
                                endpointOLS,
                                function (jsonOLSObj) {
                                    var label = document.createElement('label');
                                    label.innerHTML = '<br><input id="' + alternativeCellmlArray[idAltProtein] + '" ' +
                                        'type="checkbox" value="' + alternativeCellmlArray[idAltProtein] + '">' +
                                        '<a href="' + workspaceuri + '" target="_blank" ' +
                                        'data-toggle="tooltip" data-placement="right" ' +
                                        'title="' + pruri + '">' + jsonOLSObj._embedded.terms[0].label + '</a></label>';

                                    altCellmlModel += label.innerHTML;

                                    flagvar = true;

                                    // console.log("jsonAltProtein INSIDE sendGetRequest: ", jsonAltProtein);

                                    idAltProtein++;

                                    if (idAltProtein == alternativeCellmlArray.length) {

                                        // If apical Then basolateral and vice versa
                                        var membraneName;
                                        if (membrane == apicalID) {
                                            membrane = basolateralID;
                                            membraneName = "Basolateral membrane";
                                        }
                                        else {
                                            membrane = apicalID;
                                            membraneName = "Apical membrane";
                                        }

                                        // TODO: make it dynamic
                                        if (workspaceName == "") {
                                            relatedMembrane(267, membrane, membraneName);
                                            return;
                                        }
                                        else {
                                            relatedMembrane(workspaceName, membrane, membraneName);
                                            return;
                                        }
                                    }

                                    alternativeCellmlModel(alternativeCellmlArray, membrane);
                                },
                                true);
                        }

                        callOLS();
                    }
                }

                if (flagvar == true) {
                    idAltProtein++;

                    if (idAltProtein == alternativeCellmlArray.length) {

                        idAltProtein = 0;

                        // If apical Then basolateral and vice versa
                        var membraneName;
                        if (membrane == apicalID) {
                            membrane = basolateralID;
                            membraneName = "Basolateral membrane";
                        }
                        else {
                            membrane = apicalID;
                            membraneName = "Apical membrane";
                        }

                        // TODO: make it dynamic
                        if (workspaceName == "") {
                            relatedMembrane(267, membrane, membraneName);
                            return;
                        }
                        else {
                            relatedMembrane(workspaceName, membrane, membraneName);
                            return;
                        }
                    }

                    alternativeCellmlModel(alternativeCellmlArray, membrane);
                }
            }, true);
    }

    // existing apical or basolateral membrane in PMR
    var relatedMembrane = function (workspaceName, membrane, membraneName) {

        console.log("relatedMembrane: ", workspaceName, membrane, membraneName);
        console.log("CHEBI: ", $(cthis).prop("id").split(","));
        // TODO: change arrow and variable name in epithelial platform
        if ($(cthis).prop("id").split(",")[11] == "") { // single flux
            var query = 'PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>' +
                'PREFIX dcterms: <http://purl.org/dc/terms/>' +
                'SELECT ?cellmlmodel ?Model_entity ' +
                'WHERE { GRAPH ?g { ' +
                '?cellmlmodel <http://www.obofoundry.org/ro/ro.owl#located_in> <' + membrane + '>. ' +
                '?entity semsim:hasPhysicalDefinition <' + $(cthis).prop("id").split(",")[10] + '>. ' +
                '?source semsim:hasPhysicalEntityReference ?entity. ' +
                '?process semsim:hasSourceParticipant ?source. ' +
                '?property semsim:physicalPropertyOf ?process. ' +
                '?Model_entity semsim:isComputationalComponentFor ?property.' +
                '}}';
        }
        else { // cotransporter
            var query = 'PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>' +
                'PREFIX dcterms: <http://purl.org/dc/terms/>' +
                'SELECT ?cellmlmodel ?Model_entity ?Model_entity2 ' +
                'WHERE { GRAPH ?g { ' +
                '?cellmlmodel <http://www.obofoundry.org/ro/ro.owl#located_in> <' + membrane + '>. ' +
                '?entity semsim:hasPhysicalDefinition <' + $(cthis).prop("id").split(",")[10] + '>. ' +
                '?source semsim:hasPhysicalEntityReference ?entity. ' +
                '?process semsim:hasSourceParticipant ?source. ' +
                '?property semsim:physicalPropertyOf ?process. ' +
                '?Model_entity semsim:isComputationalComponentFor ?property.' +
                '?entity2 semsim:hasPhysicalDefinition <' + $(cthis).prop("id").split(",")[11] + '>. ' +
                '?source2 semsim:hasPhysicalEntityReference ?entity2. ' +
                '?process2 semsim:hasSourceParticipant ?source2. ' +
                '?property2 semsim:physicalPropertyOf ?process2. ' +
                '?Model_entity2 semsim:isComputationalComponentFor ?property2.' +
                '}}';
        }

        sendPostRequest(
            endpoint,
            query,
            function (jsonRelatedMembrane) {

                console.log("jsonRelatedMembrane: ", jsonRelatedMembrane);

                var cellmlmodelList = [], modelentityList = [], tempmembraneModel = [];
                for (var i = 0; i < jsonRelatedMembrane.results.bindings.length; i++) {
                    var kModel = jsonRelatedMembrane.results.bindings[i].cellmlmodel.value;
                    var indexOfHash = kModel.search("#");
                    kModel = kModel.slice(0, indexOfHash);
                    cellmlmodelList.push(kModel);

                    modelentityList.push(jsonRelatedMembrane.results.bindings[i].Model_entity.value);

                    if ($(cthis).prop("id").split(",")[11] != "") { // cotransporter
                        modelentityList.push(jsonRelatedMembrane.results.bindings[i].Model_entity2.value);
                    }
                }

                cellmlmodelList = uniqueify(cellmlmodelList);
                modelentityList = uniqueify(modelentityList);

                // console.log("cellmlmodelList: ", cellmlmodelList);
                // console.log("modelentityList: ", modelentityList);

                for (var i = 0; i < cellmlmodelList.length; i++) {
                    for (var j = 0; j < modelentityList.length; j++) {
                        var kModel = modelentityList[j];
                        var indexOfHash = kModel.search("#");
                        kModel = kModel.slice(0, indexOfHash);

                        if (cellmlmodelList[i] == kModel) {
                            if (membraneModel.length == 0) {
                                membraneModel.push(modelentityList[j]);
                                tempmembraneModel.push(kModel);
                                break;
                            }
                            else {
                                var flag = false;
                                for (var m = 0; m < tempmembraneModel.length; m++) {
                                    if (tempmembraneModel[m] == kModel) {
                                        flag = true;
                                        break;
                                    }
                                }

                                if (flag == false) {
                                    membraneModel.push(modelentityList[j]);
                                    break;
                                }
                            }
                        }
                    }
                }

                // membraneModel = uniqueify(membraneModel);
                // console.log("membraneModel: ", membraneModel);

                relatedMembraneModel(workspaceName, membraneName);

            },
            true);
    }

    var showModalWindow = function (workspaceName, membraneName) {
        idMembrane = 0;

        var msg2 = "<p><b>" + proteinText + "</b> is a <b>" + typeOfModel + "</b> model. It is located in " +
            "<b>" + loc + "</b><\p>";

        var workspaceuri = "https://models.physiomeproject.org/workspace/267" + "/" +
            "rawfile" + "/" + "HEAD" + "/" + $(cthis).prop("id").split(",")[0];

        var model = "<b>Model: </b><a href='" + workspaceuri + "' target='_blank " +
            "data-toggle='tooltip' data-placement='right' " +
            "title='" + proteinText + "'>" + $(cthis).prop("id").split(",")[0] + "</a>";

        var biological = "<p><b>Biological Meaning: </b>" + biological_meaning + "</p>";

        if (biological_meaning2 != "")
            biological += "<p>" + biological_meaning2 + "</p>";

        var species = "<p><b>Species: </b>" + speciesName + "</p>";
        var gene = "<p><b>Gene: </b>" + geneName + "</p>";
        var protein = "<p data-toggle='tooltip' data-placement='right' title='" + proteinName + "'>" +
            "<b>Protein: </b>" + proteinText + "</p>";

        // Related apical or basolateral model
        var dataJSON = [];
        d3.json("protein_alignment.json", function (data) {
            for (var i = 0; i < data.length; i++) {
                dataJSON.push({
                    pid1: data[i].pid1,
                    pid2: data[i].pid2,
                    name1: data[i].name1,
                    name2: data[i].name2,
                    uri1: data[i].uri1,
                    uri2: data[i].uri2,
                    similar: data[i].similar
                })
            }

            console.log("dataJSON: ", dataJSON);

            for (var m = 0; m < membraneModelValue.length; m++) {
                for (var n = 0; n < dataJSON.length; n++) {
                    if (membraneModelValue[m].uri1 == dataJSON[n].uri1 &&
                        membraneModelValue[m].uri2 == dataJSON[n].uri2) {
                        membraneModelValue[m].similar = dataJSON[n].similar;
                    }
                }
            }

            console.log("membraneModelValue: ", membraneModelValue);

            // Descending sorting
            membraneModelValue.sort(function (a, b) {
                return b.similar - a.similar;
            });

            console.log("AFTER membraneModelValue: ", membraneModelValue);

            var membraneTransporter = "<p><b>" + membraneName + " model</b>";
            if (membraneModelValue.length == 0) {
                membraneTransporter += "<br>Not Exist";
            }
            else {
                for (var i = 0; i < membraneModelValue.length; i++) {
                    var workspaceuri = workspaceName + "/" + "rawfile" + "/" + "HEAD" + "/" + membraneModelID[i][0];

                    var label = document.createElement('label');
                    label.innerHTML = '<br><input id="' + membraneModelID[i] + '" ' +
                        'type="checkbox" value="' + membraneModelValue[i].prname + '">' +
                        '<a href="' + workspaceuri + '" target="_blank" ' +
                        'data-toggle="tooltip" data-placement="right" ' +
                        'title="' + membraneModelValue[i].protein + '">' + membraneModelValue[i].prname + '</a></label>';

                    membraneTransporter += label.innerHTML;
                }
            }

            // Alternative model
            var alternativeModel = "<p><b>Alternative model of " + proteinText + "</b>";
            // console.log("Alternative model: ", altCellmlModel);
            if (altCellmlModel == "") {
                alternativeModel += "<br>Not Exist";
            }
            else {
                alternativeModel += "</b>" + altCellmlModel + "</p>";
            }

            // related organ models (kidney, lungs, etc) in PMR
            var relatedOrganModels = "<p><b>" + typeOfModel + " model in PMR</b>";
            // console.log("related kidney model: ", relatedModelValue, relatedOrganModels);
            if (relatedModelValue.length == 1) { // includes own protein name
                relatedOrganModels += "<br>Not Exist";
            }
            else {
                for (var i = 0; i < relatedModelValue.length; i++) {

                    if (proteinName == relatedModelValue[i].protein)
                        continue;

                    var workspaceuri = workspaceName + "/" + "rawfile" + "/" + "HEAD" + "/" + relatedModelID[i];

                    var label = document.createElement('label');
                    label.innerHTML = '<br><a href="' + workspaceuri + '" target="_blank" ' +
                        'data-toggle="tooltip" data-placement="right" ' +
                        'title="' + relatedModelValue[i].protein + '">' + relatedModelValue[i].prname + '' +
                        '</a></label>';

                    relatedOrganModels += label.innerHTML;
                }
            }

            $('#modalBody').empty();

            $('#modalBody')
                .append(msg2)
                .append(model)
                .append(biological)
                .append(species)
                .append(gene)
                .append(protein);

            var msg3 = "<br><p><b>Recommendations/suggestions based on existing models in PMR<b><\p>";

            $('#modalBody')
                .append(msg3)
                .append(membraneTransporter)
                .append(alternativeModel)
                .append(relatedOrganModels);

            console.log("outside modelbody!");

            reinitVariable();
        })

        // return;
    }

    var relatedMembraneModel = function (workspaceName, membraneName) {

        var tempmembraneModel;
        if (membraneModel.length == 0)
            tempmembraneModel = undefined;
        else {
            if (membraneModel[idMembrane] != undefined) {
                var indexOfHash = membraneModel[idMembrane].search("#");
                tempmembraneModel = membraneModel[idMembrane].slice(0, indexOfHash);
            }

            var indexOfcellml = tempmembraneModel.search(".cellml");
            var modelname = tempmembraneModel.slice(0, indexOfcellml);

            tempmembraneModel = tempmembraneModel + "#" + modelname;
        }

        // console.log("tempmembraneModel: ", tempmembraneModel);
        // console.log("membraneModel: ", membraneModel);

        var query = 'PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>' +
            'PREFIX dcterms: <http://purl.org/dc/terms/>' +
            'SELECT ?Protein ' +
            'WHERE { ' +
            '<' + tempmembraneModel + '> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . ' +
            '}'

        sendPostRequest(
            endpoint,
            query,
            function (jsonRelatedMembraneModel) {

                console.log("jsonRelatedMembraneModel: ", jsonRelatedMembraneModel);

                var endpointprOLS;
                if (jsonRelatedMembraneModel.results.bindings.length == 0) {
                    showModalWindow(workspaceName, membraneName);
                    return;
                } else {
                    endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" +
                        jsonRelatedMembraneModel.results.bindings[0].Protein.value;
                }

                sendGetRequest(
                    endpointprOLS,
                    function (jsonPr) {

                        var query = 'PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>' +
                            'PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>' +
                            'SELECT ?source_fma ?sink_fma ?med_entity_uri ' +
                            'WHERE { ' +
                            '<' + membraneModel[idMembrane] + '> semsim:isComputationalComponentFor ?model_prop. ' +
                            '?model_prop semsim:physicalPropertyOf ?model_proc. ' +
                            '?model_proc semsim:hasSourceParticipant ?model_srcparticipant. ' +
                            '?model_srcparticipant semsim:hasPhysicalEntityReference ?source_entity. ' +
                            '?source_entity ro:part_of ?source_part_of_entity. ' +
                            '?source_part_of_entity semsim:hasPhysicalDefinition ?source_fma. ' +
                            '?model_proc semsim:hasSinkParticipant ?model_sinkparticipant. ' +
                            '?model_sinkparticipant semsim:hasPhysicalEntityReference ?sink_entity. ' +
                            '?sink_entity ro:part_of ?sink_part_of_entity. ' +
                            '?sink_part_of_entity semsim:hasPhysicalDefinition ?sink_fma.' +
                            '?model_proc semsim:hasMediatorParticipant ?model_medparticipant.' +
                            '?model_medparticipant semsim:hasPhysicalEntityReference ?med_entity.' +
                            '?med_entity semsim:hasPhysicalDefinition ?med_entity_uri.' +
                            '}'

                        sendPostRequest(
                            endpoint,
                            query,
                            function (jsonObjFlux) {
                                console.log("jsonObjFlux: ", jsonObjFlux);

                                if (jsonRelatedMembraneModel.results.bindings.length != 0) {

                                    membraneModelValue.push({
                                        protein: jsonRelatedMembraneModel.results.bindings[0].Protein.value,
                                        prname: jsonPr._embedded.terms[0].label,
                                        // uri1 is the dragged circle
                                        uri1: combinedMembrane[0].med_pr,
                                        medfma: combinedMembrane[0].med_fma,
                                        similar: 0 // initial percent
                                    });
                                    // membraneModeID.push(membraneModel[idMembrane]);

                                    membraneObject.push({
                                        source_fma: jsonObjFlux.results.bindings[0].source_fma.value,
                                        sink_fma: jsonObjFlux.results.bindings[0].sink_fma.value,
                                        med_fma: jsonObjFlux.results.bindings[0].med_entity_uri.value
                                    });

                                    var circleID = $(cthis).prop("id").split(",");
                                    var indexOfHash = membraneModel[idMembrane].search("#"),
                                        srctext = membraneModel[idMembrane].slice(indexOfHash + 1),
                                        indexOfdot = srctext.indexOf('.');

                                    srctext = srctext.slice(indexOfdot + 1);

                                    var tempjsonObjFlux = uniqueifyjsonFlux(jsonObjFlux.results.bindings);

                                    console.log("tempjsonObjFlux: ", tempjsonObjFlux, circleID);

                                    var temp_med_pr;
                                    if (jsonObjFlux.results.bindings[1] == undefined)
                                        temp_med_pr = undefined;
                                    else
                                        temp_med_pr = jsonObjFlux.results.bindings[1].med_entity_uri.value;

                                    var sourcefma2, sinkfma2;
                                    if (circleID[1] == "") {
                                        sourcefma2 = "";
                                        sinkfma2 = "";
                                    }
                                    else {
                                        sourcefma2 = tempjsonObjFlux[0].source_fma.value;
                                        sinkfma2 = tempjsonObjFlux[0].sink_fma.value;
                                    }

                                    membraneModelID.push([
                                        membraneModel[idMembrane], // model_entity
                                        circleID[1], // model_entity2
                                        srctext, // variable_text
                                        circleID[3], // variable_text2
                                        tempjsonObjFlux[0].source_fma.value,
                                        tempjsonObjFlux[0].sink_fma.value,
                                        sourcefma2,
                                        sinkfma2,
                                        jsonObjFlux.results.bindings[0].med_entity_uri.value, // med_fma
                                        temp_med_pr, // med_pr
                                        circleID[10], // solute_chebi
                                        circleID[11], // solute_chebi2
                                        circleID[12], //solute_text
                                        circleID[13], //solute_text2,
                                        circleID[14], //med_pr_text,
                                        circleID[15] //med_pr_text_syn
                                    ]);
                                }

                                // console.log("membraneObject: ", membraneObject);
                                // console.log("idMembrane: ", idMembrane);
                                // console.log("membraneModel.length: ", membraneModel.length);
                                console.log("membraneModelID: ", membraneModelID);

                                if (membraneModel[idMembrane] != undefined)
                                    idMembrane++;

                                if (idMembrane == membraneModel.length) {
                                    showModalWindow(workspaceName, membraneName);
                                    return;
                                }

                                relatedMembraneModel(workspaceName, membraneName);

                            }, true);
                    },
                    true);
            },
            true);
    }

    // utility function
    var moveBack = function () {
        if (linewithlineg[icircleGlobal] != undefined) {
            linewithlineg[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("x1", dx1line[icircleGlobal])
                .attr("y1", dy1line[icircleGlobal])
                .attr("x2", dx2line[icircleGlobal])
                .attr("y2", dy2line[icircleGlobal]);
        }

        if (linewithtextg[icircleGlobal] != undefined) {
            linewithtextg[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("x", dxtext[icircleGlobal])
                .attr("y", dytext[icircleGlobal]);
        }

        if (circlewithlineg[icircleGlobal]._groups[0][0].tagName == "polygon") {
            circlewithlineg[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("transform", "translate(" + dx[icircleGlobal] + "," + dy[icircleGlobal] + ")")
                .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30");
        }

        if (circlewithlineg[icircleGlobal]._groups[0][0].tagName == "circle") {
            circlewithlineg[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("cx", dx[icircleGlobal])
                .attr("cy", dy[icircleGlobal]);
        }

        // text inside circle
        if (circlewithtext[icircleGlobal] != undefined) {
            circlewithtext[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("x", dx[icircleGlobal] - 15)
                .attr("y", dy[icircleGlobal] + 23);
        }

        if (linewithlineg2[icircleGlobal] != undefined) {
            linewithlineg2[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("x1", dx1line2[icircleGlobal])
                .attr("y1", dy1line2[icircleGlobal])
                .attr("x2", dx2line2[icircleGlobal])
                .attr("y2", dy2line2[icircleGlobal]);
        }

        if (linewithtextg2[icircleGlobal] != undefined) {
            linewithtextg2[icircleGlobal]
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("x", dxtext2[icircleGlobal])
                .attr("y", dytext2[icircleGlobal]);
        }
    }

    // utility function
    var membraneColorBack = function () {
        for (var i = 0; i < $("line").length; i++) {
            if ($("line")[i].id == $(cthis).attr("membrane") && i == 0) {
                linebasolateral
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .style("stroke", "orange");

                yvalueb += ydistance;
                break;
            }
            if ($("line")[i].id == $(this).attr("membrane") && i == 1) {
                lineapical
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .style("stroke", "green");

                yvalue += ydistance;
                break;
            }
        }
    }

    var circleRearrange = function () {
        // initial values for apical
        var cyinitial = 213.3333282470703,
            dy1lineinitial = 193.3333282470703,
            dy1lineinitial2 = 233.3333282470703,
            dytextinitial = 198.3333282470703,
            dytextinitial2 = 237.3333282470703;
        for (var i = 0; i < circlewithlineg.length; i++) {
            if (circlewithlineg[i].attr("membrane") == apicalID) {
                // line 1
                dy1line[i] = dy1lineinitial;
                dy2line[i] = dy1lineinitial;
                linewithlineg[i]
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr("y1", dy1line[i])
                    .attr("y2", dy2line[i])

                // text 1
                dytext[i] = dytextinitial;
                linewithtextg[i]
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr("y", dytext[i])

                if (linewithlineg2[i] != undefined) {

                    console.log("apical !!!");

                    // line 2
                    dy1line2[i] = dy1lineinitial2;
                    dy2line2[i] = dy1lineinitial2;
                    linewithlineg2[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y1", dy1line2[i])
                        .attr("y2", dy2line2[i])

                    // text 2
                    dytext2[i] = dytextinitial2;
                    linewithtextg2[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y", dytext2[i])
                }

                if (circlewithlineg[i]._groups[0][0].tagName == "circle") {
                    dy[i] = cyinitial;
                    circlewithlineg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("cy", dy[i]);
                }

                if (circlewithlineg[i]._groups[0][0].tagName == "polygon") {
                    dy[i] = cyinitial;
                    circlewithlineg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("transform", "translate(" + dx[i] + "," + dy[i] + ")")
                        .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30");
                }

                cyinitial += ydistance;
                dy1lineinitial += ydistance;
                dy1lineinitial2 += ydistance;
                dytextinitial += ydistance;
                dytextinitial2 += ydistance;
            }
        }

        // initial values for basolateral
        var cyinitialb = 213.3333282470703,
            dy1lineinitialb = 193.3333282470703,
            dy1lineinitialb2 = 233.3333282470703,
            dytextinitialb = 198.3333282470703,
            dytextinitialb2 = 237.3333282470703;
        for (var i = 0; i < circlewithlineg.length; i++) {
            if (circlewithlineg[i].attr("membrane") == basolateralID) {
                // line 1
                dy1line[i] = dy1lineinitialb;
                dy2line[i] = dy1lineinitialb;
                linewithlineg[i]
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr("y1", dy1line[i])
                    .attr("y2", dy2line[i])

                // text 1
                dytext[i] = dytextinitialb;
                linewithtextg[i]
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr("y", dytext[i])

                if (linewithlineg2[i] != undefined) {
                    // line 2
                    dy1line2[i] = dy1lineinitialb2;
                    dy2line2[i] = dy1lineinitialb2;
                    linewithlineg2[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y1", dy1line2[i])
                        .attr("y2", dy2line2[i])

                    // text 2
                    dytext2[i] = dytextinitialb2;
                    linewithtextg2[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y", dytext2[i])
                }

                if (circlewithlineg[i]._groups[0][0].tagName == "circle") {
                    dy[i] = cyinitialb;
                    circlewithlineg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("cy", dy[i]);
                }

                if (circlewithlineg[i]._groups[0][0].tagName == "polygon") {
                    dy[i] = cyinitialb;
                    circlewithlineg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("transform", "translate(" + dx[i] + "," + dy[i] + ")")
                        .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30");
                }

                // decrement y-axis of line and circle
                cyinitialb += ydistance;
                dy1lineinitialb += ydistance;
                dy1lineinitialb2 += ydistance;
                dytextinitialb += ydistance;
                dytextinitialb2 += ydistance;
            }
        }
    }

    var reinitVariable = function () {
        // Reinitialise to store fluxes/models in next iteration
        idProtein = 0;
        idAltProtein = 0;
        idMembrane = 0;

        membraneModelValue = [];
        altCellmlModel = "";
        relatedModelValue = [];

        relatedModel = [];
        relatedModelID = [];
        workspaceName = "";
        membraneModel = [];
        membraneModelID = [];
        membraneObject = [];
    }

    var Modal = function (options) {
        var $this = this;

        options = options ? options : {};
        $this.options = {};
        $this.options.header = options.header !== undefined ? options.header : false;
        $this.options.footer = options.footer !== undefined ? options.footer : false;
        $this.options.closeButton = options.closeButton !== undefined ? options.closeButton : true;
        $this.options.footerCloseButton = options.footerCloseButton !== undefined ? options.footerCloseButton : false;
        $this.options.footerSaveButton = options.footerSaveButton !== undefined ? options.footerSaveButton : false;
        $this.options.id = options.id !== undefined ? options.id : "myModal";

        /**
         * Append modal window html to body
         */
        $this.createModal = function () {
            $('body').append('<div id="' + $this.options.id + '" class="modal fade"></div>');
            $($this.selector).append('<div class="modal-dialog custom-modal"><div class="modal-content"></div></div>');
            var win = $('.modal-content', $this.selector);

            var someText = "A recommender system or a recommendation system (sometimes replacing " +
                "\nsystem with a synonym such as platform or engine) is a subclass of information " +
                "\nfiltering system that seeks to predict the rating or preference that a user " +
                "\nwould give to an item.";

            var headerHtml = '<div class="modal-header">' +
                '<h4 class="modal-title" data-toggle="tooltip" data-placement="right" title="' + someText + '" lang="de">' +
                '</h4></div>'

            if ($this.options.header) {
                // win.append('<div class="modal-header"><h4 class="modal-title" lang="de"></h4></div>');
                win.append(headerHtml);

                if ($this.options.closeButton) {
                    win.find('.modal-header').prepend('<button type="button" ' +
                        'class="close" data-dismiss="modal">&times;</button>');
                }
            }

            win.append('<div class="modal-body"></div>');
            if ($this.options.footer) {
                win.append('<div class="modal-footer"></div>');

                if ($this.options.footerCloseButton) {
                    win.find('.modal-footer').append('<a data-dismiss="modal" id="mcloseID" href="#" ' +
                        'class="btn btn-default" lang="de">' + $this.options.footerCloseButton + '</a>');
                }

                if ($this.options.footerSaveButton) {
                    win.find('.modal-footer').append('<a data-dismiss="modal" id="msaveID" href="#" ' +
                        'class="btn btn-default" lang="de">' + $this.options.footerSaveButton + '</a>');
                }
            }

            console.log("win BEFORE close and save clicked: ", win);

            // close button clicked!!
            $("#mcloseID").click(function (event) {

                console.log("second close button clicked!!");

                moveBack();
                membraneColorBack();
                reinitVariable();
            })

            // save button clicked!!
            $("#msaveID").click(function (event) {

                console.log("second save button clicked!");
                console.log("cthis and $(cthis): ", cthis, $(cthis));
                console.log("win AFTER save clicked: ", win);
                console.log("membrane: ", membrane);
                console.log("combinedMembrane: ", combinedMembrane);

                // Find dragged circle's index in the combinedMembrane
                var tempIndex = 0;
                var filter = function (membraneID) {
                    var circleID = $(cthis).prop("id").split(",");
                    for (var i = 0; i < combinedMembrane.length; i++) {
                        console.log("Inside filter: ", combinedMembrane[i].model_entity, circleID[0]);
                        if (combinedMembrane[i].model_entity == circleID[0]) {
                            // combinedMembrane[i].med_fma = membraneID;
                            tempIndex = i;
                            return;
                        }
                    }
                }

                // apicalID -> basolateralID
                if ($(cthis).attr("membrane") == apicalID) {
                    // $(cthis).attr("membrane", basolateralID);
                    filter(basolateralID); // membrane attr
                }
                else {
                    // $(cthis).attr("membrane", apicalID);
                    filter(apicalID); // membrane attr
                }

                // checkbox!!
                if (win[0].children[1].children[0].children[9] != undefined) {
                    for (var i = 0; i < win[0].children[1].children[0].children[9].getElementsByTagName("input").length; i++) {
                        if (win[0].children[1].children[0].children[9].getElementsByTagName("input")[i].checked) {

                            console.log("Basolateral or apical model clicked!!");

                            console.log("checked: ", win[0].children[1].children[0].children[9].getElementsByTagName("input")[i].checked);
                            console.log("id CHECKBOX: ", win[0].children[1].children[0].children[9].getElementsByTagName("input")[i].id);

                            $(cthis).attr("id", win[0].children[1].children[0].children[9].getElementsByTagName("input")[i].id)
                            // cthis.id = win[0].children[1].children[0].children[9].getElementsByTagName("input")[i].id;
                            console.log("cthis AFTER: ", cthis);
                            console.log("id CHECKBOX: ", win[0].children[1].children[0].children[9].getElementsByTagName("input")[i].id);
                        }
                    }
                }

                // checkbox!!
                if (win[0].children[1].children[0].children[10] != undefined) {
                    for (var i = 0; i < win[0].children[1].children[0].children[10].getElementsByTagName("input").length; i++) {
                        if (win[0].children[1].children[0].children[10].getElementsByTagName("input")[i].checked) {

                            console.log("Alternative model clicked!!");

                            console.log("checked: ", win[0].children[1].children[0].children[10].getElementsByTagName("input")[i].checked);
                            console.log("id CHECKBOX: ", win[0].children[1].children[0].children[10].getElementsByTagName("input")[i].id);

                            $(cthis).attr("id", win[0].children[1].children[0].children[10].getElementsByTagName("input")[i].id);
                            // cthis.id = win[0].children[1].children[0].children[10].getElementsByTagName("input")[i].id;
                            console.log("cthis AFTER: ", cthis);
                            console.log("id CHECKBOX: ", win[0].children[1].children[0].children[10].getElementsByTagName("input")[i].id);
                        }
                    }
                }

                // checkbox!!
                if (win[0].children[1].children[0].children[11] != undefined) {
                    for (var i = 0; i < win[0].children[1].children[0].children[11].getElementsByTagName("input").length; i++) {
                        if (win[0].children[1].children[0].children[11].getElementsByTagName("input")[i].checked) {

                            console.log("Related cellml model clicked!!");

                            console.log("checked CHECKBOX: ", win[0].children[1].children[0].children[11].getElementsByTagName("input")[i].checked);
                            console.log("id CHECKBOX: ", win[0].children[1].children[0].children[11].getElementsByTagName("input")[i].id);

                            $(cthis).attr("id", win[0].children[1].children[0].children[11].getElementsByTagName("input")[i].id);
                            // cthis.id = win[0].children[1].children[0].children[11].getElementsByTagName("input")[i].id;
                            console.log("cthis AFTER: ", cthis);
                            console.log("id CHECKBOX: ", win[0].children[1].children[0].children[11].getElementsByTagName("input")[i].id);
                        }
                    }
                }

                membraneColorBack();

                var index = d3.select(cthis)._groups[0][0].attributes[1].value;
                var stylefill = d3.select(cthis)._groups[0][0].attributes[6].value;

                // channel in yellow color showing error - temp solution
                // if (circlewithlineg[index] != undefined) {
                if (stylefill == "lightgreen")
                    circlewithlineg[index].transition().delay(1000).duration(1000).style("fill", "orange");
                else
                    circlewithlineg[index].transition().delay(1000).duration(1000).style("fill", "lightgreen");
                // }

                var circleID = $(cthis).prop("id").split(",");
                console.log("circleID: ", circleID);

                // update combinedMembrane, this will be sent to GMS to assemble and reproduce a new cellml model
                combinedMembrane[tempIndex].model_entity = circleID[0]; // cellml model entity (e.g. weinstein_1995.cellml#NHE3.J_NHE3_Na)
                combinedMembrane[tempIndex].model_entity2 = circleID[1]; // cellml model entity => cotransporter or empty otherwise
                combinedMembrane[tempIndex].variable_text = circleID[2]; // cellml variable name (e.g. J_NHE_Na)
                combinedMembrane[tempIndex].variable_text2 = circleID[3]; // cellml variable name
                combinedMembrane[tempIndex].source_fma = circleID[4]; // source FMA uri
                combinedMembrane[tempIndex].sink_fma = circleID[5]; // sink FMA uri
                combinedMembrane[tempIndex].source_fma2 = circleID[6]; // source FMA uri => cotransporter or empty otherwise
                combinedMembrane[tempIndex].sink_fma2 = circleID[7]; // sink FMA uri => cotransporter or empty otherwise
                combinedMembrane[tempIndex].med_fma = circleID[8]; // mediator FMA uri
                combinedMembrane[tempIndex].med_pr = circleID[9]; // mediator protein uri
                combinedMembrane[tempIndex].solute_chebi = circleID[10]; // solute CHEBI uri
                combinedMembrane[tempIndex].solute_chebi2 = circleID[11]; // solute CHEBI uri
                combinedMembrane[tempIndex].solute_text = circleID[12]; // solute text using the CHEBI uri from OLS
                combinedMembrane[tempIndex].solute_text2 = circleID[13]; // solute text using the CHEBI uri from OLS
                combinedMembrane[tempIndex].med_pr_text = circleID[14]; // mediator protein text using the mediator protein uri from OLS
                combinedMembrane[tempIndex].med_pr_text_syn = circleID[15]; // synonym of a mediator protein text (e.g. NHE3, SGLT1) using the mediator protein uri from OLS

                // TODO: circle placement and rearrangement
                // TODO: membrane attr changed above, thus it affects here.
                if ($(cthis).attr("membrane") == apicalID) {
                    linebasolateral
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .style("stroke", "orange");

                    // line 1
                    dx1line[icircleGlobal] = xvalue + width;
                    dy1line[icircleGlobal] = yvalueb;
                    dx2line[icircleGlobal] = xvalue + width + lineLen;
                    dy2line[icircleGlobal] = yvalueb;
                    linewithlineg[icircleGlobal]
                        .attr("x1", dx1line[icircleGlobal])
                        .attr("y1", dy1line[icircleGlobal])
                        .attr("x2", dx2line[icircleGlobal])
                        .attr("y2", dy2line[icircleGlobal])

                    // text 1
                    dxtext[icircleGlobal] = xvalue + lineLen + 10 + width;
                    dytext[icircleGlobal] = yvalueb + 5;
                    linewithtextg[icircleGlobal]
                        .attr("x", dxtext[icircleGlobal])
                        .attr("y", dytext[icircleGlobal])

                    // circle
                    dx[icircleGlobal] = cxvalue + width;
                    dy[icircleGlobal] = cyvalueb + radius;
                    circlewithlineg[icircleGlobal]
                        .attr("cx", dx[icircleGlobal])
                        .attr("cy", dy[icircleGlobal])
                        .attr("membrane", basolateralID)

                    if (linewithlineg2[icircleGlobal] != undefined) {
                        // line 2
                        dx1line2[icircleGlobal] = xvalue + width;
                        dy1line2[icircleGlobal] = yvalueb + radius * 2;
                        dx2line2[icircleGlobal] = xvalue + width + lineLen;
                        dy2line2[icircleGlobal] = yvalueb + radius * 2;
                        linewithlineg2[icircleGlobal]
                            .attr("x1", dx1line2[icircleGlobal])
                            .attr("y1", dy1line2[icircleGlobal])
                            .attr("x2", dx2line2[icircleGlobal])
                            .attr("y2", dy2line2[icircleGlobal])

                        // text 2
                        dxtext2[icircleGlobal] = xvalue + lineLen + 10 + width;
                        dytext2[icircleGlobal] = yvalueb + radius * 2 + markerHeight;
                        linewithtextg2[icircleGlobal]
                            .attr("x", dxtext2[icircleGlobal])
                            .attr("y", dytext2[icircleGlobal])
                    }

                    // decrement y-axis of line and circle
                    yvalue -= ydistance;
                    cyvalue -= ydistance;

                    // increment y-axis of line and circle

                    yvalueb += ydistance;
                    cyvalueb += ydistance;

                    circleRearrange();
                }
                else {
                    lineapical
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .style("stroke", "green");

                    // line 1
                    dx1line[icircleGlobal] = xvalue;
                    dy1line[icircleGlobal] = yvalue;
                    dx2line[icircleGlobal] = xvalue + lineLen;
                    dy2line[icircleGlobal] = yvalue;
                    linewithlineg[icircleGlobal]
                        .attr("x1", dx1line[icircleGlobal])
                        .attr("y1", dy1line[icircleGlobal])
                        .attr("x2", dx2line[icircleGlobal])
                        .attr("y2", dy2line[icircleGlobal])

                    // text 1
                    dxtext[icircleGlobal] = xvalue + lineLen + 10;
                    dytext[icircleGlobal] = yvalue + 5;
                    linewithtextg[icircleGlobal]
                        .attr("x", dxtext[icircleGlobal])
                        .attr("y", dytext[icircleGlobal])

                    // circle
                    dx[icircleGlobal] = cxvalue;
                    dy[icircleGlobal] = cyvalue + radius;
                    circlewithlineg[icircleGlobal]
                        .attr("cx", dx[icircleGlobal])
                        .attr("cy", dy[icircleGlobal])
                        .attr("membrane", apicalID)

                    if (linewithlineg2[icircleGlobal] != undefined) {
                        // line 2
                        dx1line2[icircleGlobal] = xvalue;
                        dy1line2[icircleGlobal] = yvalue + radius * 2;
                        dx2line2[icircleGlobal] = xvalue + lineLen;
                        dy2line2[icircleGlobal] = yvalue + radius * 2;
                        linewithlineg2[icircleGlobal]
                            .attr("x1", dx1line2[icircleGlobal])
                            .attr("y1", dy1line2[icircleGlobal])
                            .attr("x2", dx2line2[icircleGlobal])
                            .attr("y2", dy2line2[icircleGlobal])

                        // text 2
                        dxtext2[icircleGlobal] = xvalue + lineLen + 10;
                        dytext2[icircleGlobal] = yvalue + radius * 2 + markerHeight;
                        linewithtextg2[icircleGlobal]
                            .attr("x", dxtext2[icircleGlobal])
                            .attr("y", dytext2[icircleGlobal])
                    }

                    // decrement y-axis of line and circle
                    yvalueb -= ydistance;
                    cyvalueb -= ydistance;

                    // increment y-axis of line and circle
                    yvalue += ydistance;
                    cyvalue += ydistance;

                    circleRearrange();
                }

                // TODO: change line arrow and text
                console.log("cthis: ", cthis);
                console.log("linewithlineg: ", linewithlineg);
                console.log("linewithtextg: ", linewithtextg);
                console.log("circlewithlineg: ", circlewithlineg);
                console.log("linewithlineg2: ", linewithlineg2);
                console.log("linewithtextg2: ", linewithtextg2);
                console.log("size linewithlineg linewithlineg2: ", linewithlineg.length, linewithlineg2.length);
                console.log("size linewithtextg linewithtextg2: ", linewithtextg.length, linewithlineg2.length);
                console.log("size circlewithlineg.length: ", circlewithlineg.length);
                console.log("size dx1line dy1line dx2line dy2line: ", dx1line.length, dy1line.length, dx2line.length, dy2line.length);
                console.log("size dxtext dytext dxtext2 dytext2: ", dxtext.length, dytext.length, dxtext2.length, dytext2.length);
                console.log("size dx dy: ", dx.length, dy.length);

                // Find replaced circle's index in the circlewithlineg
                var tempCircleIndex = 0;
                for (var m = 0; m < circlewithlineg.length; m++) {
                    var cID = circlewithlineg[m].attr("id").split(",")[0],
                        tempModelEntity = $(cthis).prop("id").split(",")[0];
                    console.log("Inside filter cID and tempModelEntity: ", cID, tempModelEntity);
                    if (cID == tempModelEntity) {
                        tempCircleIndex = m;
                        break;
                    }
                }

                var sourcefma = combinedMembrane[tempIndex].source_fma,
                    sinkfma = combinedMembrane[tempIndex].sink_fma,
                    mediatorfma = combinedMembrane[tempIndex].med_fma,
                    sourcefma2 = combinedMembrane[tempIndex].source_fma2,
                    sinkfma2 = combinedMembrane[tempIndex].sink_fma2,
                    variable_text2 = combinedMembrane[tempIndex].variable_text2;

                if (mediatorfma == apicalID) {
                    // case 1
                    if ((sourcefma == luminalID && sinkfma == cytosolID) && variable_text2 == "single flux") {
                        console.log("case 1 med, src, snk: ", mediatorfma, sourcefma, sinkfma);
                        console.log("attr(marker-end) and start: ", linewithlineg[tempCircleIndex].attr("marker-end"), linewithlineg[tempCircleIndex].attr("marker-start"));

                        if (linewithlineg[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-start", null);
                            linewithlineg[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] + 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }
                    }

                    // case 2
                    if ((sourcefma == cytosolID && sinkfma == luminalID) && variable_text2 == "single flux") {
                        console.log("case 2 med, src, snk: ", mediatorfma, sourcefma, sinkfma);
                        console.log("attr(marker-end) and start: ", linewithlineg[tempCircleIndex].attr("marker-end"), linewithlineg[tempCircleIndex].attr("marker-start"));

                        if (linewithlineg[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-end", null);
                            linewithlineg[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] - 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }
                    }

                    // case 3
                    if ((sourcefma == luminalID && sinkfma == cytosolID) && (sourcefma2 == luminalID && sinkfma2 == cytosolID)) {
                        console.log("case 3 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-start", null);
                            linewithlineg[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] + 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-start", null);
                            linewithlineg2[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] + 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }

                    // case 4
                    if ((sourcefma == cytosolID && sinkfma == luminalID) && (sourcefma2 == cytosolID && sinkfma2 == luminalID)) {
                        console.log("case 4 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-end", null);
                            linewithlineg[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] - 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(membrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-end", null);
                            linewithlineg2[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] - 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }

                    // case 5
                    if ((sourcefma == luminalID && sinkfma == cytosolID) && (sourcefma2 == cytosolID && sinkfma2 == luminalID)) {
                        console.log("case 5 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-start", null);
                            linewithlineg[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] + 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-end", null);
                            linewithlineg2[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] - 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }

                    // case 6
                    if ((sourcefma == cytosolID && sinkfma == luminalID) && (sourcefma2 == luminalID && sinkfma2 == cytosolID)) {
                        console.log("case 6 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-end", null);
                            linewithlineg[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] - 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-start", null);
                            linewithlineg2[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] + 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }
                }

                if (mediatorfma == basolateralID) {
                    // case 1
                    if ((sourcefma == cytosolID && sinkfma == interstitialID) && variable_text2 == "single flux") {
                        console.log("case 1 med, src, snk: ", mediatorfma, sourcefma, sinkfma);
                        console.log("attr(marker-start): ", linewithlineg[tempCircleIndex].attr("marker-start"));

                        if (linewithlineg[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-start", null);
                            linewithlineg[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] + 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }
                    }

                    // case 2
                    if ((sourcefma == interstitialID && sinkfma == cytosolID) && variable_text2 == "single flux") {
                        console.log("case 2 med, src, snk: ", mediatorfma, sourcefma, sinkfma);
                        console.log("attr(marker-end): ", linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-end", null);
                            linewithlineg[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] - 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }
                    }

                    // case 3
                    if ((sourcefma == cytosolID && sinkfma == interstitialID) && (sourcefma2 == cytosolID && sinkfma2 == interstitialID)) {
                        console.log("case 3 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-start", null);
                            linewithlineg[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] + 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-start", null);
                            linewithlineg2[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] + 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }

                    // case 4
                    if ((sourcefma == interstitialID && sinkfma == cytosolID) && (sourcefma2 == interstitialID && sinkfma2 == cytosolID)) {
                        console.log("case 4 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-end", null);
                            linewithlineg[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] - 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-end", null);
                            linewithlineg2[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] - 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }

                    // case 5
                    if ((sourcefma == cytosolID && sinkfma == interstitialID) && (sourcefma2 == interstitialID && sinkfma2 == cytosolID)) {
                        console.log("case 5 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-start", null);
                            linewithlineg[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] + 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-end", null);
                            linewithlineg2[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] - 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }

                    // case 6
                    if ((sourcefma == interstitialID && sinkfma == cytosolID) && (sourcefma2 == cytosolID && sinkfma2 == interstitialID)) {
                        console.log("case 6 med, src, snk, src2, snk2: ", mediatorfma, sourcefma, sinkfma, sourcefma2, sinkfma2);
                        console.log("attr(marker-start) and end: ", linewithlineg[tempCircleIndex].attr("marker-start"), linewithlineg[tempCircleIndex].attr("marker-end"));

                        if (linewithlineg[tempCircleIndex].attr("marker-end") == "url(#end)") {
                            // line marker
                            linewithlineg[tempCircleIndex].attr("marker-end", null);
                            linewithlineg[tempCircleIndex].attr("marker-start", "url(#start)");

                            // text
                            dxtext[tempCircleIndex] = dxtext[tempCircleIndex] - 90;
                            linewithtextg[tempCircleIndex]
                                .attr("x", dxtext[tempCircleIndex])
                                .attr("y", dytext[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text);
                        }

                        if (linewithlineg2[tempCircleIndex].attr("marker-start") == "url(#start)") {
                            // line marker
                            linewithlineg2[tempCircleIndex].attr("marker-start", null);
                            linewithlineg2[tempCircleIndex].attr("marker-end", "url(#end)");

                            // text
                            dxtext2[tempCircleIndex] = dxtext2[tempCircleIndex] + 90;
                            linewithtextg2[tempCircleIndex]
                                .attr("x", dxtext2[tempCircleIndex])
                                .attr("y", dytext2[tempCircleIndex])
                                .text(combinedMembrane[tempCircleIndex].solute_text2);
                        }
                    }
                }

                console.log("tempIndex, tempCircleIndex: ", tempIndex, tempCircleIndex);
                console.log("linewithlineg x1,y1 x2,y2: ", linewithlineg[tempCircleIndex].attr("x1"), linewithlineg[tempCircleIndex].attr("y1"),
                    linewithlineg[tempCircleIndex].attr("x2"), linewithlineg[tempCircleIndex].attr("y2"));
                console.log("linewithtextg x,y: ", linewithtextg[tempCircleIndex].attr("x"), linewithtextg[tempCircleIndex].attr("y"));
                console.log("dxtext,dytext: ", dxtext[tempCircleIndex], dytext[tempCircleIndex]);

                console.log("circlewithlineg cx,cy: ", circlewithlineg[tempCircleIndex].attr("cx"), circlewithlineg[tempCircleIndex].attr("cy"));

                console.log("linewithlineg2 x1,y1 x2,y2: ", linewithlineg2[tempCircleIndex].attr("x1"), linewithlineg2[tempCircleIndex].attr("y1"),
                    linewithlineg2[tempCircleIndex].attr("x2"), linewithlineg2[tempCircleIndex].attr("y2"));
                console.log("linewithtextg2 x,y: ", linewithtextg2[tempCircleIndex].attr("x"), linewithtextg2[tempCircleIndex].attr("y"));
                console.log("dxtext2,dytext2: ", dxtext2[tempCircleIndex], dytext2[tempCircleIndex]);

                // Reinitialise variables for next iteration
                reinitVariable();
            })
        };

        /**
         * Set header text. It makes sense only if the options.header is logical true.
         * @param {String} html New header text.
         */
        $this.setHeader = function (html) {
            $this.window.find('.modal-title').html(html);
        };

        /**
         * Set body HTML.
         * @param {String} html New body HTML
         */
        $this.setBody = function (html) {
            $this.window.find('.modal-body').html(html);
        };

        /**
         * Set footer HTML.
         * @param {String} html New footer HTML
         */
        $this.setFooter = function (html) {
            $this.window.find('.modal-footer').html(html);
        };

        /**
         * Return window body element.
         * @returns {jQuery} The body element
         */
        $this.getBody = function () {
            return $this.window.find('.modal-body');
        };

        /**
         * Show modal window
         */
        $this.show = function () {
            $this.window.modal('show');
        };

        /**
         * Hide modal window
         */
        $this.hide = function () {
            $this.window.modal('hide');
        };

        /**
         * Toggle modal window
         */
        $this.toggle = function () {
            $this.window.modal('toggle');
        };

        $this.selector = "#" + $this.options.id;
        if (!$($this.selector).length) {
            $this.createModal();
        }

        $this.window = $($this.selector);
        $this.setHeader($this.options.header);
    }

    // build the start arrow.
    svg.append("svg:defs")
        .selectAll("marker")
        .data(["start"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 1)
        .attr("refY", -0.25)
        .attr("markerWidth", markerWidth)
        .attr("markerHeight", markerHeight)
        .attr("orient", "180")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    // build the starttop arrow.
    svg.append("svg:defs")
        .selectAll("marker")
        .data(["starttop"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 1)
        .attr("refY", -0.25)
        .attr("markerWidth", markerWidth)
        .attr("markerHeight", markerHeight)
        .attr("orient", "270")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    // build the end arrow.
    svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 1)
        .attr("refY", -0.25)
        .attr("markerWidth", markerWidth)
        .attr("markerHeight", markerHeight)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    // Utility for marker direction
    function markerDir(selection) {
        console.log("selection: ", selection);

        var mstart = d3.select("#" + selection + "")
            ._groups[0][0]
            .getAttribute("marker-start");

        var mend = d3.select("#" + selection + "")
            ._groups[0][0]
            .getAttribute("marker-end");

        if (mstart == "") {
            d3.select("#" + selection + "")
                .attr("marker-start", "url(#start)")
                .attr("marker-end", "");
        }
        else {
            d3.select("#" + selection + "")
                .attr("marker-end", "url(#end)")
                .attr("marker-start", "");
        }

        if (mend == "") {
            d3.select("#" + selection + "")
                .attr("marker-end", "url(#end)")
                .attr("marker-start", "");
        }
        else {
            d3.select("#" + selection + "")
                .attr("marker-start", "url(#start)")
                .attr("marker-end", "");
        }
    }
}

exports.showsvgEpithelial = showsvgEpithelial;