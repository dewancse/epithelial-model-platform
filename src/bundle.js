/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Created by Dewan Sarwar on 14/01/2018.
 */
// var endpoint = "https://models.physiomeproject.org/pmr2_virtuoso_search";
var pmrEndpoint = "https://models.physiomeproject.org/pmr2_virtuoso_search",
    cors_api_url = "http://localhost:8080/",
    // endpoint = cors_api_url + pmrEndpoint;
    endpoint = pmrEndpoint;

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

var dictionary = [
    {
        "key1": "flux", "key2": "",
        "opb": "<http://identifiers.org/opb/OPB_00593>", "chebi": ""
    },
    {
        "key1": "flux", "key2": "sodium",
        "opb": "<http://identifiers.org/opb/OPB_00593>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:29101>"
    },
    {
        "key1": "flux", "key2": "hydrogen",
        "opb": "<http://identifiers.org/opb/OPB_00593>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:15378>"
    },
    {
        "key1": "flux", "key2": "ammonium",
        "opb": "<http://identifiers.org/opb/OPB_00593>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:28938>"
    },
    {
        "key1": "flux", "key2": "chloride",
        "opb": "<http://identifiers.org/opb/OPB_00593>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:17996>"
    },
    {
        "key1": "flux", "key2": "potassium",
        "opb": "<http://identifiers.org/opb/OPB_00593>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:29103>"
    },
    {
        "key1": "concentration", "key2": "",
        "opb": "<http://identifiers.org/opb/OPB_00340>", "chebi": ""
    },
    {
        "key1": "concentration", "key2": "sodium",
        "opb": "<http://identifiers.org/opb/OPB_00340>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:29101>"
    },
    {
        "key1": "concentration", "key2": "hydrogen",
        "opb": "<http://identifiers.org/opb/OPB_00340>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:15378>"
    },
    {
        "key1": "concentration", "key2": "ammonium",
        "opb": "<http://identifiers.org/opb/OPB_00340>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:28938>"
    },
    {
        "key1": "concentration", "key2": "chloride",
        "opb": "<http://identifiers.org/opb/OPB_00340>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:17996>"
    },
    {
        "key1": "concentration", "key2": "potassium",
        "opb": "<http://identifiers.org/opb/OPB_00340>",
        "chebi": "<http://identifiers.org/chebi/CHEBI:29103>"
    }
];

var homeHtml = "./snippets/home-snippet.html";
var viewHtml = "./snippets/view-snippet.html";
var modelHtml = "./snippets/model-snippet.html";
var searchHtml = "./snippets/search-snippet.html";
var similarityHtml = "./snippets/similarity-snippet.html";
var epithelialHtml = "./snippets/epithelial-snippet.html";

var apicalID = "http://identifiers.org/fma/FMA:84666";
var basolateralID = "http://identifiers.org/fma/FMA:84669";
var partOfProteinUri = "http://purl.obolibrary.org/obo/PR";
var partOfGOUri = "http://identifiers.org/go/GO";
var partOfCHEBIUri = "http://identifiers.org/chebi/CHEBI";
var fluxOPB = "http://identifiers.org/opb/OPB_00593";
var concentrationOPB = "http://identifiers.org/opb/OPB_00340";

var paracellularID = "http://identifiers.org/fma/FMA:67394";
var luminalID = "http://identifiers.org/fma/FMA:74550";
var cytosolID = "http://identifiers.org/fma/FMA:66836";
var interstitialID = "http://identifiers.org/fma/FMA:9673";
var Nachannel = "http://purl.obolibrary.org/obo/PR_000014527";
var Clchannel = "http://purl.obolibrary.org/obo/PR_Q06393";
var Kchannel = "http://purl.obolibrary.org/obo/PR_P15387";
var partOfFMAUri = "http://identifiers.org/fma/FMA";

var myWorkspaneName = "https://models.physiomeproject.org/workspace/267";
var uriSEDML = "https://sed-ml.github.io/index.html";

var makecotransporterSPARQL = function (membrane1, membrane2) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>" +
        "SELECT ?med_entity_uri ?med_entity_uriCl " +
        "WHERE { GRAPH ?Workspace { " +
        "<" + membrane1 + "> semsim:isComputationalComponentFor ?model_prop. " +
        "?model_prop semsim:physicalPropertyOf ?model_proc. " +
        "?model_proc semsim:hasMediatorParticipant ?model_medparticipant. " +
        "?model_medparticipant semsim:hasPhysicalEntityReference ?med_entity. " +
        "?med_entity semsim:hasPhysicalDefinition ?med_entity_uri." +
        "<" + membrane2 + "> semsim:isComputationalComponentFor ?model_propCl. " +
        "?model_propCl semsim:physicalPropertyOf ?model_procCl. " +
        "?model_procCl semsim:hasMediatorParticipant ?model_medparticipantCl. " +
        "?model_medparticipantCl semsim:hasPhysicalEntityReference ?med_entityCl. " +
        "?med_entityCl semsim:hasPhysicalDefinition ?med_entity_uriCl." +
        "FILTER (?med_entity_uri = ?med_entity_uriCl) . " +
        "}}";

    return query;
};

var srcDescMediatorOfFluxesSPARQL = function (cellmlModelEntity, model) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>" +
        "SELECT ?source_fma ?sink_fma ?med_entity_uri ?solute_chebi ?protein " +
        "WHERE { " +
        "<" + cellmlModelEntity + "> semsim:isComputationalComponentFor ?model_prop. " +
        "?model_prop semsim:physicalPropertyOf ?model_proc. " +
        "?model_proc semsim:hasSourceParticipant ?model_srcparticipant. " +
        "?model_srcparticipant semsim:hasPhysicalEntityReference ?source_entity. " +
        "?source_entity ro:part_of ?source_part_of_entity. " +
        "?source_part_of_entity semsim:hasPhysicalDefinition ?source_fma. " +
        "?source_entity semsim:hasPhysicalDefinition ?solute_chebi. " +
        "?model_proc semsim:hasSinkParticipant ?model_sinkparticipant. " +
        "?model_sinkparticipant semsim:hasPhysicalEntityReference ?sink_entity. " +
        "?sink_entity ro:part_of ?sink_part_of_entity. " +
        "?sink_part_of_entity semsim:hasPhysicalDefinition ?sink_fma." +
        "?model_proc semsim:hasMediatorParticipant ?model_medparticipant." +
        "?model_medparticipant semsim:hasPhysicalEntityReference ?med_entity." +
        "?med_entity semsim:hasPhysicalDefinition ?med_entity_uri." +
        "<" + model + ">  <http://www.obofoundry.org/ro/ro.owl#modelOf> ?protein. " +
        "}";

    return query;
};

var opbSPARQL = function (cellmlModelEntity) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "SELECT ?opb WHERE { " +
        "<" + cellmlModelEntity + "> semsim:isComputationalComponentFor ?model_prop. " +
        "?model_prop semsim:hasPhysicalDefinition ?opb. " +
        "}";

    return query;
};

var concentrationOPBSPARQL = function (cellmlModelEntity, model) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>" +
        "SELECT ?concentration_fma ?solute_chebi ?protein " +
        "WHERE { " +
        "<" + cellmlModelEntity + "> semsim:isComputationalComponentFor ?model_prop. " +
        "?model_prop semsim:physicalPropertyOf ?source_entity. " +
        "?source_entity ro:part_of ?source_part_of_entity. " +
        "?source_part_of_entity semsim:hasPhysicalDefinition ?concentration_fma." +
        "?source_entity semsim:hasPhysicalDefinition ?solute_chebi. " +
        "<" + model + ">  <http://www.obofoundry.org/ro/ro.owl#modelOf> ?protein. " +
        "}";

    return query;
};

var discoveryWithFlux = function (uriOPB) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "PREFIX dcterms: <http://purl.org/dc/terms/>" +
        "SELECT ?Model_entity ?Biological_meaning " +
        "WHERE { " +
        "?property semsim:hasPhysicalDefinition " + uriOPB + ". " +
        "?Model_entity semsim:isComputationalComponentFor ?property. " +
        "?Model_entity dcterms:description ?Biological_meaning." +
        "}";

    return query;
};

var discoveryWithFluxOfSolute = function (uriCHEBI) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "PREFIX dcterms: <http://purl.org/dc/terms/>" +
        "SELECT DISTINCT ?g ?Model_entity ?Biological_meaning " +
        "WHERE { GRAPH ?g { " +
        "?entity semsim:hasPhysicalDefinition " + uriCHEBI + ". " +
        "?source semsim:hasPhysicalEntityReference ?entity. " +
        "?process semsim:hasSourceParticipant ?source. " +
        "?property semsim:physicalPropertyOf ?process. " +
        "?Model_entity semsim:isComputationalComponentFor ?property. " +
        "?Model_entity dcterms:description ?Biological_meaning." +
        "}}";

    return query;
};

var discoveryWithConcentrationOfSolute = function (uriCHEBI) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "PREFIX dcterms: <http://purl.org/dc/terms/>" +
        "SELECT ?Model_entity ?Biological_meaning " +
        "WHERE { " +
        "?entity semsim:hasPhysicalDefinition " + uriCHEBI + ". " +
        "?property semsim:physicalPropertyOf ?entity. " +
        "?Model_entity semsim:isComputationalComponentFor ?property. " +
        "?Model_entity dcterms:description ?Biological_meaning." +
        "}";

    return query;
};

var loadViewHtmlSPARQL = function (cellmlModel) {
    var query = "SELECT ?Workspace ?Model_entity ?Title ?Author ?Abstract ?Keyword ?Protein ?Compartment " +
        "?Located_in ?DOI WHERE { GRAPH ?Workspace { " +
        "<" + cellmlModel + "> <http://purl.org/dc/terms/title> ?Title . " +
        "?Model_entity <http://purl.org/dc/terms/title> ?Title . " +
        "OPTIONAL { <" + cellmlModel + "> <http://www.w3.org/2001/vcard-rdf/3.0#FN> ?Author } . " +
        "OPTIONAL { <" + cellmlModel + "> <http://purl.org/dc/terms/abstract> ?Abstract } . " +
        "OPTIONAL { <" + cellmlModel + "> <http://purl.org/dc/terms/keyword> ?Keyword } . " +
        "OPTIONAL { <" + cellmlModel + "> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein } . " +
        "OPTIONAL { <" + cellmlModel + "> <http://www.obofoundry.org/ro/ro.owl#compartmentOf> ?Compartment } . " +
        "OPTIONAL { <" + cellmlModel + "> <http://www.obofoundry.org/ro/ro.owl#located_in> ?Located_in } . " +
        "OPTIONAL { <" + cellmlModel + "> <http://biomodels.net/model-qualifiers/isDescribedBy> ?DOI } . " +
        "}}";

    return query;
};

var circleIDmyWelcomeWindowSPARQL = function (circleID, cellmlModel) {
    var query;
    if (circleID[1] == "") {
        query = "SELECT ?Protein ?Biological_meaning " +
            "WHERE { GRAPH ?g { " +
            "<" + cellmlModel + "> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . " +
            "<" + circleID[0] + "> <http://purl.org/dc/terms/description> ?Biological_meaning . " +
            "}}";
    }
    else { // (circleID[1] != "")
        query = "SELECT ?Protein ?Biological_meaning ?Biological_meaning2 " +
            "WHERE { GRAPH ?g { " +
            "<" + cellmlModel + "> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . " +
            "<" + circleID[0] + "> <http://purl.org/dc/terms/description> ?Biological_meaning . " +
            "<" + circleID[1] + "> <http://purl.org/dc/terms/description> ?Biological_meaning2 . " +
            "}}"
    }
    return query;
};

var relatedMembraneSPARQL = function (fstCHEBI, sndCHEBI, membrane) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "SELECT ?Model_entity ?Model_entity2 " +
        "WHERE { GRAPH ?g { " +
        "?entity semsim:hasPhysicalDefinition <" + fstCHEBI + ">. " +
        "?source semsim:hasPhysicalEntityReference ?entity. " +
        "?process semsim:hasSourceParticipant ?source. " +
        "?property semsim:physicalPropertyOf ?process. " +
        "?Model_entity semsim:isComputationalComponentFor ?property." +
        "?process semsim:hasMediatorParticipant ?model_medparticipant." +
        "?model_medparticipant semsim:hasPhysicalEntityReference ?med_entity." +
        "?med_entity semsim:hasPhysicalDefinition <" + membrane + ">." +
        "?entity2 semsim:hasPhysicalDefinition <" + sndCHEBI + ">. " +
        "?source2 semsim:hasPhysicalEntityReference ?entity2. " +
        "?process2 semsim:hasSourceParticipant ?source2. " +
        "?property2 semsim:physicalPropertyOf ?process2. " +
        "?Model_entity2 semsim:isComputationalComponentFor ?property2." +
        "?process2 semsim:hasMediatorParticipant ?model_medparticipant2." +
        "?model_medparticipant2 semsim:hasPhysicalEntityReference ?med_entity2." +
        "?med_entity2 semsim:hasPhysicalDefinition <" + membrane + ">." +
        "}}";

    return query;
};

var processCombinedMembrane = function (apicalMembrane, basolateralMembrane, membrane, combinedMembrane) {

    var tempapical = [],
        tempBasolateral = [],
        paracellularMembrane = [];

    // Extract apical fluxes
    for (var i in apicalMembrane) {
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
    for (var i in basolateralMembrane) {
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
    for (var i in tempapical) {
        for (var j in membrane) {
            if (tempapical[i].srctext == membrane[j].variable_text &&
                tempapical[i].srcfma == membrane[j].source_fma &&
                tempapical[i].snkfma == membrane[j].sink_fma) {

                membrane.splice(j, 1);
            }
        }
    }

    // remove basolateral fluxes from membrane array
    for (var i in tempBasolateral) {
        for (var j in membrane) {
            if (tempBasolateral[i].srctext == membrane[j].variable_text &&
                tempBasolateral[i].srcfma == membrane[j].source_fma &&
                tempBasolateral[i].snkfma == membrane[j].sink_fma) {

                membrane.splice(j, 1);
            }
        }
    }

    // abp - apical, basolateral and paracellular membrane
    var abpmembraneObject = function (abpmembrane, type, membrane) {
        abpmembrane.push(
            {
                solute_chebi: membrane.solute_chebi,
                solute_text: membrane.solute_text,
                variable_text: membrane.variable_text,
                source_fma: membrane.source_fma,
                sink_fma: membrane.sink_fma,
                solute_chebi2: type,
                solute_text2: type,
                variable_text2: type,
                source_fma2: type,
                sink_fma2: type,
                model_entity: membrane.model_entity,
                model_entity2: "",
                med_fma: membrane.med_fma,
                med_pr: membrane.med_pr,
                med_pr_text: membrane.med_pr_text,
                med_pr_text_syn: membrane.med_pr_text_syn,
                protein_name: membrane.protein_name
            });

        membrane.solute_chebi2 = type;
        membrane.solute_text2 = type;
        membrane.variable_text2 = type;
        membrane.source_fma2 = type;
        membrane.sink_fma2 = type;
    }

    // Nachannel, Clchannel, Kchannel
    for (var i in membrane) {
        if (membrane[i].med_fma == apicalID && (membrane[i].med_pr == Nachannel ||
            membrane[i].med_pr == Clchannel || membrane[i].med_pr == Kchannel)) {
            abpmembraneObject(apicalMembrane, "channel", membrane[i]);
        }

        if (membrane[i].med_fma == basolateralID && (membrane[i].med_pr == Nachannel ||
            membrane[i].med_pr == Clchannel || membrane[i].med_pr == Kchannel)) {
            abpmembraneObject(basolateralMembrane, "channel", membrane[i]);
        }

        if (membrane[i].source_fma == luminalID && membrane[i].sink_fma == interstitialID) {
            abpmembraneObject(paracellularMembrane, "diffusiveflux", membrane[i]);
        }
    }

    // flux
    var apicalbasoMembraneObj;
    for (var i in membrane) {
        if (membrane[i].variable_text2 != "channel" && membrane[i].variable_text2 != "diffusiveflux") {

            if (membrane[i].med_fma == apicalID)
                apicalbasoMembraneObj = apicalMembrane;
            else if (membrane[i].med_fma == basolateralID)
                apicalbasoMembraneObj = basolateralMembrane;

            apicalbasoMembraneObj.push({
                solute_chebi: membrane[i].solute_chebi,
                solute_text: membrane[i].solute_text,
                variable_text: membrane[i].variable_text,
                source_fma: membrane[i].source_fma,
                sink_fma: membrane[i].sink_fma,
                solute_chebi2: "",
                solute_text2: "",
                variable_text2: "flux",
                source_fma2: "",
                sink_fma2: "",
                model_entity: membrane[i].model_entity,
                model_entity2: "",
                med_fma: membrane[i].med_fma,
                med_pr: membrane[i].med_pr,
                med_pr_text: membrane[i].med_pr_text,
                med_pr_text_syn: membrane[i].med_pr_text_syn,
                protein_name: membrane[i].protein_name
            });
        }
    }

    for (var i in apicalMembrane)
        combinedMembrane.push(apicalMembrane[i]);
    for (var i in basolateralMembrane)
        combinedMembrane.push(basolateralMembrane[i]);
    for (var i in paracellularMembrane)
        combinedMembrane.push(paracellularMembrane[i]);

    return combinedMembrane;
};

var relatedMembraneModelSPARQL = function (model_entity, model_entity2) {
    var query;
    if (model_entity2 == "") {
        console.log("relatedMembraneModel: IF (modelEntityObj[idMembrane].model_entity2 ==)");
        query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
            "PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>" +
            "SELECT ?source_fma ?sink_fma ?med_entity_uri ?solute_chebi ?solute_chebi2 " +
            "WHERE { " +
            "<" + model_entity + "> semsim:isComputationalComponentFor ?model_prop. " +
            "?model_prop semsim:physicalPropertyOf ?model_proc. " +
            "?model_proc semsim:hasSourceParticipant ?model_srcparticipant. " +
            "?model_srcparticipant semsim:hasPhysicalEntityReference ?source_entity. " +
            "?source_entity ro:part_of ?source_part_of_entity. " +
            "?source_part_of_entity semsim:hasPhysicalDefinition ?source_fma. " +
            "?source_entity semsim:hasPhysicalDefinition ?solute_chebi. " +
            "?source_entity semsim:hasPhysicalDefinition ?solute_chebi2. " + // change this later
            "?model_proc semsim:hasSinkParticipant ?model_sinkparticipant. " +
            "?model_sinkparticipant semsim:hasPhysicalEntityReference ?sink_entity. " +
            "?sink_entity ro:part_of ?sink_part_of_entity. " +
            "?sink_part_of_entity semsim:hasPhysicalDefinition ?sink_fma." +
            "?model_proc semsim:hasMediatorParticipant ?model_medparticipant." +
            "?model_medparticipant semsim:hasPhysicalEntityReference ?med_entity." +
            "?med_entity semsim:hasPhysicalDefinition ?med_entity_uri." +
            "}";
    }
    else {
        console.log("relatedMembraneModel: ELSE (modelEntityObj[idMembrane].model_entity2 !=)");
        query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
            "PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>" +
            "SELECT ?source_fma ?sink_fma ?med_entity_uri ?solute_chebi ?source_fma2 ?sink_fma2 ?med_entity_uri2 ?solute_chebi2 " +
            "WHERE { " +
            "<" + model_entity + "> semsim:isComputationalComponentFor ?model_prop. " +
            "?model_prop semsim:physicalPropertyOf ?model_proc. " +
            "?model_proc semsim:hasSourceParticipant ?model_srcparticipant. " +
            "?model_srcparticipant semsim:hasPhysicalEntityReference ?source_entity. " +
            "?source_entity ro:part_of ?source_part_of_entity. " +
            "?source_part_of_entity semsim:hasPhysicalDefinition ?source_fma. " +
            "?source_entity semsim:hasPhysicalDefinition ?solute_chebi. " +
            "?model_proc semsim:hasSinkParticipant ?model_sinkparticipant. " +
            "?model_sinkparticipant semsim:hasPhysicalEntityReference ?sink_entity. " +
            "?sink_entity ro:part_of ?sink_part_of_entity. " +
            "?sink_part_of_entity semsim:hasPhysicalDefinition ?sink_fma." +
            "?model_proc semsim:hasMediatorParticipant ?model_medparticipant." +
            "?model_medparticipant semsim:hasPhysicalEntityReference ?med_entity." +
            "?med_entity semsim:hasPhysicalDefinition ?med_entity_uri." +
            "<" + model_entity2 + "> semsim:isComputationalComponentFor ?model_prop2. " +
            "?model_prop2 semsim:physicalPropertyOf ?model_proc2. " +
            "?model_proc2 semsim:hasSourceParticipant ?model_srcparticipant2. " +
            "?model_srcparticipant2 semsim:hasPhysicalEntityReference ?source_entity2. " +
            "?source_entity2 ro:part_of ?source_part_of_entity2. " +
            "?source_part_of_entity2 semsim:hasPhysicalDefinition ?source_fma2. " +
            "?source_entity2 semsim:hasPhysicalDefinition ?solute_chebi2. " +
            "?model_proc2 semsim:hasSinkParticipant ?model_sinkparticipant2. " +
            "?model_sinkparticipant2 semsim:hasPhysicalEntityReference ?sink_entity2. " +
            "?sink_entity2 ro:part_of ?sink_part_of_entity2. " +
            "?sink_part_of_entity2 semsim:hasPhysicalDefinition ?sink_fma2." +
            "?model_proc2 semsim:hasMediatorParticipant ?model_medparticipant2." +
            "?model_medparticipant2 semsim:hasPhysicalEntityReference ?med_entity2." +
            "?med_entity2 semsim:hasPhysicalDefinition ?med_entity_uri2." +
            "}";
    }

    return query;
};

var modalWindowToAddModelsSPARQL = function (located_in) {
    var query = "PREFIX semsim: <http://www.bhi.washington.edu/SemSim#>" +
        "SELECT ?modelEntity ?biological " +
        "WHERE { GRAPH ?g { " +
        "?entity semsim:hasPhysicalDefinition <" + located_in + ">." +
        "?mediator semsim:hasPhysicalEntityReference ?entity." +
        "?process semsim:hasMediatorParticipant ?mediator." +
        "?property semsim:physicalPropertyOf ?process." +
        "?modelEntity semsim:isComputationalComponentFor ?property." +
        "?modelEntity <http://purl.org/dc/terms/description> ?biological. " +
        "}}";

    return query;
};

exports.makecotransporterSPARQL = makecotransporterSPARQL;
exports.srcDescMediatorOfFluxesSPARQL = srcDescMediatorOfFluxesSPARQL;
exports.opbSPARQL = opbSPARQL;
exports.discoveryWithFlux = discoveryWithFlux;
exports.discoveryWithFluxOfSolute = discoveryWithFluxOfSolute;
exports.discoveryWithConcentrationOfSolute = discoveryWithConcentrationOfSolute;
exports.loadViewHtmlSPARQL = loadViewHtmlSPARQL;
exports.circleIDmyWelcomeWindowSPARQL = circleIDmyWelcomeWindowSPARQL;
exports.relatedMembraneSPARQL = relatedMembraneSPARQL;
exports.dictionary = dictionary;
exports.organ = organ;
exports.homeHtml = homeHtml;
exports.viewHtml = viewHtml;
exports.modelHtml = modelHtml;
exports.searchHtml = searchHtml;
exports.similarityHtml = similarityHtml;
exports.epithelialHtml = epithelialHtml;
exports.apicalID = apicalID;
exports.basolateralID = basolateralID;
exports.partOfProteinUri = partOfProteinUri;
exports.partOfGOUri = partOfGOUri;
exports.partOfCHEBIUri = partOfCHEBIUri;
exports.fluxOPB = fluxOPB;
exports.concentrationOPB = concentrationOPB;
exports.paracellularID = paracellularID;
exports.luminalID = luminalID;
exports.cytosolID = cytosolID;
exports.interstitialID = interstitialID;
exports.Nachannel = Nachannel;
exports.Clchannel = Clchannel;
exports.Kchannel = Kchannel;
exports.partOfFMAUri = partOfFMAUri;
exports.myWorkspaneName = myWorkspaneName;
exports.uriSEDML = uriSEDML;
exports.endpoint = endpoint;
exports.processCombinedMembrane = processCombinedMembrane;
exports.relatedMembraneModelSPARQL = relatedMembraneModelSPARQL;
exports.modalWindowToAddModelsSPARQL = modalWindowToAddModelsSPARQL;
exports.concentrationOPBSPARQL = concentrationOPBSPARQL;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by dsar941 on 1/22/2017.
 */
var miscellaneous = __webpack_require__(2);
var ajaxUtils = __webpack_require__(3);
var sparqlUtils = __webpack_require__(0);
var svgPlatform = __webpack_require__(4);

var combinedMembrane = [
    {
        med_fma: "http://identifiers.org/fma/FMA:84669",
        med_pr: "http://purl.obolibrary.org/obo/PR_P06685",
        med_pr_text: "sodium/potassium-transporting ATPase subunit alpha-1 (rat)",
        med_pr_text_syn: "P06685",
        model_entity: "chang_fujita_b_1999.cellml#solute_concentrations.J_sc_Na",
        model_entity2: "",
        protein_name: "http://purl.obolibrary.org/obo/PR_P13866",
        sink_fma: "http://identifiers.org/fma/FMA:9673",
        sink_fma2: "",
        solute_chebi: "http://identifiers.org/chebi/CHEBI:29101",
        solute_chebi2: "",
        solute_text: "Na+",
        solute_text2: "",
        source_fma: "http://identifiers.org/fma/FMA:66836",
        source_fma2: "",
        variable_text: "J_sc_Na",
        variable_text2: "flux"
    }
    // ,
    // {
    //     med_fma: "http://identifiers.org/fma/FMA:84666",
    //     med_pr: "http://purl.obolibrary.org/obo/PR_P55018",
    //     med_pr_text: "solute carrier family 12 member 3 (rat)",
    //     med_pr_text_syn: "TSC",
    //     model_entity: "chang_fujita_b_1999.cellml#mc_sodium_flux.J_mc_Na",
    //     model_entity2: "",
    //     protein_name: "http://purl.obolibrary.org/obo/PR_P13866",
    //     sink_fma: "http://identifiers.org/fma/FMA:66836",
    //     sink_fma2: "",
    //     solute_chebi: "http://identifiers.org/chebi/CHEBI:29101",
    //     solute_chebi2: "",
    //     solute_text: "Na+",
    //     solute_text2: "",
    //     source_fma: "http://identifiers.org/fma/FMA:74550",
    //     source_fma2: "",
    //     variable_text: "J_mc_Na",
    //     variable_text2: "flux"
    // }
    // ,
    // {
    //     med_fma: "http://identifiers.org/fma/FMA:84666",
    //     med_pr: undefined,
    //     med_pr_text: "low affinity sodium-glucose cotransporter (mouse)",
    //     med_pr_text_syn: "Q9ET37",
    //     model_entity: "mackenzie_1996.cellml#NBC_current.J_Na",
    //     model_entity2: "mackenzie_1996.cellml#NBC_current.J_Na",
    //     protein_name: "http://purl.obolibrary.org/obo/PR_Q9ET37",
    //     sink_fma: "http://identifiers.org/fma/FMA:74550",
    //     sink_fma2: "http://identifiers.org/fma/FMA:66836",
    //     solute_chebi: "http://identifiers.org/chebi/CHEBI:29101",
    //     solute_chebi2: "http://identifiers.org/chebi/CHEBI:29101",
    //     solute_text: "Na+",
    //     solute_text2: "Na+",
    //     source_fma: "http://identifiers.org/fma/FMA:66836",
    //     source_fma2: "http://identifiers.org/fma/FMA:74550",
    //     variable_text: "J_Na",
    //     variable_text2: "J_Na"
    // },
    // {
    //     med_fma: "http://identifiers.org/fma/FMA:84666",
    //     med_pr: "http://purl.obolibrary.org/obo/PR_000014527",
    //     med_pr_text: "amiloride-sensitive sodium channel subunit alpha",
    //     med_pr_text_syn: "SCNN1",
    //     model_entity: "chang_fujita_b_1999.cellml#mc_sodium_flux.G_mc_Na",
    //     model_entity2: "",
    //     protein_name: "http://purl.obolibrary.org/obo/PR_P13866",
    //     sink_fma: "http://identifiers.org/fma/FMA:66836",
    //     sink_fma2: "channel",
    //     solute_chebi: "http://identifiers.org/chebi/CHEBI:29101",
    //     solute_chebi2: "channel",
    //     solute_text: "Na+",
    //     solute_text2: "channel",
    //     source_fma: "http://identifiers.org/fma/FMA:74550",
    //     source_fma2: "channel",
    //     variable_text: "G_mc_Na",
    //     variable_text2: "channel"
    // },
    // {
    //     med_fma: "http://identifiers.org/fma/FMA:84669",
    //     med_pr: "http://purl.obolibrary.org/obo/PR_Q06393",
    //     med_pr_text: "chloride channel protein ClC-Ka (rat)",
    //     med_pr_text_syn: "CLCNK1",
    //     model_entity: "chang_fujita_b_1999.cellml#sc_chloride_flux.G_sc_Cl",
    //     model_entity2: "",
    //     protein_name: "http://purl.obolibrary.org/obo/PR_P13866",
    //     sink_fma: "http://identifiers.org/fma/FMA:66836",
    //     sink_fma2: "channel",
    //     solute_chebi: "http://identifiers.org/chebi/CHEBI:17996",
    //     solute_chebi2: "channel",
    //     solute_text: "Cl-",
    //     solute_text2: "channel",
    //     source_fma: "http://identifiers.org/fma/FMA:9673",
    //     source_fma2: "channel",
    //     variable_text: "G_sc_Cl",
    //     variable_text2: "channel"
    // }
];

var recommender = function (combinedMembrane) {

    $(document).ready(function () {
        ajaxUtils.sendGetRequest(
            sparqlUtils.epithelialHtml,
            function (epithelialHtmlContent) {
                $("#main-content").html(epithelialHtmlContent);
                ajaxUtils.sendGetRequest(sparqlUtils.epithelialHtml, epithelialplatform, false);
            },
            false);
    });

    var epithelialplatform = function () {

        var relatedModel = [], membraneModelObj = [], alternativeModelObj = [], relatedModelObj = [],
            modelEntityObj = [], membraneModelID = [], proteinName, proteinText, cellmlModel, biological_meaning,
            biological_meaning2, speciesName, geneName, idProtein = 0, idAltProtein = 0, idMembrane = 0,
            locationOfModel, typeOfModel, cthis, icircleGlobal, organIndex, model_entity, model_entity2,
            relatedModelEntity = [], cotransporterList = [], counter = 0;

        var dx = [], dy = [], dxcircletext = [], dycircletext = [], dxtext = [], dytext = [],
            dxtext2 = [], dytext2 = [], dx1line = [], dy1line = [], dx2line = [], dy2line = [],
            dx1line2 = [], dy1line2 = [], dx2line2 = [], dy2line2 = [], line = [], mindex, id = 0;

        var i, j, msaveIDflag = false;

        console.log("combinedMembrane: ", combinedMembrane);

        var g = $("#svgVisualize"),
            wth = 2000, // 1200
            hth = 900,
            width = 300,
            height = 400;

        var w = 800,
            h = height + 500; // Init 400 + 500 = 900

        var svg = d3.select("#svgVisualize").append("svg")
            .attr("width", wth)
            .attr("height", hth);

        var newg = svg.append("g")
            .attr("id", "newgid")
            .data([{x: w / 3, y: height / 3}]);

        // draw svg platform
        var markerWidth = 4, markerHeight = 4;
        svgPlatform.svgPlatform(svg, newg, height, width, w, h, markerWidth, markerHeight);

        // line apical and basolateral
        var x = $("rect")[0].x.baseVal.value;
        var y = $("rect")[0].y.baseVal.value;

        var lineapical = newg.append("line")
            .attr("id", sparqlUtils.apicalID)
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
            .attr("id", sparqlUtils.basolateralID)
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

        // Circle and line arrow from lumen to cytosol
        var xrect = $("rect")[0].x.baseVal.value,
            yrect = $("rect")[0].y.baseVal.value;

        // Paracellular membrane
        var xprect = $("rect")[4].x.baseVal.value,
            yprect = $("rect")[4].y.baseVal.value,
            xpvalue = xprect + 10,
            ypvalue = yprect + 25,
            ypdistance = 35;

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
            ydistancechk = 50, yinitialchk = 185, ytextinitialchk = 200;

        var update = function () {
            for (i = 0; i < combinedMembrane.length; i++) {
                checkedchk[i] = checkBox[i].checked();
                if (checkedchk[i] == true) {
                    circlewithlineg[i].call(d3.drag().on("drag", dragcircle).on("end", dropcircle));
                }
                else {
                    circlewithlineg[i].call(d3.drag().on("end", dragcircleunchecked));
                }
            }
        };

        var combinedMemChk = function (index) {
            for (i = index; i < combinedMembrane.length; i++) {
                checkBox[i] = new miscellaneous.d3CheckBox();
            }

            for (i = index; i < combinedMembrane.length; i++) {
                // var textvaluechk = combinedMembrane[i].variable_text + " " + combinedMembrane[i].variable_text2;
                var textvaluechk = combinedMembrane[i].med_pr_text;
                var indexOfParen = textvaluechk.indexOf("(");
                textvaluechk = textvaluechk.slice(0, indexOfParen - 1) + " (" + combinedMembrane[i].med_pr_text_syn + ")";

                checkBox[i].x(850).y(yinitialchk).checked(false).clickEvent(update);
                checkBox[i].xtext(890).ytext(ytextinitialchk).text("" + textvaluechk + "");

                checkboxsvg.call(checkBox[i]);

                yinitialchk += ydistancechk;
                ytextinitialchk += ydistancechk;
            }
        }

        // INITIAL call
        combinedMemChk(0);

        $(document).on("click", function () {
            var totalCheckboxes = $("input:checkbox").length,
                numberOfChecked = $("input:checkbox:checked").length,
                numberOfNotChecked = totalCheckboxes - numberOfChecked;

            console.log("click event -> totalCheckboxes, numberOfChecked, numberNotChecked: ",
                totalCheckboxes, numberOfChecked, numberOfNotChecked);

            $("input[type='checkbox']").prop("checked", function (i, val) {
                if (val == false) {
                    $(this).prop({disabled: true});
                }
                return val;
            });

            if (totalCheckboxes == numberOfNotChecked) {
                $("input[type='checkbox']").prop({
                    disabled: false
                });
            }
        });

        // apical, basolateral and paracellular membrane
        var combinedMemFunc = function (index, msaveIDflag) {

            console.log("combinedMemFunc: combinedMembrane -> ", combinedMembrane);

            for (i = index; i < combinedMembrane.length; i++) {
                model_entity = combinedMembrane[i].model_entity;

                if (combinedMembrane[i].model_entity2 != undefined)
                    model_entity2 = combinedMembrane[i].model_entity2;
                else model_entity2 = "";

                var mediator_fma = combinedMembrane[i].med_fma,
                    mediator_pr = combinedMembrane[i].med_pr,
                    mediator_pr_text = combinedMembrane[i].med_pr_text,
                    mediator_pr_text_syn = combinedMembrane[i].med_pr_text_syn,
                    protein_name = combinedMembrane[i].protein_name,

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
                    textWidth = miscellaneous.getTextWidth(textvalue, 12),
                    tempID;

                if (msaveIDflag == true) {
                    tempID = icircleGlobal;
                }
                else {
                    tempID = circlewithlineg.length;
                }

                /*  Apical Membrane */
                if (mediator_fma == sparqlUtils.apicalID) {
                    // case 1
                    if ((src_fma == sparqlUtils.luminalID && snk_fma == sparqlUtils.cytosolID) &&
                        ((src_fma2 == "" && snk_fma2 == "") || (src_fma2 == sparqlUtils.luminalID && snk_fma2 == sparqlUtils.cytosolID))) {

                        console.log("case 1 sparqlUtils.luminalID ==> sparqlUtils.cytosolID and channel: ", yvalue, cyvalue);

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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.apicalID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalue += ydistance;
                        cyvalue += ydistance;

                        console.log("case 1 2 sparqlUtils.luminalID ==> sparqlUtils.cytosolID and channel: ", yvalue, cyvalue);
                    }

                    // case 2
                    if ((src_fma == sparqlUtils.cytosolID && snk_fma == sparqlUtils.luminalID) &&
                        ((src_fma2 == "" && snk_fma2 == "") || (src_fma2 == sparqlUtils.cytosolID && snk_fma2 == sparqlUtils.luminalID))) {
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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.apicalID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalue += ydistance;
                        cyvalue += ydistance;
                    }

                    // case 3
                    if ((src_fma == sparqlUtils.luminalID && snk_fma == sparqlUtils.cytosolID) && (src_fma2 == sparqlUtils.cytosolID && snk_fma2 == sparqlUtils.luminalID)) {
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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.apicalID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalue += ydistance;
                        cyvalue += ydistance;
                    }

                    // case 4
                    if ((src_fma == sparqlUtils.cytosolID && snk_fma == sparqlUtils.luminalID) && (src_fma2 == sparqlUtils.luminalID && snk_fma2 == sparqlUtils.cytosolID)) {
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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.apicalID)
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

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalue += ydistance;
                        cyvalue += ydistance;
                    }

                    // case 5
                    if ((src_fma == sparqlUtils.luminalID && snk_fma == sparqlUtils.cytosolID) && (textvalue2 == "channel")) {
                        console.log("case 5 sparqlUtils.cytosolID ==> sparqlUtils.luminalID and channel: ", yvalue, cyvalue);

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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.apicalID)
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
                            .attr("cursor", "move");

                        // text inside polygon
                        var polygontext = polygong.append("g").data([{x: xvalue + 12, y: yvalue + 4}]);
                        circlewithtext[i] = polygontext.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x;
                                return d.x;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y;
                                return d.y;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        linewithlineg2[i] = "";
                        linewithtextg2[i] = "";
                        dx1line2[i] = "";
                        dy1line2[i] = "";
                        dx2line2[i] = "";
                        dy2line2[i] = "";
                        dxtext2[i] = "";
                        dytext2[i] = "";

                        // increment y-axis of line and circle
                        // circle"s radius 20
                        // polygon - probably radius distance from middle point is 10
                        // yvalue += ydistance - 20;
                        // cyvalue += ydistance - 20;

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        yvalue += ydistance;
                        cyvalue += ydistance;

                        console.log("case 5 2 sparqlUtils.cytosolID ==> sparqlUtils.luminalID and channel: ", yvalue, cyvalue);
                    }

                    // case 6
                    if ((src_fma == sparqlUtils.cytosolID && snk_fma == sparqlUtils.luminalID) && (textvalue2 == "channel")) {

                        console.log("case 6 sparqlUtils.cytosolID ==> sparqlUtils.luminalID and channel: ", yvalue, cyvalue);

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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.apicalID)
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
                            .attr("cursor", "move");

                        // text inside polygon
                        var polygontext = polygong.append("g").data([{x: xvalue + 12, y: yvalue + 4}]);
                        circlewithtext[i] = polygontext.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x;
                                return d.x;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y;
                                return d.y;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        linewithlineg2[i] = "";
                        linewithtextg2[i] = "";
                        dx1line2[i] = "";
                        dy1line2[i] = "";
                        dx2line2[i] = "";
                        dy2line2[i] = "";
                        dxtext2[i] = "";
                        dytext2[i] = "";

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalue += ydistance;
                        cyvalue += ydistance;

                        console.log("case 6 2 sparqlUtils.cytosolID ==> sparqlUtils.luminalID and channel: ", yvalue, cyvalue);
                    }
                }

                /*  Basolateral Membrane */
                if (mediator_fma == sparqlUtils.basolateralID) {
                    // case 1
                    if ((src_fma == sparqlUtils.cytosolID && snk_fma == sparqlUtils.interstitialID) &&
                        ((src_fma2 == "" && snk_fma2 == "") || (src_fma2 == sparqlUtils.cytosolID && snk_fma2 == sparqlUtils.interstitialID))) {

                        console.log("case 1 sparqlUtils.cytosolID ==> sparqlUtils.interstitialID and channel: ", yvalueb, cyvalueb);

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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.basolateralID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalueb += ydistance;
                        cyvalueb += ydistance;

                        console.log("case 1 2 sparqlUtils.cytosolID ==> sparqlUtils.interstitialID and channel: ", yvalueb, cyvalueb);
                    }

                    // case 2
                    if ((src_fma == sparqlUtils.interstitialID && snk_fma == sparqlUtils.cytosolID) &&
                        ((src_fma2 == "" && snk_fma2 == "") || (src_fma2 == sparqlUtils.interstitialID && snk_fma2 == sparqlUtils.cytosolID))) {
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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.basolateralID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalueb += ydistance;
                        cyvalueb += ydistance;
                    }

                    // case 3
                    if ((src_fma == sparqlUtils.cytosolID && snk_fma == sparqlUtils.interstitialID) && (src_fma2 == sparqlUtils.interstitialID && snk_fma2 == sparqlUtils.cytosolID)) {
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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.basolateralID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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
                                x: xvalue - 30 + width, y: yvalueb + radius * 2 + markerHeight
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalueb += ydistance;
                        cyvalueb += ydistance;
                    }

                    // case 4
                    if ((src_fma == sparqlUtils.interstitialID && snk_fma == sparqlUtils.cytosolID) && (src_fma2 == sparqlUtils.cytosolID && snk_fma2 == sparqlUtils.interstitialID)) {
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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.basolateralID)
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
                            .attr("cursor", "move");

                        // protein name inside this circle
                        circlewithtext[i] = linegcircle.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x - 15;
                                return d.x - 15;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y + 23;
                                return d.y + 23;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("fontWeight", "bold")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        if (textvalue2 == "flux") {
                            linewithlineg2[i] = "";
                            linewithtextg2[i] = "";
                            dx1line2[i] = "";
                            dy1line2[i] = "";
                            dx2line2[i] = "";
                            dy2line2[i] = "";
                            dxtext2[i] = "";
                            dytext2[i] = "";
                        }

                        if (textvalue2 != "flux") {
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

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalueb += ydistance;
                        cyvalueb += ydistance;
                    }

                    // case 5
                    if ((src_fma == sparqlUtils.cytosolID && snk_fma == sparqlUtils.interstitialID) && (textvalue2 == "channel")) {

                        console.log("case 5 sparqlUtils.cytosolID ==> sparqlUtils.interstitialID and channel: ", yvalueb, cyvalueb);

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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.basolateralID)
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
                            .attr("cursor", "move");

                        var polygontext = polygong.append("g").data([{x: xvalue + 12 + width, y: yvalueb + 4}]);
                        circlewithtext[i] = polygontext.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x;
                                return d.x;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y;
                                return d.y;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        linewithlineg2[i] = "";
                        linewithtextg2[i] = "";
                        dx1line2[i] = "";
                        dy1line2[i] = "";
                        dx2line2[i] = "";
                        dy2line2[i] = "";
                        dxtext2[i] = "";
                        dytext2[i] = "";

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalueb += ydistance;
                        cyvalueb += ydistance;

                        console.log("case 5 2 sparqlUtils.cytosolID ==> sparqlUtils.interstitialID and channel: ", yvalueb, cyvalueb);
                    }

                    // case 6
                    if ((src_fma == sparqlUtils.interstitialID && snk_fma == sparqlUtils.cytosolID) && (textvalue2 == "channel")) {

                        console.log("case 6 sparqlUtils.cytosolID ==> sparqlUtils.interstitialID and channel: ", yvalueb, cyvalueb);

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
                                return [
                                    model_entity, model_entity2,
                                    textvalue, textvalue2,
                                    src_fma, snk_fma, src_fma2, snk_fma2,
                                    mediator_fma, mediator_pr,
                                    solute_chebi, solute_chebi2, solute_text, solute_text2,
                                    mediator_pr_text, mediator_pr_text_syn, protein_name
                                ];
                            })
                            .attr("index", tempID)
                            .attr("membrane", sparqlUtils.basolateralID)
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
                            .attr("cursor", "move");

                        var polygontext = polygong.append("g").data([{x: xvalue + 12 + width, y: yvalueb + 4}]);
                        circlewithtext[i] = polygontext.append("text")
                            .attr("id", "circlewithtext" + tempID)
                            .attr("x", function (d) {
                                dxcircletext[i] = d.x;
                                return d.x;
                            })
                            .attr("y", function (d) {
                                dycircletext[i] = d.y;
                                return d.y;
                            })
                            .attr("font-size", "10px")
                            .attr("fill", "red")
                            .attr("cursor", "move")
                            .text(mediator_pr_text_syn);

                        linewithlineg2[i] = "";
                        linewithtextg2[i] = "";
                        dx1line2[i] = "";
                        dy1line2[i] = "";
                        dx2line2[i] = "";
                        dy2line2[i] = "";
                        dxtext2[i] = "";
                        dytext2[i] = "";

                        if (msaveIDflag == true) {
                            msaveIDflag = false;
                            break;
                        }

                        // increment y-axis of line and circle
                        yvalueb += ydistance;
                        cyvalueb += ydistance;

                        console.log("case 6 2 sparqlUtils.cytosolID ==> sparqlUtils.interstitialID and channel: ", yvalueb, cyvalueb);
                    }
                }

                /*  Paracellular Membrane */
                if (textvalue2 == "diffusiveflux") {
                    var lineg = newg.append("g").data([{x: xpvalue, y: ypvalue + 5}]);
                    circlewithlineg[i] = lineg.append("text") // linewithtextg
                        .attr("id", "linewithtextg" + tempID)
                        .attr("idParacellular", function (d) {
                            return [
                                model_entity, model_entity2,
                                textvalue, textvalue2,
                                src_fma, snk_fma, src_fma2, snk_fma2,
                                mediator_fma, mediator_pr,
                                solute_chebi, solute_chebi2, solute_text, solute_text2,
                                mediator_pr_text, mediator_pr_text_syn, protein_name
                            ];
                        })
                        .attr("index", tempID)
                        .attr("membrane", sparqlUtils.paracellularID)
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
                        .text(solute_text);

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

                    dxcircletext[i] = "";
                    dycircletext[i] = "";
                    linewithtextg[i] = "";
                    linewithlineg2[i] = "";
                    linewithtextg2[i] = "";
                    dx1line2[i] = "";
                    dy1line2[i] = "";
                    dx2line2[i] = "";
                    dy2line2[i] = "";
                    dxtext[i] = "";
                    dytext[i] = "";
                    dxtext2[i] = "";
                    dytext2[i] = "";

                    ypvalue += ypdistance;
                }
            }
        };

        // INITIAL call
        combinedMemFunc(0, msaveIDflag);

        var lineb_id, circle_id, cx, cy, lt, gt;

        var dragcircle = function () {

            // div.style("display", "none");

            icircleGlobal = $(this).attr("index");
            cthis = this;

            var dx = d3.event.dx;
            var dy = d3.event.dy;

            if ($(this).prop("tagName") == "circle") {
                d3.select(this)
                    .attr("cx", parseFloat($(this).prop("cx").baseVal.value) + dx)
                    .attr("cy", parseFloat($(this).prop("cy").baseVal.value) + dy);
            }

            if ($(this).prop("tagName") == "text") {
                circlewithlineg[icircleGlobal] // text (probably for paracellular flux)
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
                if (circlewithtext[icircleGlobal] != "") {
                    // text inside circle
                    circlewithtext[icircleGlobal]
                        .attr("x", parseFloat(d3.select("#" + "circlewithtext" + icircleGlobal).attr("x")) + dx)
                        .attr("y", parseFloat(d3.select("#" + "circlewithtext" + icircleGlobal).attr("y")) + dy);
                }
            }

            if (linewithlineg[icircleGlobal] != undefined) {
                if (linewithlineg[icircleGlobal] != "") {
                    // line 1
                    linewithlineg[icircleGlobal]
                        .attr("x1", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("x1")) + dx)
                        .attr("y1", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("y1")) + dy)
                        .attr("x2", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("x2")) + dx)
                        .attr("y2", parseFloat(d3.select("#" + "linewithlineg" + icircleGlobal).attr("y2")) + dy);
                }
            }

            if (linewithtextg[icircleGlobal] != undefined) {
                if (linewithtextg[icircleGlobal] != "") {
                    // text 1
                    linewithtextg[icircleGlobal]
                        .attr("x", parseFloat(d3.select("#" + "linewithtextg" + icircleGlobal).attr("x")) + dx)
                        .attr("y", parseFloat(d3.select("#" + "linewithtextg" + icircleGlobal).attr("y")) + dy);
                }
            }

            if (linewithlineg2[icircleGlobal] != undefined) {
                if (linewithlineg2[icircleGlobal] != "") {
                    // line 2
                    linewithlineg2[icircleGlobal]
                        .attr("x1", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("x1")) + dx)
                        .attr("y1", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("y1")) + dy)
                        .attr("x2", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("x2")) + dx)
                        .attr("y2", parseFloat(d3.select("#" + "linewithlineg2" + icircleGlobal).attr("y2")) + dy);
                }
            }

            if (linewithtextg2[icircleGlobal] != undefined) {
                if (linewithtextg2[icircleGlobal] != "") {
                    // text 2
                    linewithtextg2[icircleGlobal]
                        .attr("x", parseFloat(d3.select("#" + "linewithtextg2" + icircleGlobal).attr("x")) + dx)
                        .attr("y", parseFloat(d3.select("#" + "linewithtextg2" + icircleGlobal).attr("y")) + dy);
                }
            }

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

            // detect basolateralMembrane - 0 apical, 1 basolateralMembrane
            var lineb_x = $($("line")[mindex]).prop("x1").baseVal.value;

            if ($(this).prop("tagName") == "circle") {
                cx = $(this).prop("cx").baseVal.value;
                cy = $(this).prop("cy").baseVal.value;
            }

            if ($(this).prop("tagName") == "polygon") {
                cx = event.x;
                cy = event.y;
            }

            // paracellular
            if ($(this).prop("tagName") == "text") { // OR if ($(this).attr("membrane") == sparqlUtils.paracellularID) {}
                cx = $(this).attr("x");
                cy = $(this).attr("y");
            }

            lineb_id = $($("line")[mindex]).prop("id");
            circle_id = miscellaneous.circleIDSplitUtils($(this), sparqlUtils.paracellularID);

            // determine position on apical or basolateral membrane
            if ($(this).prop("tagName") == "circle") {
                lt = lineb_x - radius / 2;
                gt = lineb_x + radius / 2;
            }
            else if ($(this).prop("tagName") == "polygon") {
                lt = lineb_x + polygonlineLen + 40; // + 60
                gt = lineb_x + polygonlineLen * 2; // + 60
            }

            if ((cx >= lt && cx <= gt) && (lineb_id != circle_id)) {
                $($("line")[mindex]).css("stroke", "yellow");
            }
            else {
                if (mindex == 1)
                    $($("line")[mindex]).css("stroke", "orange");
                else
                    $($("line")[mindex]).css("stroke", "green");
            }
        };

        // remaining part of dropcircle function
        var dropcircleExtended = function (membrane) {

            var query;

            query = "SELECT ?located_in " +
                "WHERE { GRAPH ?g { <" + cellmlModel + "> <http://www.obofoundry.org/ro/ro.owl#located_in> ?located_in . " +
                "}}";

            // location of that cellml model
            ajaxUtils.sendPostRequest(
                sparqlUtils.endpoint,
                query,
                function (jsonLocatedin) {

                    // console.log("jsonLocatedin: ", jsonLocatedin);

                    var jsonLocatedinCounter = 0;
                    // Type of model - kidney, lungs, etc
                    for (i = 0; i < jsonLocatedin.results.bindings.length; i++) {
                        for (j = 0; j < sparqlUtils.organ.length; j++) {
                            for (var k = 0; k < sparqlUtils.organ[j].key.length; k++) {
                                if (jsonLocatedin.results.bindings[i].located_in.value == sparqlUtils.organ[j].key[k].key)
                                    jsonLocatedinCounter++;

                                if (jsonLocatedinCounter == jsonLocatedin.results.bindings.length) {
                                    typeOfModel = sparqlUtils.organ[j].value;
                                    organIndex = j;
                                    break;
                                }
                            }
                            if (jsonLocatedinCounter == jsonLocatedin.results.bindings.length)
                                break;
                        }
                        if (jsonLocatedinCounter == jsonLocatedin.results.bindings.length)
                            break;
                    }

                    locationOfModel = "";
                    jsonLocatedinCounter = 0;
                    // location of the above type of model
                    for (i = 0; i < jsonLocatedin.results.bindings.length; i++) {
                        for (j = 0; j < sparqlUtils.organ[organIndex].key.length; j++) {
                            if (jsonLocatedin.results.bindings[i].located_in.value == sparqlUtils.organ[organIndex].key[j].key) {
                                locationOfModel += sparqlUtils.organ[organIndex].key[j].value;

                                if (i == jsonLocatedin.results.bindings.length - 1)
                                    locationOfModel += ".";
                                else
                                    locationOfModel += ", ";

                                jsonLocatedinCounter++;
                            }
                            if (jsonLocatedinCounter == jsonLocatedin.results.bindings.length)
                                break;
                        }
                        if (jsonLocatedinCounter == jsonLocatedin.results.bindings.length)
                            break;
                    }

                    // related cellml model, i.e. kidney, lungs, etc
                    query = "SELECT ?cellmlmodel ?located_in " +
                        "WHERE { GRAPH ?g { ?cellmlmodel <http://www.obofoundry.org/ro/ro.owl#located_in> ?located_in. " +
                        "}}";

                    ajaxUtils.sendPostRequest(
                        sparqlUtils.endpoint,
                        query,
                        function (jsonRelatedModel) {

                            // console.log("jsonRelatedModel: ", jsonRelatedModel);

                            for (i = 0; i < jsonRelatedModel.results.bindings.length; i++) {
                                for (j = 0; j < sparqlUtils.organ[organIndex].key.length; j++) {
                                    if (jsonRelatedModel.results.bindings[i].located_in.value == sparqlUtils.organ[organIndex].key[j].key) {
                                        // parsing
                                        var tempModel = jsonRelatedModel.results.bindings[i].cellmlmodel.value;
                                        var indexOfHash = tempModel.search("#");
                                        tempModel = tempModel.slice(0, indexOfHash);

                                        relatedModel.push(tempModel);

                                        break;
                                    }
                                }
                            }

                            relatedModel = miscellaneous.uniqueify(relatedModel);

                            // kidney, lungs, heart, etc
                            // console.log("relatedModel: ", relatedModel);

                            var alternativeCellmlArray = [], tempcellmlModel,
                                indexOfHash = cellmlModel.search("#");
                            tempcellmlModel = cellmlModel.slice(0, indexOfHash);
                            for (i = 0; i < relatedModel.length; i++) {
                                if (relatedModel[i] != tempcellmlModel) {
                                    alternativeCellmlArray.push(relatedModel[i]);
                                }
                            }

                            relatedCellmlModel(relatedModel, alternativeCellmlArray, membrane);

                        }, true);
                }, true);
        };

        var dropcircle = function () {

            // div.style("display", "none");

            if ((cx >= lt && cx <= gt) && (lineb_id != circle_id)) {

                if ((cx >= lt && cx <= gt) && (lineb_id != circle_id)) {

                    $($("line")[mindex]).css("stroke", "yellow");

                    var m = new welcomeModal({
                        id: "myWelcomeModal",
                        header: "Are you sure you want to move?",
                        footer: "My footer",
                        footerCloseButton: "No",
                        footerSaveButton: "Yes"
                    });

                    $("#myWelcomeModal").modal({backdrop: "static", keyboard: false});
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

                                // reinitialization
                                reinitVariable();
                                return;
                            })

                            // Yes button clicked!!
                            $("#saveID").click(function (event) {

                                console.log("Yes clicked!");
                                console.log("first save button clicked!");

                                var m = new Modal({
                                    id: "myModal",
                                    header: "Recommender System",
                                    footer: "My footer",
                                    footerCloseButton: "Close",
                                    footerSaveButton: "Save"
                                });

                                $("#myModal").modal({backdrop: "static", keyboard: false});
                                m.getBody().html("<div id=modalBody></div>");
                                m.show();

                                miscellaneous.showLoading("#modalBody");

                                var circleID = miscellaneous.circleIDSplitUtils($(cthis), sparqlUtils.paracellularID);
                                console.log("circleID in myWelcomeModal: ", circleID);

                                // parsing
                                cellmlModel = circleID[0];
                                var indexOfHash = cellmlModel.search("#"), query;
                                cellmlModel = cellmlModel.slice(0, indexOfHash);

                                cellmlModel = cellmlModel + "#" + cellmlModel.slice(0, cellmlModel.indexOf("."));

                                // console.log("cellmlModel: ", cellmlModel);
                                query = sparqlUtils.circleIDmyWelcomeWindowSPARQL(circleID, cellmlModel);

                                // console.log("query: ", query);

                                // protein name
                                ajaxUtils.sendPostRequest(
                                    sparqlUtils.endpoint,
                                    query,
                                    function (jsonModel) {

                                        console.log("jsonModel: ", jsonModel);

                                        if (jsonModel.results.bindings.length == 0)
                                            proteinName = undefined;
                                        else
                                            proteinName = jsonModel.results.bindings[0].Protein.value;

                                        var endpointprOLS;
                                        if (proteinName != undefined)
                                            endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" + proteinName;
                                        else
                                            endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr";

                                        ajaxUtils.sendGetRequest(
                                            endpointprOLS,
                                            function (jsonPr) {

                                                console.log("jsonPr: ", jsonPr);

                                                var endpointgeneOLS;
                                                if (jsonPr._embedded == undefined || jsonPr._embedded.terms[0]._links.has_gene_template == undefined)
                                                    endpointgeneOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr";
                                                else
                                                    endpointgeneOLS = jsonPr._embedded.terms[0]._links.has_gene_template.href;

                                                ajaxUtils.sendGetRequest(
                                                    endpointgeneOLS,
                                                    function (jsonGene) {

                                                        console.log("jsonGene: ", jsonGene);

                                                        var endpointspeciesOLS;
                                                        if (jsonPr._embedded == undefined || jsonPr._embedded.terms[0]._links.only_in_taxon == undefined)
                                                            endpointspeciesOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr";
                                                        else
                                                            endpointspeciesOLS = jsonPr._embedded.terms[0]._links.only_in_taxon.href;

                                                        ajaxUtils.sendGetRequest(
                                                            endpointspeciesOLS,
                                                            function (jsonSpecies) {

                                                                console.log("jsonSpecies: ", jsonSpecies);

                                                                if (jsonPr._embedded == undefined)
                                                                    proteinText = "undefined";
                                                                else {
                                                                    proteinText = jsonPr._embedded.terms[0].label;
                                                                    proteinText = proteinText.slice(0, proteinText.indexOf("(") - 1);
                                                                }

                                                                if (jsonModel.results.bindings.length == 0)
                                                                    biological_meaning = "";
                                                                else {
                                                                    biological_meaning = jsonModel.results.bindings[0].Biological_meaning.value;

                                                                    if (circleID[1] == "")
                                                                        biological_meaning2 = "";
                                                                    else
                                                                        biological_meaning2 = jsonModel.results.bindings[0].Biological_meaning2.value;
                                                                }

                                                                if (jsonSpecies._embedded == undefined)
                                                                    speciesName = "undefined";
                                                                else
                                                                    speciesName = jsonSpecies._embedded.terms[0].label;

                                                                if (jsonGene._embedded == undefined)
                                                                    geneName = "undefined";
                                                                else {
                                                                    geneName = jsonGene._embedded.terms[0].label;
                                                                    geneName = geneName.slice(0, geneName.indexOf("(") - 1);

                                                                    dropcircleExtended(circleID[8]);
                                                                }
                                                            }, true);
                                                    }, true);
                                            }, true);
                                    }, true);

                                jQuery(window).trigger("resize");

                                // reinitialization
                                reinitVariable();
                                return;
                            });
                        };

                        /**
                         * Set header text. It makes sense only if the options.header is logical true.
                         * @param {String} html New header text.
                         */
                        $this.setHeader = function (html) {
                            $this.window.find(".modal-title").html(html);
                        };

                        /**
                         * Show modal window
                         */
                        $this.show = function () {
                            $this.window.modal("show");
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
        };

        var dragcircleunchecked = function () {
            d3.select(this).classed("dragging", false);
        };

        // related kidney, lungs, etc model
        var relatedCellmlModel = function (relatedModel, alternativeCellmlArray, membrane) {

            var modelname, indexOfcellml, query;
            if (relatedModel[idProtein] == undefined) {
                modelname = undefined;
            }
            else {
                indexOfcellml = relatedModel[idProtein].search(".cellml");
                modelname = relatedModel[idProtein] + "#" + relatedModel[idProtein].slice(0, indexOfcellml);
            }
            console.log("modelname in relatedCellmlModel: ", modelname);

            query = "SELECT ?Protein ?workspaceName " +
                "WHERE { GRAPH ?workspaceName { <" + modelname + "> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . " +
                "}}";

            ajaxUtils.sendPostRequest(
                sparqlUtils.endpoint,
                query,
                function (jsonProtein) {

                    var endpointprOLS;
                    if (jsonProtein.results.bindings.length == 0)
                        endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr";
                    else {
                        endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" +
                            jsonProtein.results.bindings[0].Protein.value;
                    }

                    ajaxUtils.sendGetRequest(
                        endpointprOLS,
                        function (jsonPr) {

                            if (jsonProtein.results.bindings.length != 0) {

                                // console.log("jsonProtein in relatedCellmlModel: ", jsonProtein);
                                // console.log("jsonPr in relatedCellmlModel: ", jsonPr);

                                relatedModelObj.push({
                                    protein: jsonProtein.results.bindings[0].Protein.value,
                                    prname: jsonPr._embedded.terms[0].label,
                                    workspaceName: jsonProtein.results.bindings[0].workspaceName.value,
                                    modelEntity: relatedModel[idProtein] // relatedModel which have #protein
                                });
                            }

                            if (idProtein == relatedModel.length - 1) {
                                alternativeCellmlModel(alternativeCellmlArray, membrane);
                                return;
                            }

                            idProtein++;

                            relatedCellmlModel(relatedModel, alternativeCellmlArray, membrane);
                        },
                        true);
                },
                true);
        };

        // alternative model of a dragged transporter, e.g. rat NHE3, mouse NHE3
        var alternativeCellmlModel = function (alternativeCellmlArray, membrane) {

            console.log("alternativeCellmlArray: ", alternativeCellmlArray[idAltProtein], membrane, alternativeCellmlArray);
            var modelname, indexOfcellml, query, endpointOLS;
            if (alternativeCellmlArray[idAltProtein] == undefined) {
                modelname = undefined;
            }
            else {
                indexOfcellml = alternativeCellmlArray[idAltProtein].search(".cellml");
                modelname = alternativeCellmlArray[idAltProtein] + "#" +
                    alternativeCellmlArray[idAltProtein].slice(0, indexOfcellml);
            }
            console.log("modelname in alternativeCellmlModel: ", modelname);

            query = "SELECT ?Protein ?workspaceName " +
                "WHERE { GRAPH ?workspaceName { <" + modelname + "> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . " +
                "}}";

            ajaxUtils.sendPostRequest(
                sparqlUtils.endpoint,
                query,
                function (jsonAltProtein) {

                    // console.log("jsonAltProtein in alternativeCellmlModel: ", jsonAltProtein);

                    if (jsonAltProtein.results.bindings.length == 0)
                        endpointOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr";
                    else {
                        endpointOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" +
                            jsonAltProtein.results.bindings[0].Protein.value;
                    }

                    ajaxUtils.sendGetRequest(
                        endpointOLS,
                        function (jsonOLSObj) {

                            if (jsonAltProtein.results.bindings.length != 0) {

                                if (jsonAltProtein.results.bindings[0].Protein.value == proteinName) { // comment this

                                    // console.log("jsonAltProtein.results.bindings[0].Protein.value: ", jsonAltProtein.results.bindings[0].Protein.value);
                                    // console.log("proteinName: ", proteinName);

                                    alternativeModelObj.push({
                                        protein: jsonAltProtein.results.bindings[0].Protein.value,
                                        prname: jsonOLSObj._embedded.terms[0].label,
                                        modelEntity: modelname,
                                        workspaceName: jsonAltProtein.results.bindings[0].workspaceName.value
                                    });
                                }
                            }

                            idAltProtein++;

                            if (idAltProtein == alternativeCellmlArray.length - 1) {

                                // If apical Then basolateral and vice versa
                                var membraneName;
                                if (membrane == sparqlUtils.apicalID) {
                                    membrane = sparqlUtils.basolateralID;
                                    membraneName = "Basolateral membrane";

                                    console.log("membrane TESTING: ", membrane);
                                }
                                else if (membrane == sparqlUtils.basolateralID) {
                                    membrane = sparqlUtils.apicalID;
                                    membraneName = "Apical membrane";

                                    console.log("membrane TESTING: ", membrane);
                                }

                                relatedMembrane(membrane, membraneName, 1);
                                return;
                            }

                            alternativeCellmlModel(alternativeCellmlArray, membrane);
                        },
                        true);
                }, true);
        };

        var makecotransporter = function (membrane1, membrane2, fluxList, membraneName, flag) {

            var query = sparqlUtils.makecotransporterSPARQL(membrane1, membrane2);
            ajaxUtils.sendPostRequest(
                sparqlUtils.endpoint,
                query,
                function (jsonObj) {

                    console.log("jsonObj in makecotransporter: ", jsonObj);
                    var tempProtein = [], tempFMA = [];
                    for (var m in jsonObj.results.bindings) {
                        var tmpuri = jsonObj.results.bindings[m].med_entity_uri.value;

                        if (tmpuri.indexOf("http://purl.obolibrary.org/obo/PR_") != -1) {
                            tempProtein.push(jsonObj.results.bindings[m].med_entity_uri.value);
                        }

                        if (tmpuri.indexOf("http://identifiers.org/fma/FMA:") != -1) {
                            tempFMA.push(jsonObj.results.bindings[m].med_entity_uri.value);
                        }
                    }

                    // console.log("tempProtein, and fma: ", tempProtein, tempFMA);

                    for (var i in tempProtein) {
                        // cotransporter
                        if (tempProtein.length != 0 && tempFMA.length != 0) {
                            cotransporterList.push({
                                "membrane1": membrane1,
                                "membrane2": membrane2
                            });
                        }
                    }

                    counter++;

                    if (counter == miscellaneous.iteration(fluxList.length)) {

                        // delete cotransporter indices from fluxList
                        for (var i in cotransporterList) {
                            for (var j in fluxList) {
                                if (cotransporterList[i].membrane1 == fluxList[j] ||
                                    cotransporterList[i].membrane2 == fluxList[j]) {

                                    fluxList.splice(j, 1);
                                }
                            }
                        }

                        // make cotransproter in modelEntityObj
                        for (var i in cotransporterList) {
                            modelEntityObj.push({
                                "model_entity": cotransporterList[i].membrane1,
                                "model_entity2": cotransporterList[i].membrane2
                            });
                        }

                        // make flux in modelEntityObj
                        for (var i in fluxList) {
                            modelEntityObj.push({
                                "model_entity": fluxList[i],
                                "model_entity2": ""
                            });
                        }

                        console.log("makecotransporter: fluxList -> ", fluxList);
                        console.log("makecotransporter: cotransporterList -> ", cotransporterList);
                        console.log("makecotransporter: modelEntityObj -> ", modelEntityObj);

                        relatedMembraneModel(membraneName, cotransporterList, flag);
                    }
                },
                true);
        };

        // apical or basolateral membrane in PMR
        var relatedMembrane = function (membrane, membraneName, flag) {

            console.log("relatedMembrane: ", membrane, membraneName);

            var circleID = miscellaneous.circleIDSplitUtils($(cthis), sparqlUtils.paracellularID);
            console.log("relatedMembrane circleID: ", circleID);

            // A flux may look for a cotransporter and vice-versa
            var fstCHEBI, sndCHEBI;
            fstCHEBI = circleID[10];
            if (circleID[11] == "" || circleID[11] == "channel" || circleID[11] == "diffusiveflux")
                sndCHEBI = fstCHEBI;
            else sndCHEBI = circleID[11];

            var query = sparqlUtils.relatedMembraneSPARQL(fstCHEBI, sndCHEBI, membrane);

            ajaxUtils.sendPostRequest(
                sparqlUtils.endpoint,
                query,
                function (jsonRelatedMembrane) {

                    console.log("jsonRelatedMembrane: ", jsonRelatedMembrane);

                    var fluxList = [], cotransporterList = [];
                    for (i = 0; i < jsonRelatedMembrane.results.bindings.length; i++) {

                        // allow only related apical or basolateral membrane from my workspace
                        if (jsonRelatedMembrane.results.bindings[i].g.value != sparqlUtils.myWorkspaneName)
                            continue;

                        fluxList.push(jsonRelatedMembrane.results.bindings[i].Model_entity.value);

                        if (circleID[11] != "" || circleID[11] != "channel" || circleID[11] != "diffusiveflux") {
                            fluxList.push(jsonRelatedMembrane.results.bindings[i].Model_entity2.value);
                        }
                    }

                    var tempfluxList = [];
                    for (i = 0; i < fluxList.length; i++) {
                        if (!miscellaneous.isExist(fluxList[i], tempfluxList)) {
                            tempfluxList.push(fluxList[i]);
                        }
                    }

                    fluxList = tempfluxList;
                    if (fluxList.length <= 1) {
                        console.log("fluxList.length <= 1");
                        modelEntityObj.push({
                            "model_entity": fluxList[0],
                            "model_entity2": ""
                        });

                        console.log("relatedMembrane: fluxList -> ", fluxList);
                        console.log("relatedMembrane: cotransporterList -> ", cotransporterList);
                        console.log("relatedMembrane: modelEntityObj -> ", modelEntityObj);

                        relatedMembraneModel(membraneName, cotransporterList, flag);
                    }
                    else {
                        for (i = 0; i < fluxList.length; i++) {
                            for (j = i + 1; j < fluxList.length; j++) {
                                makecotransporter(fluxList[i], fluxList[j], fluxList, membraneName, flag);
                            }
                        }
                    }
                },
                true);
        };

        var source_fma = [], sink_fma = [], med_fma = [], med_pr = [], solute_chebi = [];
        var source_fma2 = [], sink_fma2 = [], solute_chebi2 = [];

        var relatedMembraneModel = function (membraneName, cotransporterList, flag) {

            console.log("flag in relatedMembraneModel: ", flag);

            var tempmembraneModel, indexOfHash, indexOfcellml, modelname, query;
            if (modelEntityObj.length == 0 || modelEntityObj[idMembrane].model_entity == undefined)
                tempmembraneModel = undefined;
            else {
                indexOfHash = modelEntityObj[idMembrane].model_entity.search("#");
                tempmembraneModel = modelEntityObj[idMembrane].model_entity.slice(0, indexOfHash);

                indexOfcellml = tempmembraneModel.search(".cellml");
                modelname = tempmembraneModel.slice(0, indexOfcellml);

                tempmembraneModel = tempmembraneModel + "#" + modelname;
            }

            console.log("relatedMembraneModel: tempmembraneModel ->", tempmembraneModel);
            console.log("relatedMembraneModel: modelEntityObj -> ", modelEntityObj);

            query = "PREFIX ro: <http://www.obofoundry.org/ro/ro.owl#>" +
                "PREFIX dcterms: <http://purl.org/dc/terms/>" +
                "SELECT ?Protein WHERE { <" + tempmembraneModel + "> <http://www.obofoundry.org/ro/ro.owl#modelOf> ?Protein . " +
                "}";

            ajaxUtils.sendPostRequest(
                sparqlUtils.endpoint,
                query,
                function (jsonRelatedMembraneModel) {

                    console.log("relatedMembraneModel: jsonRelatedMembraneModel -> ", jsonRelatedMembraneModel);

                    var endpointprOLS;
                    if (jsonRelatedMembraneModel.results.bindings.length == 0) {
                        showModalWindow(membraneName, flag);
                        return;
                    } else {
                        endpointprOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" +
                            jsonRelatedMembraneModel.results.bindings[0].Protein.value;
                    }

                    ajaxUtils.sendGetRequest(
                        endpointprOLS,
                        function (jsonPr) {

                            var query = sparqlUtils.relatedMembraneModelSPARQL(modelEntityObj[idMembrane].model_entity, modelEntityObj[idMembrane].model_entity2);

                            ajaxUtils.sendPostRequest(
                                sparqlUtils.endpoint,
                                query,
                                function (jsonObjFlux) {
                                    console.log("relatedMembraneModel: jsonObjFlux -> ", jsonObjFlux);

                                    var endpointOLS;
                                    if (jsonObjFlux.results.bindings[0].solute_chebi == undefined) {
                                        endpointOLS = undefined;
                                    }
                                    else {
                                        var chebi_uri = jsonObjFlux.results.bindings[0].solute_chebi.value,
                                            indexofColon = chebi_uri.indexOf("CHEBI:");
                                        chebi_uri = "http://purl.obolibrary.org/obo/CHEBI_" + chebi_uri.slice(indexofColon + 6);
                                        endpointOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/chebi/terms?iri=" + chebi_uri;
                                    }

                                    ajaxUtils.sendGetRequest(
                                        endpointOLS,
                                        function (jsonObjOLSChebi) {

                                            var endpointOLS2;
                                            if (jsonObjFlux.results.bindings[0].solute_chebi2 == undefined) {
                                                endpointOLS2 = undefined;
                                            }
                                            else {
                                                var chebi_uri2 = jsonObjFlux.results.bindings[0].solute_chebi2.value,
                                                    indexofColon2 = chebi_uri2.indexOf("CHEBI:");
                                                chebi_uri2 = "http://purl.obolibrary.org/obo/CHEBI_" + chebi_uri2.slice(indexofColon2 + 6);

                                                endpointOLS2 = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/chebi/terms?iri=" + chebi_uri2;
                                            }

                                            ajaxUtils.sendGetRequest(
                                                endpointOLS2,
                                                function (jsonObjOLSChebi2) {

                                                    for (var i = 0; i < jsonObjFlux.results.bindings.length; i++) {
                                                        // solute chebi
                                                        var temparr = jsonObjOLSChebi._embedded.terms[0].annotation["has_related_synonym"],
                                                            solute_chebi_name;
                                                        for (var m = 0; m < temparr.length; m++) {
                                                            if (temparr[m].slice(-1) == "+" || temparr[m].slice(-1) == "-") {
                                                                solute_chebi_name = temparr[m];
                                                                break;
                                                            }
                                                        }

                                                        if (jsonObjFlux.results.bindings[i].solute_chebi == undefined)
                                                            solute_chebi.push("");
                                                        else
                                                            solute_chebi.push({
                                                                name: solute_chebi_name,
                                                                uri: jsonObjFlux.results.bindings[i].solute_chebi.value
                                                            });

                                                        // solute chebi 2
                                                        var temparr2 = jsonObjOLSChebi2._embedded.terms[0].annotation["has_related_synonym"],
                                                            solute_chebi_name2;
                                                        for (var m = 0; m < temparr2.length; m++) {
                                                            if (temparr2[m].slice(-1) == "+" || temparr2[m].slice(-1) == "-") {
                                                                solute_chebi_name2 = temparr2[m];
                                                                break;
                                                            }
                                                        }

                                                        if (jsonObjFlux.results.bindings[i].solute_chebi2 == undefined)
                                                            solute_chebi2.push("");
                                                        else
                                                            solute_chebi2.push({
                                                                name: solute_chebi_name2,
                                                                uri: jsonObjFlux.results.bindings[i].solute_chebi2.value
                                                            });

                                                        // source fma
                                                        if (jsonObjFlux.results.bindings[i].source_fma == undefined)
                                                            source_fma.push("");
                                                        else
                                                            source_fma.push({fma: jsonObjFlux.results.bindings[i].source_fma.value});

                                                        // source fma 2
                                                        if (jsonObjFlux.results.bindings[i].source_fma2 == undefined)
                                                            source_fma2.push("");
                                                        else
                                                            source_fma2.push({fma2: jsonObjFlux.results.bindings[i].source_fma2.value});

                                                        // sink fma
                                                        if (jsonObjFlux.results.bindings[i].sink_fma == undefined)
                                                            sink_fma.push("");
                                                        else
                                                            sink_fma.push({fma: jsonObjFlux.results.bindings[i].sink_fma.value});

                                                        // sink fma 2
                                                        if (jsonObjFlux.results.bindings[i].sink_fma2 == undefined)
                                                            sink_fma2.push("");
                                                        else
                                                            sink_fma2.push({fma2: jsonObjFlux.results.bindings[i].sink_fma2.value});

                                                        // med pr and fma
                                                        if (jsonObjFlux.results.bindings[i].med_entity_uri == undefined) {
                                                            med_pr.push("");
                                                            med_fma.push("");
                                                        }
                                                        else {
                                                            var temp = jsonObjFlux.results.bindings[i].med_entity_uri.value;
                                                            if (temp.indexOf(sparqlUtils.partOfProteinUri) != -1 || temp.indexOf(sparqlUtils.partOfGOUri) != -1 || temp.indexOf(sparqlUtils.partOfCHEBIUri) != -1) {
                                                                med_pr.push({
                                                                    // name of med_pr from OLS
                                                                    // TODO: J_sc_K two PR and one FMA URI!!
                                                                    med_pr: jsonObjFlux.results.bindings[i].med_entity_uri.value
                                                                });
                                                            }
                                                            else {
                                                                if (temp.indexOf(sparqlUtils.partOfFMAUri) != -1) {
                                                                    med_fma.push({med_fma: jsonObjFlux.results.bindings[i].med_entity_uri.value});
                                                                }
                                                            }
                                                        }
                                                    }

                                                    // remove duplicate fma
                                                    solute_chebi = miscellaneous.uniqueifyEpithelial(solute_chebi);
                                                    solute_chebi2 = miscellaneous.uniqueifyEpithelial(solute_chebi2);
                                                    source_fma = miscellaneous.uniqueifyEpithelial(source_fma);
                                                    sink_fma = miscellaneous.uniqueifyEpithelial(sink_fma);
                                                    source_fma2 = miscellaneous.uniqueifyEpithelial(source_fma2);
                                                    sink_fma2 = miscellaneous.uniqueifyEpithelial(sink_fma2);
                                                    med_pr = miscellaneous.uniqueifyEpithelial(med_pr);
                                                    med_fma = miscellaneous.uniqueifyEpithelial(med_fma);

                                                    if (jsonRelatedMembraneModel.results.bindings.length != 0) {

                                                        var tempVal, PID;
                                                        if (med_pr.length == 0) {
                                                            tempVal = jsonRelatedMembraneModel.results.bindings[0].Protein.value;
                                                            PID = tempVal.slice(tempVal.search("PR_") + 3, tempVal.length);
                                                        }
                                                        else {
                                                            tempVal = med_pr[0].med_pr;
                                                            PID = tempVal.slice(tempVal.search("PR_") + 3, tempVal.length);

                                                            // If PID start with 0 digit
                                                            if (PID.charAt(0) != "P") {
                                                                if (PID.charAt(0) != "Q") {
                                                                    PID = "P" + PID.replace(/^0+/, ""); // Or parseInt("065", 10)
                                                                }
                                                            }
                                                        }

                                                        membraneModelObj.push({
                                                            protein: jsonRelatedMembraneModel.results.bindings[0].Protein.value,
                                                            pid: PID, // med PID
                                                            prname: jsonPr._embedded.terms[0].label,
                                                            medfma: med_fma[0].med_fma, //combinedMembrane[0].med_fma,
                                                            medpr: tempVal,
                                                            similar: 0 // initial percent
                                                        });

                                                        var sourcefma2, sinkfma2, modelentity2, variabletext,
                                                            variabletext2, sourcefma, sinkfma, solutechebi2, medfma, medpr,
                                                            solutetext2, solutechebi, solutetext, indexOfdot, indexOfHash;

                                                        if (modelEntityObj[idMembrane].model_entity2 == "") {

                                                            indexOfHash = modelEntityObj[idMembrane].model_entity.search("#");
                                                            variabletext = modelEntityObj[idMembrane].model_entity.slice(indexOfHash + 1);
                                                            indexOfdot = variabletext.indexOf(".");

                                                            variabletext = variabletext.slice(indexOfdot + 1);

                                                            var tempjsonObjFlux = miscellaneous.uniqueifyjsonFlux(jsonObjFlux.results.bindings);

                                                            // console.log("tempjsonObjFlux: ", tempjsonObjFlux);
                                                            // console.log("circleID: ", circleID);

                                                            if (tempjsonObjFlux.length == 1) {
                                                                var vartext2;
                                                                if (med_pr.length != 0) {
                                                                    if (med_pr[0].med_pr == sparqlUtils.Nachannel || med_pr[0].med_pr == sparqlUtils.Kchannel ||
                                                                        med_pr[0].med_pr == sparqlUtils.Clchannel) {
                                                                        vartext2 = "channel";
                                                                    }
                                                                    else if (tempjsonObjFlux[0].source_fma.value == sparqlUtils.luminalID &&
                                                                        tempjsonObjFlux[0].sink_fma.value == sparqlUtils.interstitialID) {
                                                                        vartext2 = "diffusiveflux";
                                                                    }
                                                                    else {
                                                                        vartext2 = "flux"; // flux
                                                                    }
                                                                }

                                                                // TODO: ??
                                                                if (med_pr.length == 0) {
                                                                    vartext2 = "flux"; // "no mediator"
                                                                }

                                                                // console.log("vartext2, med_pr: ", vartext2, med_pr);

                                                                sourcefma = tempjsonObjFlux[0].source_fma.value;
                                                                sinkfma = tempjsonObjFlux[0].sink_fma.value;
                                                                solutechebi = solute_chebi[0].uri;
                                                                solutetext = solute_chebi[0].name;
                                                                medfma = med_fma[0].med_fma;

                                                                if (med_pr.length != 0) {
                                                                    medpr = med_pr[0].med_pr; // TODO: J_Sc_Na has 2 PR and 1 FMA URIs!! Fix this!!
                                                                }
                                                                else {
                                                                    medpr = "";
                                                                }

                                                                modelentity2 = "";
                                                                if (vartext2 == "channel" || vartext2 == "diffusiveflux") {
                                                                    sourcefma2 = vartext2;
                                                                    sinkfma2 = vartext2;
                                                                    variabletext2 = vartext2; // flux/channel/diffusiveflux
                                                                    solutechebi2 = vartext2;
                                                                    solutetext2 = vartext2;
                                                                }
                                                                else {
                                                                    sourcefma2 = "";
                                                                    sinkfma2 = "";
                                                                    variabletext2 = vartext2; // flux/channel/diffusiveflux
                                                                    solutechebi2 = "";
                                                                    solutetext2 = "";
                                                                }
                                                            }
                                                            else {
                                                                // same solute - J_Na in mackenzie model
                                                                if (tempjsonObjFlux.length == 2 && modelEntityObj[idMembrane].model_entity2 == "") {
                                                                    modelentity2 = modelEntityObj[idMembrane].model_entity;
                                                                    sourcefma = tempjsonObjFlux[0].source_fma.value;
                                                                    sinkfma = tempjsonObjFlux[0].sink_fma.value;
                                                                    sourcefma2 = tempjsonObjFlux[1].source_fma.value;
                                                                    sinkfma2 = tempjsonObjFlux[1].sink_fma.value;
                                                                    medfma = med_fma[0].med_fma;

                                                                    if (med_pr.length != 0) {
                                                                        medpr = med_pr[0].med_pr;
                                                                    }
                                                                    else {
                                                                        medpr = "";
                                                                    }

                                                                    variabletext2 = variabletext;
                                                                    solutechebi = solute_chebi[0].uri;
                                                                    solutetext = solute_chebi[0].name;
                                                                    solutechebi2 = solutechebi;
                                                                    solutetext2 = solutetext;
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            indexOfHash = modelEntityObj[idMembrane].model_entity.search("#");
                                                            variabletext = modelEntityObj[idMembrane].model_entity.slice(indexOfHash + 1);
                                                            indexOfdot = variabletext.indexOf(".");
                                                            variabletext = variabletext.slice(indexOfdot + 1);

                                                            indexOfHash = modelEntityObj[idMembrane].model_entity2.search("#");
                                                            variabletext2 = modelEntityObj[idMembrane].model_entity2.slice(indexOfHash + 1);
                                                            indexOfdot = variabletext2.indexOf(".");
                                                            variabletext2 = variabletext2.slice(indexOfdot + 1);

                                                            modelentity2 = modelEntityObj[idMembrane].model_entity2;
                                                            sourcefma = source_fma[0].fma;
                                                            sinkfma = sink_fma[0].fma;
                                                            sourcefma2 = source_fma2[0].fma2;
                                                            sinkfma2 = sink_fma2[0].fma2;
                                                            solutechebi = solute_chebi[0].uri;
                                                            solutetext = solute_chebi[0].name;
                                                            solutechebi2 = solute_chebi2[0].uri;
                                                            solutetext2 = solute_chebi2[0].name;
                                                            medfma = med_fma[0].med_fma;
                                                            medpr = med_pr[0].med_pr;
                                                        }
                                                    }

                                                    // console.log("medpr, protein.value: ", medpr, jsonRelatedMembraneModel, jsonRelatedMembraneModel.results.bindings[0].Protein.value);

                                                    var medURI, endpointOLS;
                                                    if (medpr == undefined || medpr == "") {
                                                        medURI = jsonRelatedMembraneModel.results.bindings[0].Protein.value;
                                                    }
                                                    else
                                                        medURI = medpr;

                                                    // console.log("medURI: ", medURI);

                                                    if (medURI.indexOf(sparqlUtils.partOfCHEBIUri) != -1) {
                                                        var indexofColon = medURI.indexOf("CHEBI:");
                                                        chebi_uri = "http://purl.obolibrary.org/obo/CHEBI_" + medURI.slice(indexofColon + 6);
                                                        endpointOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/chebi/terms?iri=" + chebi_uri;
                                                    }
                                                    else if (medURI.indexOf(sparqlUtils.partOfGOUri) != -1) {
                                                        var indexofColon = medURI.indexOf("GO:");
                                                        var go_uri = "http://purl.obolibrary.org/obo/GO_" + medURI.slice(indexofColon + 3);
                                                        endpointOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/go/terms?iri=" + go_uri;
                                                    }
                                                    else
                                                        endpointOLS = "http://ontology.cer.auckland.ac.nz/ols-boot/api/ontologies/pr/terms?iri=" + medURI;

                                                    ajaxUtils.sendGetRequest(
                                                        endpointOLS,
                                                        function (jsonObjOLSMedPr) {

                                                            var tempvar, med_pr_text_syn;
                                                            if (jsonObjOLSMedPr._embedded.terms[0].annotation["has_related_synonym"] == undefined) {
                                                                med_pr_text_syn = jsonObjOLSMedPr._embedded.terms[0].annotation["id"][0].slice(3);
                                                            }
                                                            else {
                                                                tempvar = jsonObjOLSMedPr._embedded.terms[0].annotation["has_related_synonym"];
                                                                med_pr_text_syn = tempvar[0].toUpperCase();
                                                            }

                                                            membraneModelID.push([
                                                                modelEntityObj[idMembrane].model_entity, // model_entity
                                                                modelentity2, // model_entity2
                                                                variabletext, // variable_text
                                                                variabletext2, // variable_text2
                                                                sourcefma,
                                                                sinkfma,
                                                                sourcefma2,
                                                                sinkfma2,
                                                                medfma, // jsonObjFlux.results.bindings[0].med_entity_uri.value, // med_fma
                                                                medpr, // med_pr, e.g. mediator in a cotransporter protein
                                                                solutechebi, // solute_chebi
                                                                solutechebi2, // solute_chebi2
                                                                solutetext, //solute_text
                                                                solutetext2, //solute_text2
                                                                jsonObjOLSMedPr._embedded.terms[0].label, //med_pr_text,
                                                                med_pr_text_syn, //med_pr_text_syn
                                                                jsonRelatedMembraneModel.results.bindings[0].Protein.value // protein_name
                                                            ]);

                                                            solute_chebi = [];
                                                            solute_chebi2 = [];
                                                            source_fma = [];
                                                            sink_fma = [];
                                                            source_fma2 = [];
                                                            sink_fma2 = [];
                                                            med_pr = [];
                                                            med_fma = [];

                                                            console.log("relatedMembraneModel: idMembrane -> ", idMembrane);
                                                            console.log("relatedMembraneModel: modelEntityObj -> ", modelEntityObj);
                                                            console.log("relatedMembraneModel: membraneModelID -> ", membraneModelID);

                                                            if (modelEntityObj[idMembrane].model_entity != undefined)
                                                                idMembrane++;

                                                            if (idMembrane == modelEntityObj.length) {
                                                                showModalWindow(membraneName, flag);
                                                                return;
                                                            }

                                                            relatedMembraneModel(membraneName, cotransporterList, flag);

                                                        }, true);
                                                }, true);
                                        }, true);
                                }, true);
                        }, true);
                }, true);
        };

        var showModalWindow = function (membraneName, flag) {

            console.log("flag in showModalWindow: ", flag);

            // add models without dragging
            if (flag == 2) {
                var relatedorganModels2 = "<p id=addModelsID>";
                for (var i = 0; i < membraneModelID.length; i++) {

                    // console.log("flag in showModalWindow: ", flag);
                    // console.log("combinedMembrane: ", combinedMembrane);
                    // console.log("membraneModelID: ", membraneModelID);

                    // Do not display already visualized models on the apical or basolateral membrane
                    if (miscellaneous.searchInCombinedMembrane(membraneModelID[i][0], membraneModelID[i][1], combinedMembrane))
                        continue;

                    var workspaceuri = sparqlUtils.myWorkspaneName + "/" + "rawfile" + "/" + "HEAD" + "/" + membraneModelID[i][0];

                    var variableName;
                    if (membraneModelID[i][1] != "") {
                        var indexOfHash = membraneModelID[i][1].search("#"),
                            componentVariableName = membraneModelID[i][1].slice(indexOfHash + 1), // NHE3.J_NHE3_Na
                            indexOfDot = componentVariableName.indexOf(".");

                        variableName = "and " + componentVariableName.slice(indexOfDot + 1); // J_NHE3_Na
                    }
                    else variableName = "";

                    var label = document.createElement('label');
                    label.innerHTML = '<input id="' + membraneModelID[i] + '" ' + // membraneModelID[i][0]
                        'type="checkbox" value="' + membraneModelID[i][0] + '">' + // "' + membraneModelID[i][0] + " " + variableName + '"
                        '<a href="' + workspaceuri + '" target="_blank" ' +
                        'data-toggle="tooltip" data-placement="right" ' +
                        'title="Protein name: ' + membraneModelID[i][14] + '\n' +
                        'Protein uri: ' + membraneModelID[i][16] + '\n' +
                        'Mediator name: ' + membraneModelID[i][14] + '\n' +
                        'Mediator uri: ' + membraneModelID[i][9] + '\n' +
                        'Model entity: ' + membraneModelID[i][0] + '\n' +
                        'Model entity2: ' + membraneModelID[i][1] + '"' +
                        '>' + membraneModelID[i][0] + " " + variableName + '</a></label>'; // membraneModelID[i][0]

                    relatedorganModels2 += label.innerHTML + "<br>";
                }

                if (relatedorganModels2 == "<p id=addModelsID>") {
                    relatedorganModels2 += "Not Exist" + "<br>";
                }

                $("#modalBody").empty();

                var msg = "<br><p><b>" + membraneName + " model in PMR<b><\p>";

                $("#modalBody")
                    .append(msg)
                    .append(relatedorganModels2);

                console.log("outside modelbody2!");

                return;
            }
            else if (flag == 1) {
                idMembrane = 0;

                var circleID = miscellaneous.circleIDSplitUtils($(cthis), sparqlUtils.paracellularID);

                var msg2 = "<p><b>" + proteinText + "</b> is a <b>" + typeOfModel + "</b> model. It is located in " +
                    "<b>" + locationOfModel + "</b><\p>";

                var workspaceuri = sparqlUtils.myWorkspaneName + "/" + "rawfile" + "/" + "HEAD" + "/" + circleID[0];

                var model = "<b>Model: </b><a href=" + workspaceuri + " + target=_blank " +
                    "data-toggle=tooltip data-placement=right " +
                    "title=" + proteinText + ">" + circleID[0] + "</a>";

                var biological = "<p><b>Biological Meaning: </b>" + biological_meaning + "</p>";

                if (biological_meaning2 != "")
                    biological += "<p>" + biological_meaning2 + "</p>";

                var species = "<p><b>Species: </b>" + speciesName + "</p>";
                var gene = "<p><b>Gene: </b>" + geneName + "</p>";
                var protein = "<p data-toggle=tooltip data-placement=right title=" + proteinName + ">" +
                    "<b>Protein: </b>" + proteinText + "</p>";

                // Related apical or basolateral model
                var index = 0, ProteinSeq = "", requestData, PID = [],
                    baseUrl = "https://www.ebi.ac.uk/Tools/services/rest/clustalo";

                miscellaneous.proteinOrMedPrID(membraneModelID, PID);
                console.log("PID BEFORE: ", PID);

                var draggedMedPrID = miscellaneous.splitPRFromProtein(circleID);
                PID.push(draggedMedPrID);

                console.log("PID BEFORE Filter: ", PID);

                // remove duplicate protein ID
                PID = PID.filter(function (item, pos) {
                    return PID.indexOf(item) == pos;
                });

                console.log("PID AFTER Filter: ", PID);

                // PID does NOT start with P or Q
                for (var key in PID) {
                    console.log("PID[key]: ", PID[key]);
                    if (PID[key].charAt(0) == "Q") continue;

                    if (PID[key].charAt(0) != "P") {
                        PID[key] = "P" + PID[key].replace(/^0+/, ""); // Or parseInt("065", 10);
                    }
                }

                console.log("PID AFTER: ", PID);

                // https://www.ebi.ac.uk/seqdb/confluence/pages/viewpage.action?pageId=48923608
                // https://www.ebi.ac.uk/seqdb/confluence/display/WEBSERVICES/clustalo_rest
                var WSDbfetchREST = function () {

                    // var dbfectendpoint = "http://www.ebi.ac.uk/Tools/dbfetch/dbfetch/uniprotkb/" + PID[index] + "/fasta";
                    var cors_api_url = "http://localhost:8080/",
                        // dbfectendpoint = cors_api_url + "https://www.ebi.ac.uk/Tools/dbfetch/dbfetch/uniprotkb/" + PID[index] + "/fasta";
                        dbfectendpoint = "https://www.ebi.ac.uk/Tools/dbfetch/dbfetch/uniprotkb/" + PID[index] + "/fasta";

                    ajaxUtils.sendGetRequest(
                        dbfectendpoint,
                        function (psequence) {
                            ProteinSeq += psequence;

                            // PID is empty
                            if (PID.length == 1) { // in fact, PID.length == 0, to enable the above dbfectsparqlUtils.endpoint query

                                var indexOfBar = psequence.search(/\|/gi),
                                    indexOfBar2 = psequence.slice(indexOfBar + 1, psequence.length).search(/\|/gi),
                                    t1 = psequence.slice(0, indexOfBar + indexOfBar2 + 1),
                                    t2 = psequence.slice(indexOfBar + indexOfBar2 + 1);

                                psequence = t1 + "0" + t2;
                                ProteinSeq += psequence;

                                console.log("ProteinSeq when empty: ", ProteinSeq, PID);
                            }

                            index++;
                            if (index == PID.length) {
                                // console.log("ProteinSeq: ", ProteinSeq);

                                requestData = {
                                    "sequence": ProteinSeq,
                                    "email": "dsar941@aucklanduni.ac.nz"
                                }

                                var requestUrl = baseUrl + "/run/";

                                ajaxUtils.sendEBIPostRequest(
                                    requestUrl,
                                    requestData,
                                    function (jobId) {
                                        // console.log("jobId: ", jobId); // jobId

                                        var chkJobStatus = function (jobId) {
                                            var jobIdUrl = baseUrl + "/status/" + jobId;
                                            ajaxUtils.sendGetRequest(
                                                jobIdUrl,
                                                function (resultObj) {
                                                    console.log("result: ", resultObj); // jobId status

                                                    if (resultObj == "RUNNING") {
                                                        setTimeout(function () {
                                                            chkJobStatus(jobId);
                                                        }, 5000);
                                                    }

                                                    var pimUrl = baseUrl + "/result/" + jobId + "/pim";
                                                    ajaxUtils.sendGetRequest(
                                                        pimUrl,
                                                        function (identityMatrix) {

                                                            var similarityOBJ = miscellaneous.similarityMatrixEBI(
                                                                identityMatrix, PID, draggedMedPrID, membraneModelObj);

                                                            var tempList = [];
                                                            for (var i = 0; i < membraneModelObj.length; i++) {
                                                                for (var j = 0; j < membraneModelID.length; j++) {

                                                                    var tempID = miscellaneous.splitPRFromProtein(membraneModelID[j]);
                                                                    if (tempID.charAt(0) != "P") {
                                                                        if (tempID.charAt(0) != "Q") {
                                                                            tempID = "P" + tempID.replace(/^0+/, "");
                                                                        }
                                                                    }

                                                                    if (membraneModelObj[i].pid == tempID) {
                                                                        tempList.push(membraneModelID[j]);
                                                                        break;
                                                                    }
                                                                }
                                                            }

                                                            for (var i = 0; i < tempList.length; i++) {
                                                                membraneModelID[i] = tempList[i];
                                                            }

                                                            // console.log("tempList: ", tempList);
                                                            console.log("AFTER membraneModelID: ", membraneModelID);
                                                            console.log("membraneModelObj: ", membraneModelObj);

                                                            // apical or basolateral membrane
                                                            var membraneModel = "<p id=membraneModelsID><b>" + membraneName + " model</b>";
                                                            for (var i = 0; i < membraneModelObj.length; i++) {

                                                                // Do not display visualized models
                                                                if (miscellaneous.searchInCombinedMembrane(membraneModelID[i][0], membraneModelID[i][1], combinedMembrane))
                                                                    continue;

                                                                var workspaceuri = sparqlUtils.myWorkspaneName + "/" + "rawfile" + "/" + "HEAD" + "/" + membraneModelID[i][0];

                                                                var label = document.createElement("label");
                                                                label.innerHTML = '<br><input id="' + membraneModelID[i] + '" ' +
                                                                    'type="checkbox" value="' + membraneModelID[i][0] + '">' + // membraneModelObj[i].prname
                                                                    '<a href="' + workspaceuri + '" target="_blank" ' +
                                                                    'data-toggle="tooltip" data-placement="right" ' +
                                                                    'title="Protein name: ' + membraneModelObj[i].prname + '\n' +
                                                                    'Protein uri: ' + membraneModelObj[i].protein + '\n' +
                                                                    'Mediator name: ' + membraneModelID[i][14] + '\n' +
                                                                    'Mediator uri: ' + membraneModelObj[i].medpr + '\n' +
                                                                    'Similarity value: ' + membraneModelObj[i].similar + '\n' +
                                                                    'Model entity: ' + membraneModelID[i][0] + '\n' +
                                                                    'Model entity2: ' + membraneModelID[i][1] + '"' +
                                                                    '>' + membraneModelID[i][14] + '</a></label>'; // membraneModelObj[i].prname

                                                                membraneModel += label.innerHTML;
                                                            }

                                                            if (membraneModel == "<p id=membraneModelsID><b>" + membraneName + " model</b>") {
                                                                membraneModel += "<br>Not Exist" + "<br>";
                                                            }

                                                            // membraneModel += "</p>";
                                                            // console.log("alternativeModelObj: ", alternativeModelObj);

                                                            // alternative model
                                                            var alternativeModel = "<p id=alternativeModelID><b>Alternative model of " + proteinText + "</b>";
                                                            if (alternativeModelObj.length == 0) {
                                                                alternativeModel += "<br>Not Exist" + "<br>";
                                                            }
                                                            else {
                                                                for (var i = 0; i < alternativeModelObj.length; i++) {
                                                                    var workspaceuri = alternativeModelObj[i].workspaceName +
                                                                        "/" + "rawfile" + "/" + "HEAD" + "/" + alternativeModelObj[i].modelEntity;

                                                                    // TODO: SPARQL query to get flux of solutes similar to modalWindowToAddModels
                                                                    var label = document.createElement("label");
                                                                    label.innerHTML = '<br><input id="' + alternativeModelObj[i].modelEntity + '" ' +
                                                                        'type="checkbox" value="' + alternativeModelObj[i].modelEntity + '">' +
                                                                        '<a href="' + workspaceuri + '" target="_blank" ' +
                                                                        'data-toggle="tooltip" data-placement="right" ' +
                                                                        'title="Protein name: ' + alternativeModelObj[i].prname + '\n' +
                                                                        'Protein uri: ' + alternativeModelObj[i].protein + '\n' +
                                                                        'Model entity: ' + alternativeModelObj[i].modelEntity + '"' +
                                                                        '>' + alternativeModelObj[i].prname + '</a></label>';

                                                                    alternativeModel += label.innerHTML;
                                                                }
                                                            }

                                                            // alternativeModel += "</p>";
                                                            // console.log("relatedModelObj: ", relatedModelObj);

                                                            // related sparqlUtils.organ models (kidney, lungs, etc) in PMR
                                                            var relatedorganModel = "<p id=relatedorganModelID><b>" + typeOfModel + " model in PMR</b>";
                                                            if (relatedModelObj.length == 1) { // includes own protein name
                                                                relatedorganModel += "<br>Not Exist" + "<br>";
                                                            }
                                                            else {
                                                                for (var i = 0; i < relatedModelObj.length; i++) {

                                                                    if (proteinName == relatedModelObj[i].protein)
                                                                        continue;

                                                                    var workspaceuri = relatedModelObj[i].workspaceName +
                                                                        "/" + "rawfile" + "/" + "HEAD" + "/" + relatedModelObj[i].modelEntity;

                                                                    var label = document.createElement("label");
                                                                    label.innerHTML = '<br><a href="' + workspaceuri + '" target="_blank" ' +
                                                                        'data-toggle="tooltip" data-placement="right" ' +
                                                                        'title="Protein name: ' + relatedModelObj[i].prname + '\n' +
                                                                        'Protein uri: ' + relatedModelObj[i].protein + '\n' +
                                                                        'Model entity: ' + relatedModelObj[i].modelEntity + '"' +
                                                                        '>' + relatedModelObj[i].prname + '</a></label>';

                                                                    relatedorganModel += label.innerHTML;
                                                                }
                                                            }

                                                            // relatedModelObj += "</p>";

                                                            $("#modalBody").empty();

                                                            $("#modalBody")
                                                                .append(msg2)
                                                                .append(model)
                                                                .append(biological)
                                                                .append(species)
                                                                .append(gene)
                                                                .append(protein);

                                                            var msg3 = "<br><p><b>Recommendations/suggestions based on existing models in PMR<b><\p>";

                                                            $("#modalBody")
                                                                .append(msg3)
                                                                .append(membraneModel)
                                                                .append(alternativeModel)
                                                                .append(relatedorganModel);

                                                            console.log("outside modelbody!");

                                                            return;
                                                        },
                                                        false);
                                                },
                                                false);
                                        }

                                        chkJobStatus(jobId);
                                        console.log("AFTER chkJobStatus(jobId)!");

                                        return;
                                    },
                                    false);

                                return;
                            }

                            // callback
                            WSDbfetchREST();
                            console.log("AFTER WSDbfetchREST! CALLBACK!");
                        },
                        false);
                };

                WSDbfetchREST();
                console.log("AFTER WSDbfetchREST!");

                return;
            }
        };

        // circles, polygons and arrows move back if close clicked
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
            if (circlewithlineg[icircleGlobal] != undefined) {
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
            }

            // text inside circle
            if (circlewithtext[icircleGlobal] != undefined) {
                circlewithtext[icircleGlobal]
                    .transition()
                    .delay(1000)
                    .duration(1000)
                    .attr("x", dxcircletext[icircleGlobal]) // - 15)
                    .attr("y", dycircletext[icircleGlobal]); // + 23);
            }

            if (linewithlineg2[icircleGlobal] != undefined) {
                if (linewithlineg2[icircleGlobal] != "") {
                    linewithlineg2[icircleGlobal]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("x1", dx1line2[icircleGlobal])
                        .attr("y1", dy1line2[icircleGlobal])
                        .attr("x2", dx2line2[icircleGlobal])
                        .attr("y2", dy2line2[icircleGlobal]);
                }
            }

            if (linewithtextg2[icircleGlobal] != undefined) {
                if (linewithtextg2[icircleGlobal] != "") {
                    linewithtextg2[icircleGlobal]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("x", dxtext2[icircleGlobal])
                        .attr("y", dytext2[icircleGlobal]);
                }
            }
        };

        // retain color of membranes
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
        };

        // rearrange circles, polygons, and arrows for a change
        var circleRearrange = function () {
            // initial values for apical
            var cyinitial = 213.3333282470703,
                dy1lineinitial = 193.3333282470703,
                dy1lineinitial2 = 233.3333282470703,
                dytextinitial = 198.3333282470703,
                dytextinitial2 = 237.3333282470703;
            for (i = 0; i < circlewithlineg.length; i++) {
                if (circlewithlineg[i].attr("membrane") == sparqlUtils.apicalID) {
                    console.log("apical !");

                    // line 1
                    dy1line[i] = dy1lineinitial;
                    dy2line[i] = dy1lineinitial;
                    linewithlineg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y1", dy1line[i])
                        .attr("y2", dy2line[i]);

                    // text 1
                    dytext[i] = dytextinitial;
                    linewithtextg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y", dytext[i]);

                    if (linewithlineg2[i] != undefined) {

                        console.log("apical 2!");

                        if (linewithlineg2[i] != "") {
                            // line 2
                            dy1line2[i] = dy1lineinitial2;
                            dy2line2[i] = dy1lineinitial2;
                            linewithlineg2[i]
                                .transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("y1", dy1line2[i])
                                .attr("y2", dy2line2[i]);

                            // text 2
                            dytext2[i] = dytextinitial2;
                            linewithtextg2[i]
                                .transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("y", dytext2[i])
                        }
                    }

                    if (circlewithlineg[i]._groups[0][0].tagName == "circle") {
                        dy[i] = cyinitial;
                        circlewithlineg[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("cy", dy[i]);

                        dycircletext[i] = dy[i];
                        circlewithtext[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("y", dycircletext[i])
                    }

                    if (circlewithlineg[i]._groups[0][0].tagName == "polygon") {
                        dy[i] = cyinitial;
                        circlewithlineg[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("transform", "translate(" + dx[i] + "," + (dy[i] - 50) + ")")
                            .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30");

                        // circle text
                        dycircletext[i] = dy[i] - 15;
                        circlewithtext[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("y", dycircletext[i])
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
            for (i = 0; i < circlewithlineg.length; i++) {
                if (circlewithlineg[i].attr("membrane") == sparqlUtils.basolateralID) {
                    console.log("baso !");

                    // line 1
                    dy1line[i] = dy1lineinitialb;
                    dy2line[i] = dy1lineinitialb;
                    linewithlineg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y1", dy1line[i])
                        .attr("y2", dy2line[i]);

                    // text 1
                    dytext[i] = dytextinitialb;
                    linewithtextg[i]
                        .transition()
                        .delay(1000)
                        .duration(1000)
                        .attr("y", dytext[i]);

                    if (linewithlineg2[i] != undefined) {

                        console.log("baso 2!");

                        if (linewithlineg2[i] != "") {
                            // line 2
                            dy1line2[i] = dy1lineinitialb2;
                            dy2line2[i] = dy1lineinitialb2;
                            linewithlineg2[i]
                                .transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("y1", dy1line2[i])
                                .attr("y2", dy2line2[i]);

                            // text 2
                            dytext2[i] = dytextinitialb2;
                            linewithtextg2[i]
                                .transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("y", dytext2[i])
                        }
                    }

                    if (circlewithlineg[i]._groups[0][0].tagName == "circle") {
                        dy[i] = cyinitialb;
                        circlewithlineg[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("cy", dy[i]);

                        // circle text
                        dycircletext[i] = dy[i];
                        circlewithtext[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("y", dycircletext[i])
                    }

                    if (circlewithlineg[i]._groups[0][0].tagName == "polygon") {
                        dy[i] = cyinitialb;
                        circlewithlineg[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("transform", "translate(" + dx[i] + "," + (dy[i] - 50) + ")")
                            .attr("points", "10,20 50,20 45,30 50,40 10,40 15,30");

                        // circle text
                        dycircletext[i] = dy[i] - 15;
                        circlewithtext[i]
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("y", dycircletext[i])
                    }

                    // decrement y-axis of line and circle
                    cyinitialb += ydistance;
                    dy1lineinitialb += ydistance;
                    dy1lineinitialb2 += ydistance;
                    dytextinitialb += ydistance;
                    dytextinitialb2 += ydistance;
                }
            }
        };

        // reinitialize variable for next iteration
        var reinitVariable = function () {
            idProtein = 0;
            idAltProtein = 0;
            idMembrane = 0;
            counter = 0;

            membraneModelObj = [];
            alternativeModelObj = [];
            relatedModelObj = [];

            relatedModel = [];
            modelEntityObj = [];
            membraneModelID = [];

            relatedModelEntity = [];
            cotransporterList = [];
        };

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
                    '</h4></div>';

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

                // close button clicked!!
                $("#mcloseID").click(function (event) {

                    console.log("second close button clicked!!");

                    moveBack();
                    membraneColorBack();

                    if (mindex == 1)
                        linebasolateral.transition().delay(1000).duration(1000).style("stroke", "orange");
                    else
                        lineapical.transition().delay(1000).duration(1000).style("stroke", "green");

                    reinitVariable();
                    return;
                })

                // save button clicked!!
                $("#msaveID").click(function (event) {

                    console.log("second save button clicked!");

                    // add models without dragging
                    for (i = 0; i < $("#addModelsID input").length; i++) {
                        if ($("#addModelsID input")[i].checked) {

                            console.log("add models without dragging!!");

                            var cTHIS = $("#addModelsID input")[i].id;
                            console.log("cTHIS AFTER: ", cTHIS);

                            var circleID = cTHIS.split(",");
                            console.log("circleID in addModelsID input: ", circleID);

                            combinedMembrane.push({
                                model_entity: circleID[0], // cellml model entity (e.g. weinstein_1995.cellml#NHE3.J_NHE3_Na)
                                variable_text: circleID[2], // cellml variable name (e.g. J_NHE_Na)
                                source_fma: circleID[4], // source FMA uri
                                sink_fma: circleID[5], // sink FMA uri
                                med_fma: circleID[8], // mediator FMA uri
                                med_pr: circleID[9], // mediator protein uri
                                solute_chebi: circleID[10], // solute CHEBI uri
                                solute_text: circleID[12], // solute text using the CHEBI uri from OLS
                                med_pr_text: circleID[14], // mediator protein text using the mediator protein uri from OLS
                                med_pr_text_syn: circleID[15], // synonym of a mediator protein text (e.g. NHE3, SGLT1) using the mediator protein uri from OLS
                                protein_name: circleID[16], // protein name
                                model_entity2: circleID[1], // cellml model entity => cotransporter or empty otherwise
                                variable_text2: circleID[3], // cellml variable name
                                source_fma2: circleID[6], // source FMA uri => cotransporter or empty otherwise
                                sink_fma2: circleID[7], // sink FMA uri => cotransporter or empty otherwise
                                solute_chebi2: circleID[11], // solute CHEBI uri
                                solute_text2: circleID[13] // solute text using the CHEBI uri from OLS
                            });
                            // combinedMembrane = miscellaneous.uniqueifyCombinedMembrane(combinedMembrane);

                            console.log("combinedMembrane in addModelsID input: ", combinedMembrane);

                            combinedMemChk(combinedMembrane.length - 1);
                            combinedMemFunc(combinedMembrane.length - 1, msaveIDflag);

                            reinitVariable();
                            return;
                        }
                    }

                    // apical or basolateral membrane models
                    for (i = 0; i < $("#membraneModelsID input").length; i++) {
                        if ($("#membraneModelsID input")[i].checked) {

                            console.log("Apical or Basolateral membrane!!");

                            // paracellular
                            if ($(cthis).attr("membrane") == sparqlUtils.paracellularID) {
                                $(cthis).attr("idParacellular", $("#membraneModelsID input")[i].id);
                            }
                            else {
                                $(cthis).attr("id", $("#membraneModelsID input")[i].id);
                            }

                            $(cthis).attr("id", $("#membraneModelsID input")[i].id);
                            console.log("cthis AFTER: ", cthis);
                        }
                    }

                    // alternative models
                    for (i = 0; i < $("#alternativeModelID input").length; i++) {
                        if ($("#alternativeModelID input")[i].checked) {

                            console.log("Alternative model!!");

                            $(cthis).attr("id", $("#alternativeModelID input")[i].id);
                            console.log("cthis AFTER: ", cthis);
                        }
                    }

                    // related sparqlUtils.organ models in PMR
                    for (i = 0; i < $("#relatedorganModelID input").length; i++) {
                        if ($("#relatedorganModelID input")[i].checked) {

                            console.log("Related sparqlUtils.organ model!!");

                            $(cthis).attr("id", $("#relatedorganModelID input")[i].id);
                            console.log("cthis AFTER: ", cthis);
                        }
                    }

                    membraneColorBack();

                    var circleID = miscellaneous.circleIDSplitUtils($(cthis), sparqlUtils.paracellularID);
                    console.log("circleID at the end: ", circleID);

                    var totalCheckboxes = $("input:checkbox").length,
                        numberOfChecked = $("input:checkbox:checked").length,
                        numberOfNotChecked = totalCheckboxes - numberOfChecked;

                    console.log("totalCheckboxes, numberOfChecked, numberNotChecked: ", totalCheckboxes, numberOfChecked, numberOfNotChecked);

                    if (totalCheckboxes == numberOfNotChecked) {
                        console.log("if (totalCheckboxes == numberOfNotChecked");
                        console.log("totalCheckboxes, numberNotChecked: ", totalCheckboxes, numberOfNotChecked);
                        console.log("circleID checkboxes: ", circleID[4], circleID[5], circleID[8]);

                        console.log("icircleGlobal: ", icircleGlobal);

                        // mediator FMA uri
                        if (combinedMembrane[icircleGlobal].med_fma == sparqlUtils.apicalID) {
                            circleID[8] = sparqlUtils.basolateralID;
                            combinedMembrane[icircleGlobal].med_fma = sparqlUtils.basolateralID;

                            // source and sink FMA uri
                            if (combinedMembrane[icircleGlobal].source_fma == sparqlUtils.luminalID && combinedMembrane[icircleGlobal].sink_fma == sparqlUtils.cytosolID) {
                                circleID[4] = sparqlUtils.cytosolID;
                                combinedMembrane[icircleGlobal].source_fma = sparqlUtils.cytosolID;
                                circleID[5] = sparqlUtils.interstitialID;
                                combinedMembrane[icircleGlobal].sink_fma = sparqlUtils.interstitialID;
                            }

                            if (combinedMembrane[icircleGlobal].source_fma == sparqlUtils.cytosolID && combinedMembrane[icircleGlobal].sink_fma == sparqlUtils.luminalID) {
                                circleID[4] = sparqlUtils.interstitialID;
                                combinedMembrane[icircleGlobal].source_fma = sparqlUtils.interstitialID;
                                circleID[5] = sparqlUtils.cytosolID;
                                combinedMembrane[icircleGlobal].sink_fma = sparqlUtils.cytosolID;
                            }

                            // source2 and sink2 FMA uri
                            if (combinedMembrane[icircleGlobal].source_fma2 != "" && combinedMembrane[icircleGlobal].sink_fma2 != "") {
                                if (combinedMembrane[icircleGlobal].source_fma2 == sparqlUtils.luminalID && combinedMembrane[icircleGlobal].sink_fma2 == sparqlUtils.cytosolID) {
                                    circleID[6] = sparqlUtils.cytosolID;
                                    combinedMembrane[icircleGlobal].source_fma2 = sparqlUtils.cytosolID;
                                    circleID[7] = sparqlUtils.interstitialID;
                                    combinedMembrane[icircleGlobal].sink_fma2 = sparqlUtils.interstitialID;
                                }

                                if (combinedMembrane[icircleGlobal].source_fma2 == sparqlUtils.cytosolID && combinedMembrane[icircleGlobal].sink_fma2 == sparqlUtils.luminalID) {
                                    circleID[6] = sparqlUtils.interstitialID;
                                    combinedMembrane[icircleGlobal].source_fma2 = sparqlUtils.interstitialID;
                                    circleID[7] = sparqlUtils.cytosolID;
                                    combinedMembrane[icircleGlobal].sink_fma2 = sparqlUtils.cytosolID;
                                }
                            }
                        }
                        else {
                            circleID[8] = sparqlUtils.apicalID;
                            combinedMembrane[icircleGlobal].med_fma = sparqlUtils.apicalID;

                            // source and sink FMA uri
                            if (combinedMembrane[icircleGlobal].source_fma == sparqlUtils.cytosolID && combinedMembrane[icircleGlobal].sink_fma == sparqlUtils.interstitialID) {
                                circleID[4] = sparqlUtils.luminalID;
                                combinedMembrane[icircleGlobal].source_fma = sparqlUtils.luminalID;
                                circleID[5] = sparqlUtils.cytosolID;
                                combinedMembrane[icircleGlobal].sink_fma = sparqlUtils.cytosolID;
                            }

                            if (combinedMembrane[icircleGlobal].source_fma == sparqlUtils.interstitialID && combinedMembrane[icircleGlobal].sink_fma == sparqlUtils.cytosolID) {
                                circleID[4] = sparqlUtils.cytosolID;
                                combinedMembrane[icircleGlobal].source_fma = sparqlUtils.cytosolID;
                                circleID[5] = sparqlUtils.luminalID;
                                combinedMembrane[icircleGlobal].sink_fma = sparqlUtils.luminalID;
                            }

                            // source2 and sink2 FMA uri
                            if (circleID[6] != "" && circleID[7] != "") {
                                if (combinedMembrane[icircleGlobal].source_fma2 == sparqlUtils.cytosolID && combinedMembrane[icircleGlobal].sink_fma2 == sparqlUtils.interstitialID) {
                                    circleID[6] = sparqlUtils.luminalID;
                                    combinedMembrane[icircleGlobal].source_fma2 = sparqlUtils.luminalID;
                                    circleID[7] = sparqlUtils.cytosolID;
                                    combinedMembrane[icircleGlobal].sink_fma2 = sparqlUtils.cytosolID;
                                }

                                if (combinedMembrane[icircleGlobal].source_fma2 == sparqlUtils.interstitialID && combinedMembrane[icircleGlobal].sink_fma2 == sparqlUtils.cytosolID) {
                                    circleID[6] = sparqlUtils.cytosolID;
                                    combinedMembrane[icircleGlobal].source_fma2 = sparqlUtils.cytosolID;
                                    circleID[7] = sparqlUtils.luminalID;
                                    combinedMembrane[icircleGlobal].sink_fma2 = sparqlUtils.luminalID;
                                }
                            }
                        }
                    }
                    else {
                        // update combinedMembrane, this will be sent to GMS to assemble and reproduce a new cellml model
                        combinedMembrane[icircleGlobal].model_entity = circleID[0]; // cellml model entity (e.g. weinstein_1995.cellml#NHE3.J_NHE3_Na)
                        combinedMembrane[icircleGlobal].variable_text = circleID[2]; // cellml variable name (e.g. J_NHE_Na)
                        combinedMembrane[icircleGlobal].source_fma = circleID[4]; // source FMA uri
                        combinedMembrane[icircleGlobal].sink_fma = circleID[5]; // sink FMA uri
                        combinedMembrane[icircleGlobal].med_fma = circleID[8]; // mediator FMA uri
                        combinedMembrane[icircleGlobal].med_pr = circleID[9]; // mediator protein uri
                        combinedMembrane[icircleGlobal].solute_chebi = circleID[10]; // solute CHEBI uri
                        combinedMembrane[icircleGlobal].solute_text = circleID[12]; // solute text using the CHEBI uri from OLS
                        combinedMembrane[icircleGlobal].med_pr_text = circleID[14]; // mediator protein text using the mediator protein uri from OLS
                        combinedMembrane[icircleGlobal].med_pr_text_syn = circleID[15]; // synonym of a mediator protein text (e.g. NHE3, SGLT1) using the mediator protein uri from OLS
                        combinedMembrane[icircleGlobal].protein_name = circleID[16]; // protein name
                        combinedMembrane[icircleGlobal].model_entity2 = circleID[1]; // cellml model entity => cotransporter or empty otherwise
                        combinedMembrane[icircleGlobal].variable_text2 = circleID[3]; // cellml variable name
                        combinedMembrane[icircleGlobal].source_fma2 = circleID[6]; // source FMA uri => cotransporter or empty otherwise
                        combinedMembrane[icircleGlobal].sink_fma2 = circleID[7]; // sink FMA uri => cotransporter or empty otherwise
                        combinedMembrane[icircleGlobal].solute_chebi2 = circleID[11]; // solute CHEBI uri
                        combinedMembrane[icircleGlobal].solute_text2 = circleID[13]; // solute text using the CHEBI uri from OLS
                    }

                    console.log("icircleGlobal: ", icircleGlobal);
                    console.log("combinedMembrane: ", combinedMembrane);
                    console.log("circlewithlineg: ", circlewithlineg);
                    console.log("$('#newgid').prop('childNodes'): ", $('#newgid').prop('childNodes'));
                    for (var i = 0; i < $('#newgid').prop('childNodes').length; i++) {

                        if ($('#newgid').prop('childNodes')[i].firstChild == undefined)
                            continue;

                        console.log("$('#newgid').prop('childNodes')[i].firstChild.id: ",
                            $('#newgid').prop('childNodes')[i].firstChild.id);

                        if ($('#newgid').prop('childNodes')[i].firstChild.id == "linewithlineg" + icircleGlobal) {
                            console.log("index of i: ", i);
                            $('#newgid').prop('childNodes')[i].remove();
                            // break;
                        }
                    }

                    // circle placement and rearrangement
                    if ($(cthis).attr("membrane") == sparqlUtils.apicalID) {
                        linebasolateral
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .style("stroke", "orange");

                        msaveIDflag = true;
                        combinedMemFunc(icircleGlobal, msaveIDflag);

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

                        msaveIDflag = true;
                        combinedMemFunc(icircleGlobal, msaveIDflag);

                        // decrement y-axis of line and circle
                        yvalueb -= ydistance;
                        cyvalueb -= ydistance;

                        // increment y-axis of line and circle
                        yvalue += ydistance;
                        cyvalue += ydistance;

                        circleRearrange();
                    }

                    var reflectCheckbox = function (icircleGlobal) {
                        checkboxsvg.call(checkBox[icircleGlobal])._groups[0][0].textContent = combinedMembrane[icircleGlobal].med_pr_text;
                        console.log("checkboxsvg in reflectCheckbox: ", checkboxsvg._groups[0][0].textContent);

                        ydistancechk = 50;
                        yinitialchk = 185;
                        ytextinitialchk = 200;

                        for (var i = 0; i < combinedMembrane.length; i++) {
                            var textvaluechk = combinedMembrane[i].med_pr_text;
                            var indexOfParen = textvaluechk.indexOf("(");
                            textvaluechk = textvaluechk.slice(0, indexOfParen - 1) + " (" + combinedMembrane[i].med_pr_text_syn + ")";

                            checkBox[i].x(850).y(yinitialchk).checked(false).clickEvent(update);
                            checkBox[i].xtext(890).ytext(ytextinitialchk).text("" + textvaluechk + "");

                            checkboxsvg.call(checkBox[i]);

                            yinitialchk += ydistancechk;
                            ytextinitialchk += ydistancechk;
                        }
                    }
                    reflectCheckbox(icircleGlobal);

                    // reinitialization
                    reinitVariable();
                    return;
                });
            };

            /**
             * Set header text. It makes sense only if the options.header is logical true.
             * @param {String} html New header text.
             */
            $this.setHeader = function (html) {
                $this.window.find(".modal-title").html(html);
            };

            /**
             * Set body HTML.
             * @param {String} html New body HTML
             */
            $this.setBody = function (html) {
                $this.window.find(".modal-body").html(html);
            };

            /**
             * Set footer HTML.
             * @param {String} html New footer HTML
             */
            $this.setFooter = function (html) {
                $this.window.find(".modal-footer").html(html);
            };

            /**
             * Return window body element.
             * @returns {jQuery} The body element
             */
            $this.getBody = function () {
                return $this.window.find(".modal-body");
            };

            /**
             * Show modal window
             */
            $this.show = function () {
                $this.window.modal("show");
            };

            /**
             * Hide modal window
             */
            $this.hide = function () {
                $this.window.modal("hide");
            };

            /**
             * Toggle modal window
             */
            $this.toggle = function () {
                $this.window.modal("toggle");
            };

            $this.selector = "#" + $this.options.id;
            if (!$($this.selector).length) {
                $this.createModal();
            }

            $this.window = $($this.selector);
            $this.setHeader($this.options.header);
        };
    };
};

recommender(combinedMembrane);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Created by Dewan Sarwar on 5/8/2017.
 */
// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
    $(selector).html("<div class='text-center'><img src='../src/img/ajax-loader.gif'></div>");
};

// remove duplicate model entity and biological meaning
var uniqueifyCombinedMembrane = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            if ((retval[j].model_entity === e.model_entity) && (retval[j].model_entity2 === e.model_entity2))
                return;
        }
        retval.push(e);
    });
    return retval;
};

// parse text from the epithelial name
var parserFmaNameText = function (fma) {
    var indexOfHash = fma.name.search("#"),
        srctext = fma.name.slice(indexOfHash + 1),
        indexOfdot = srctext.indexOf(".");

    return srctext.slice(indexOfdot + 1);
};

// extract species, gene, and protein names
var parseModelName = function (modelEntity) {
    var indexOfHash = modelEntity.search("#"),
        modelName = modelEntity.slice(0, indexOfHash);

    return modelName;
};

// remove duplicate relatedModel
var uniqueify = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            if (retval[j] === e)
                return;
        }
        retval.push(e);
    });
    return retval;
};

// remove duplicate model2DArray
var uniqueifymodel2DArray = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            if (retval[j][1] === e[1])
                return;
        }
        retval.push(e);
    });
    return retval;
};

// separate cellml model and variable name from a model entity
var modelVariableName = function (element) {
    // remove duplicate components with same variable
    var indexOfHash = element.search("#"),
        cellmlModelName = element.slice(0, indexOfHash), // weinstein_1995.cellml
        componentVariableName = element.slice(indexOfHash + 1), // NHE3.J_NHE3_Na
        indexOfDot = componentVariableName.indexOf("."),
        variableName = componentVariableName.slice(indexOfDot + 1); // J_NHE3_Na

    return [cellmlModelName, variableName];
};

// remove duplicate entity (cellml model and variable name)
var uniqueifyjsonModel = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            var temp1 = modelVariableName(retval[j].Model_entity.value),
                temp2 = modelVariableName(e.Model_entity.value);
            if (temp1[0] == temp2[0] && temp1[1] == temp2[1])
                return;
        }
        retval.push(e);
    });
    return retval;
};

// Remove duplicate fma
var uniqueifyEpithelial = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            if (retval[j].name === e.name && retval[j].fma === e.fma)
                return;
        }
        retval.push(e);
    });
    return retval;
};

// Remove duplicate links
var uniqueifySVG = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            if (retval[j].source === e.source && retval[j].target === e.target)
                return;
        }
        retval.push(e);
    });
    return retval;
};

// Remove duplicate links
var uniqueifyjsonFlux = function (es) {
    var retval = [];
    es.forEach(function (e) {
        for (var j = 0; j < retval.length; j++) {
            if (retval[j].source_fma.value === e.source_fma.value &&
                retval[j].sink_fma.value === e.sink_fma.value)
                return;
        }

        if (e.source_fma.value != e.sink_fma.value)
            retval.push(e);
    });
    return retval;
};

// Create anchor tag
var createAnchor = function (value) {
    var aText = $("<a/>");
    aText.attr("href", value);
    aText.attr("target", "_blank");
    aText.html(value);
    return aText;
};

// Find duplicate items
var searchFn = function (searchItem, arrayOfItems) {
    var counter = 0;
    for (var i = 0; i < arrayOfItems.length; i++) {
        if (arrayOfItems[i] == searchItem)
            counter++;
    }

    return counter;
};

// TODO: temp solution, fix this in svg
var getTextWidth = function (text, fontSize, fontFace) {
    var a = document.createElement("canvas"); // $("<canvas/>");
    var b = a.getContext("2d");
    b.font = fontSize + "px " + fontFace;
    return b.measureText(text).width;
};

// Utility to calculate number of iterations
var iteration = function (length) {
    var sum = 0;
    for (var i = 0; i < length; i++) {
        sum = sum + (length - i - 1);
    }

    return sum;
};

var isExist = function (element, templistOfModel) {
    // remove duplicate components with same variable and cellml model
    var indexOfHash = element.search("#"),
        cellmlModelName = element.slice(0, indexOfHash), // weinstein_1995.cellml
        componentVariableName = element.slice(indexOfHash + 1), // NHE3.J_NHE3_Na
        indexOfDot = componentVariableName.indexOf("."),
        variableName = componentVariableName.slice(indexOfDot + 1); // J_NHE3_Na

    for (var i = 0; i < templistOfModel.length; i++) {
        var indexOfHash2 = templistOfModel[i].search("#"),
            cellmlModelName2 = templistOfModel[i].slice(0, indexOfHash2), // weinstein_1995.cellml
            componentVariableName2 = templistOfModel[i].slice(indexOfHash2 + 1), // NHE3.J_NHE3_Na
            indexOfDot2 = componentVariableName2.indexOf("."),
            variableName2 = componentVariableName2.slice(indexOfDot2 + 1); // J_NHE3_Na

        if (cellmlModelName == cellmlModelName2 && variableName == variableName2) {
            return true;
        }
    }

    return false;
};

var isExistModel2DArray = function (element, model2DArray) {
    // remove duplicate components with same variable
    var indexOfHash = element.search("#"),
        cellmlModelName = element.slice(0, indexOfHash), // weinstein_1995.cellml
        componentVariableName = element.slice(indexOfHash + 1), // NHE3.J_NHE3_Na
        indexOfDot = componentVariableName.indexOf("."),
        variableName = componentVariableName.slice(indexOfDot + 1); // J_NHE3_Na

    for (var i = 0; i < model2DArray.length; i++) {
        var indexOfHash2 = model2DArray[i][1].search("#"),
            cellmlModelName2 = model2DArray[i][1].slice(0, indexOfHash2), // weinstein_1995.cellml
            componentVariableName2 = model2DArray[i][1].slice(indexOfHash2 + 1), // NHE3.J_NHE3_Na
            indexOfDot2 = componentVariableName2.indexOf("."),
            variableName2 = componentVariableName2.slice(indexOfDot2 + 1); // J_NHE3_Na

        if (cellmlModelName == cellmlModelName2 && variableName == variableName2) {
            return true;
        }
    }

    return false;
};

var circleIDSplitUtils = function (cthis, paracellularID) {
    var circleID;
    if (cthis.attr("membrane") == paracellularID)
        circleID = cthis.attr("idParacellular").split(",");
    else
        circleID = cthis.prop("id").split(",");
    return circleID;
};

// split PR_ from protein identifier
var splitPRFromProtein = function (tempMemModelID) {
    var indexOfPR;
    if (tempMemModelID[9] == "") {
        indexOfPR = tempMemModelID[16].search("PR_");
        return tempMemModelID[16].slice(indexOfPR + 3, tempMemModelID[16].length);
    }
    else {
        indexOfPR = tempMemModelID[9].search("PR_");
        return tempMemModelID[9].slice(indexOfPR + 3, tempMemModelID[9].length);
    }
};

// split PR_ from protein identifier
var proteinOrMedPrID = function (membraneModelID, PID) {
    for (var i = 0; i < membraneModelID.length; i++) {
        if (membraneModelID[i][9] == "") {
            var indexOfPR = membraneModelID[i][16].search("PR_"),
                medProteinID = membraneModelID[i][16].slice(indexOfPR + 3, membraneModelID[i][16].length);

            PID.push(medProteinID); // Mediator PROTEIN id
        }
        else {
            var indexOfPR = membraneModelID[i][9].search("PR_"),
                medProteinID = membraneModelID[i][9].slice(indexOfPR + 3, membraneModelID[i][9].length);

            PID.push(medProteinID); // Mediator PROTEIN id
        }
    }
};

var searchInCombinedMembrane = function (model1, model2, combinedMembrane) {

    console.log("searchInCombinedMembrane combinedMembrane: ", combinedMembrane);

    for (var i = 0; i < combinedMembrane.length; i++) {
        if ((combinedMembrane[i].model_entity == model1 && combinedMembrane[i].model_entity2 == model2) ||
            (combinedMembrane[i].model_entity == model2 && combinedMembrane[i].model_entity2 == model1) ||
            (combinedMembrane[i].model_entity == model1 && combinedMembrane[i].model_entity2 == "") ||
            (combinedMembrane[i].model_entity == model2 && combinedMembrane[i].model_entity2 == ""))
            return true;
    }

    return false;
};

// process EBI similarity matrix
var similarityMatrixEBI = function (identityMatrix, PID, draggedMedPrID, membraneModelObj) {
    // console.log("Identity Matrix: ", identityMatrix);

    var indexOfColon = identityMatrix.search("1:"), m, n, i, j;

    // console.log("index1stBar: ", identityMatrix.slice(indexOfColon - 1, identityMatrix.length));
    identityMatrix = identityMatrix.slice(indexOfColon - 1, identityMatrix.length);

    // console.log("New Identity Matrix: ", identityMatrix);

    var matrixArray = identityMatrix.match(/[(\w\:)*\d\.]+/gi),
        proteinIndex = [],
        twoDMatrix = [];

    // console.log("matrixArray: ", matrixArray);

    for (i = 0; i < matrixArray.length; i = i + PID.length + 3) // +3 for digit:, PID, and Genes and Species
        matrixArray.splice(i, 1);

    for (i = 0; i < matrixArray.length; i = i + PID.length + 2) // +2 for PID and Genes and Species
        matrixArray.splice(i, 1);

    for (i = 1; i < matrixArray.length; i = i + PID.length + 1) // +1 for PID
        matrixArray.splice(i, 1);

    // console.log("matrixArray: ", matrixArray);

    for (i = 0; i < matrixArray.length; i++) {
        if (matrixArray[i].charAt(0).match(/[A-Za-z]/gi)) {
            proteinIndex.push([matrixArray[i], i]);
        }
    }

    // console.log("proteinIndex: ", proteinIndex);

    // 1D to 2D array
    while (matrixArray.length) {
        matrixArray.splice(0, 1); // remove protein ID
        twoDMatrix.push(matrixArray.splice(0, proteinIndex.length));
    }

    for (i = 0; i < twoDMatrix.length; i++) {
        for (j = 0; j < twoDMatrix[i].length; j++) {
            twoDMatrix[i][j] = parseFloat(twoDMatrix[i][j]);
        }
    }

    // console.log("twoDMatrix: ", twoDMatrix);

    var similarityOBJ = [];
    for (i = 0; i < twoDMatrix.length; i++) {
        for (j = 0; j < twoDMatrix.length; j++) {
            if (i == j || j < i) continue;

            similarityOBJ.push({
                "PID1": proteinIndex[i][0],
                "PID2": proteinIndex[j][0],
                "similarity": twoDMatrix[i][j]
            })
        }
    }

    // length is empty when 100% matching
    // appended a 0 bit after its protein id and make a comparision
    if (similarityOBJ.length != 0) {
        for (m = 0; m < membraneModelObj.length; m++) {
            for (n = 0; n < similarityOBJ.length; n++) {
                if ((membraneModelObj[m].pid == similarityOBJ[n].PID1 &&
                    draggedMedPrID == similarityOBJ[n].PID2) ||
                    (membraneModelObj[m].pid == similarityOBJ[n].PID2 &&
                    draggedMedPrID == similarityOBJ[n].PID1)) {
                    membraneModelObj[m].similar = similarityOBJ[n].similarity;
                }
            }
        }

        // Descending sorting
        membraneModelObj.sort(function (a, b) {
            return b.similar - a.similar;
        });
    }

    // console.log("AFTER membraneModelObj: ", membraneModelObj);

    return similarityOBJ;
};

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
    };

    checkBox.x = function (val) {
        x = val;
        return checkBox;
    };

    checkBox.y = function (val) {
        y = val;
        return checkBox;
    };

    checkBox.rx = function (val) {
        rx = val;
        return checkBox;
    };

    checkBox.ry = function (val) {
        ry = val;
        return checkBox;
    };

    checkBox.markStrokeWidth = function (val) {
        markStrokeWidth = val;
        return checkBox;
    };

    checkBox.boxStrokeWidth = function (val) {
        boxStrokeWidth = val;
        return checkBox;
    };

    checkBox.checked = function (val) {
        if (val === undefined) {
            return checked;
        } else {
            checked = val;
            return checkBox;
        }
    };

    checkBox.clickEvent = function (val) {
        clickEvent = val;
        return checkBox;
    };

    checkBox.xtext = function (val) {
        xtext = val;
        return checkBox;
    };

    checkBox.ytext = function (val) {
        ytext = val;
        return checkBox;
    };

    checkBox.text = function (val) {
        text = val;
        return checkBox;
    };

    return checkBox;
}

exports.parseModelName = parseModelName;
exports.parserFmaNameText = parserFmaNameText;
exports.uniqueify = uniqueify;
exports.uniqueifyEpithelial = uniqueifyEpithelial;
exports.uniqueifySVG = uniqueifySVG;
exports.uniqueifyjsonFlux = uniqueifyjsonFlux;
exports.createAnchor = createAnchor;
exports.searchFn = searchFn;
exports.getTextWidth = getTextWidth;
exports.iteration = iteration;
exports.showLoading = showLoading;
exports.uniqueifymodel2DArray = uniqueifymodel2DArray;
exports.uniqueifyjsonModel = uniqueifyjsonModel;
exports.isExist = isExist;
exports.isExistModel2DArray = isExistModel2DArray;
exports.uniqueifyCombinedMembrane = uniqueifyCombinedMembrane;
exports.circleIDSplitUtils = circleIDSplitUtils;
exports.splitPRFromProtein = splitPRFromProtein;
exports.proteinOrMedPrID = proteinOrMedPrID;
exports.searchInCombinedMembrane = searchInCombinedMembrane;
exports.similarityMatrixEBI = similarityMatrixEBI;
exports.d3CheckBox = d3CheckBox;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Returns an HTTP request object
function getRequestObject() {
    if (window.XMLHttpRequest) {
        return (new XMLHttpRequest());
    }
    else if (window.ActiveXObject) {
        // For very old IE browsers (optional)
        return (new ActiveXObject("Microsoft.XMLHTTP"));
    }
    else {
        alert("Ajax is not supported!");
        return (null);
    }
}

// Makes an Ajax GET request to 'requestUrl'
var sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject();
    request.onreadystatechange = function () {
        handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
};

// Makes an Ajax POST request to 'requestUrl'
var sendPostRequest = function (requestUrl, query, responseHandler, isJsonResponse) {
    var request = getRequestObject();

    request.onreadystatechange = function () {
        handleResponse(request, responseHandler, isJsonResponse);
    };

    request.open("POST", requestUrl, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "application/sparql-results+json");

    request.send(query); // for POST only
};

// post function to get similarity matrix
var sendEBIPostRequest = function (requestUrl, query, responseHandler, isJsonResponse) {
    var request = getRequestObject();

    request.onreadystatechange = function () {
        handleResponse(request, responseHandler, isJsonResponse);
    };

    request.open("POST", requestUrl, true);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "text/plain");

    var data = "";
    for (var key in query) {
        data += encodeURIComponent(key);
        data += "=";
        data += encodeURIComponent(query[key]);
        data += "&";
    }
    // console.log("data: ", data);
    request.send(data); // for POST only
}

// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request, responseHandler, isJsonResponse) {
    if ((request.readyState == 4) && (request.status == 200)) {

        // Default to isJsonResponse = true
        if (isJsonResponse == undefined) {
            isJsonResponse = true;
        }

        if (isJsonResponse) {
            responseHandler(JSON.parse(request.responseText));
        }
        else {
            responseHandler(request.responseText);
        }
    }

    else if (request.readyState == 4) {
        console.log("ERROR!");
        console.error(request.responseText);
    }
}

exports.sendGetRequest = sendGetRequest;
exports.sendPostRequest = sendPostRequest;
exports.sendEBIPostRequest = sendEBIPostRequest;
exports.getRequestObject = getRequestObject;
exports.handleResponse = handleResponse;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by Dewan Sarwar on 14/01/2018.
 */
var sparqlUtils = __webpack_require__(0);

var svgPlatform = function (svg, newg, height, width, w, h, markerWidth, markerHeight) {
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
        .attr("id", sparqlUtils.luminalID)
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
        .attr("stroke-width", 1)
        .attr("fill", "white");

    // Intracellular rectangle
    var intracellular = newg.append("rect")
        .attr("id", sparqlUtils.cytosolID)
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
        .attr("stroke-width", 1)
        .attr("fill", "white");

    // Interstitial fluid rectangle
    var interstitial = newg.append("rect")
        .attr("id", sparqlUtils.interstitialID)
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
        .attr("stroke-width", 1)
        .attr("fill", "white");

    // Paracellular rectangle
    var paracellular = newg.append("rect")
        .attr("id", sparqlUtils.paracellularID)
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
        .attr("stroke-width", 1)
        .attr("fill", "white");

    // Paracellular rectangle
    var paracellular2 = newg.append("rect")
        .attr("id", sparqlUtils.paracellularID)
        .attr("x", w / 3 - 10)
        .attr("y", 0)
        .attr("width", width + 20)
        .attr("height", height / 3 - 30)
        .attr("stroke", "violet")
        .attr("stroke-width", 1)
        .attr("fill", "white");

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
};

exports.svgPlatform = svgPlatform;

/***/ })
/******/ ]);