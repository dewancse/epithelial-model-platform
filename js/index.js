/**
 * Created by dsar941 on 9/8/2016.
 */

(function (global) {
    'use strict';

    var endpoint = "https://models.physiomeproject.org/pmr2_virtuoso_search";

    var annotationHtml = "snippets/annotation.html";
    var epithelialHtml = "snippets/epithelial.html";
    var modelHtml = "snippets/model.html";
    var searchHtml = "snippets/search.html";
    var viewHtml = "snippets/view.html";

    // Set up a namespace for our utility
    var mainUtils = {};

    // Save models
    var listOfModels = [];

    // Save table rows for epithelial
    var listOfItemsForEpithelial = [];

    // Count number of instances in the loadModelHtml
    mainUtils.count = 0;
    var table = document.createElement("table");
    table.className = "table";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");

    // Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // Return substitute of '{{propName}}'
    // with propValue in given 'string'
    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

        // Place some startup code here

    });

    // Load the annotation view
    mainUtils.loadAnnotationHtml = function () {

        var query = 'SELECT ?id WHERE { ?id  <http://biomodels.net/biology-qualifiers/isVersionOf> ' +
            '<http://identifiers.org/go/GO:0005272> }';

        showLoading("#main-content");

        $ajaxUtils.sendPostRequest(
            endpoint,
            query,
            function (jsonObj) {
                $ajaxUtils.sendGetRequest(
                    annotationHtml,
                    function (annotationHtmlContent) {
                        var annotationHtmlViewToIndexHtml = mainUtils.showWorkspace(jsonObj, annotationHtmlContent);
                        insertHtml("#main-content", annotationHtmlViewToIndexHtml);
                    },
                    false);
            },
            true);
    };

    // Show workspaces in the annotation html
    mainUtils.showWorkspace = function (jsonObj, annotationHtmlContent) {

        var label = [];
        var finalHtml = annotationHtmlContent;

        var html = "<section class='row'>";

        for (var i = 0; i < jsonObj.results.bindings.length; i++) {

            // id with workspace name as a string
            var idWithStr = jsonObj.results.bindings[i].id.value;
            var index = idWithStr.search(".cellml");
            var workspaceName = idWithStr.slice(0, index);

            var workspaceUrl = "https://models.physiomeproject.org/workspace" + "/" + workspaceName + "/" + "@@file" +
                "/" + "HEAD" + "/" + jsonObj.results.bindings[i].id.value;

            label[i] = document.createElement("label");
            label[i].id = idWithStr;
            label[i].innerHTML = '<input id="' + label[i].id + '" type="checkbox" data-action="annotation" value="" ' +
                'class="checkbox-inline"> ';

            label[i].innerHTML += '<a href=' + workspaceUrl + ' + target=_blank>' + workspaceName + " / " + idWithStr +
                '</a></label>';

            html += '<label>' + label[i].innerHTML + '</label><br>';
        }

        html += "</section>";

        finalHtml = insertProperty(finalHtml, "description", html);

        return finalHtml;
    };

    // Different actions for checkbox events
    // ANNOTATION, SEARCH, MODEL pages
    var actions = {

        // Click event in annotation page
        annotation: function (event) {
            if (event.srcElement.className == "checkbox-inline" && event.srcElement.checked == true) {

                console.log("Annotation event: ", event);

                var idWithStr = event.srcElement.id;
                var n = idWithStr.search("#");
                var id = idWithStr.slice(n + 1, idWithStr.length);

                // id
                var index = idWithStr.search(".cellml");
                var workspaceName = idWithStr.slice(0, index);

                mainUtils.workspaceName = workspaceName;

                var vEndPoint = "https://models.physiomeproject.org/workspace" + "/" + workspaceName + "/" + "rawfile" +
                    "/" + "HEAD" + "/" + idWithStr;

                mainUtils.showVariableName = function (str) {
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(str, "text/xml");

                    var vHtml = event.srcElement.parentElement;

                    // Look up by variable tag
                    for (var i = 0; i < xmlDoc.getElementsByTagName("variable").length; i++) {
                        if (xmlDoc.getElementsByTagName("variable")[i].getAttribute("cmeta:id") == id) {
                            vHtml.innerHTML += '<hr>';
                            vHtml.innerHTML += id + '<br>';
                            vHtml.innerHTML += xmlDoc.getElementsByTagName("variable")[i].getAttribute("name") + '<br>';
                            vHtml.innerHTML += '<hr>';
                        }
                    }
                };

                $ajaxUtils.sendGetRequest(vEndPoint, mainUtils.showVariableName, false);
            }
        },

        // Click event in search page
        search: function (event) {

            if (event.srcElement.className == "checkbox-inline" && event.srcElement.checked == true) {

                console.log("Search event: ", event);

                var idWithStr = event.srcElement.id;
                var index = idWithStr.search(".cellml");
                var workspaceName = idWithStr.slice(0, index);

                mainUtils.workspaceName = workspaceName;
            }
        },

        // Click event in model page
        model: function (event) {

            if (event.srcElement.className == "checkbox-inline" && event.srcElement.checked == true) {

                console.log("Model event: ", event);

                if (document.getElementsByClassName("checkbox-inline")[0].checked == true) {
                    for (var i = 0; i < $('table tr').length; i++) {
                        document.getElementsByClassName("checkbox-inline")[i].checked = true;

                        // Push checked item
                        listOfModels.push(document.getElementsByClassName("checkbox-inline")[i].id);
                    }
                }
                else {
                    listOfModels.push(event.srcElement.id);

                    var idWithStr = event.srcElement.id;
                    var index = idWithStr.search(".cellml");
                    var workspaceName = idWithStr.slice(0, index);

                    mainUtils.workspaceName = workspaceName;
                }
            }
        }
    };

    document.addEventListener('click', function (event) {

        // If there's an action with the given name, call it
        if (typeof actions[event.srcElement.dataset.action] === "function") {
            actions[event.srcElement.dataset.action].call(this, event);
        }
    })

    // Load the search view
    mainUtils.loadSearchHtml = function () {
        showLoading("#main-content");

        $ajaxUtils.sendGetRequest(
            searchHtml,
            function (searchHtmlContent) {
                insertHtml("#main-content", searchHtmlContent);
            },
            false);
    };

    // Search results
    mainUtils.searchList = function (jsonObj) {

        var searchList = document.getElementById("searchList");

        var label = [];

        // Search result does not match
        if (jsonObj.results.bindings.length == 0) {
            searchList.innerHTML = "<section class='container-fluid'><label><br>No Items Matching Your Search Terms!</label></section>";
            return;
        }

        // Make empty space for new search result
        searchList.innerHTML = "";

        // Dynamic table
        var table = document.createElement("table");
        table.className = "table";

        // Table header
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        for (var i = 0; i < jsonObj.head.vars.length; i++) {
            if (i == 0) {
                var th = document.createElement("th");
                th.appendChild(document.createTextNode(""));
                tr.appendChild(th);
            }

            var th = document.createElement("th");
            th.appendChild(document.createTextNode(jsonObj.head.vars[i]));
            tr.appendChild(th);
        }

        thead.appendChild(tr);
        table.appendChild(thead);

        // Table body
        var tbody = document.createElement("tbody");
        for (var i = 0; i < jsonObj.results.bindings.length; i++) {
            var tr = document.createElement("tr");

            var td1 = document.createElement("td");
            var td2 = document.createElement("td");

            var id = jsonObj.results.bindings[i].name.value;
            label[i] = document.createElement('label');
            label[i].innerHTML = '<input id="' + id + '" type="checkbox" data-action="search" value="' +
                id + '" class="checkbox-inline"></label>';

            td1.appendChild(label[i]);
            td2.appendChild(document.createTextNode(jsonObj.results.bindings[i].name.value));

            tr.appendChild(td1);
            tr.appendChild(td2);

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        searchList.appendChild(table);
    }

    // Enter search keywords
    document.addEventListener('keydown', function (event) {
        if (event.key == 'Enter') {
            var searchTxt = document.getElementById("searchTxt").value;
            //var query = 'SELECT ?name WHERE { ?name <http://www.w3.org/2001/vcard-rdf/3.0#Family> "' + searchTxt + '" }';
            var query = 'SELECT ?name WHERE { ?name ?located_in "' + searchTxt + '" }';

            $ajaxUtils.sendPostRequest(endpoint, query, mainUtils.searchList, true);
        }
    });

    // Load the view
    mainUtils.loadViewHtml = function () {

        var workspaceURI = mainUtils.workspaceName.concat(".cellml");

        console.log(workspaceURI);

        var query = 'PREFIX dcterms: <http://purl.org/dc/terms/>' +
            'PREFIX bqmodel: <http://biomodels.net/model-qualifiers/>' +
            'PREFIX vCard: <http://www.w3.org/2001/vcard-rdf/3.0#>' +
            'PREFIX ro: <http://purl.obolibrary.org/obo/ro.owl#>' +
            'SELECT ?Title ?Author ?Protein ?Species ?Gene ?Located_in ?DOI ' +
            'WHERE { ' +
            '<' + workspaceURI + '#title> dcterms:title ?Title . ' +
            '<' + workspaceURI + '#author1VcardN> vCard:FN ?Author . ' +
            '<' + workspaceURI + '#UniProtKB> dcterms:Protein ?Protein . ' +
            '<' + workspaceURI + '#UniProtKB> dcterms:Species ?Species . ' +
            '<' + workspaceURI + '#UniProtKB> dcterms:Gene ?Gene . ' +
            '<' + workspaceURI + '#located_in> ro:located_in ?Located_in . ' +
            '<' + workspaceURI + '#DOI> bqmodel:isDescribedBy ?DOI .}';

        showLoading("#main-content");
        $ajaxUtils.sendPostRequest(
            endpoint,
            query,
            function (jsonObj) {
                $ajaxUtils.sendGetRequest(
                    viewHtml,
                    function (viewHtmlContent) {
                        var viewHtmlViewToIndexHtml = mainUtils.showView(jsonObj, viewHtmlContent);
                        insertHtml("#main-content", viewHtmlViewToIndexHtml);
                    },
                    false);
            },
            true);
    };

    // Show rdf indexed information in the view html
    // Should make a table -- CHANGE THE STATIC CODE
    mainUtils.showView = function (jsonObj, viewHtmlContent) {

        var label = [];
        var finalHtml = viewHtmlContent;

        console.log("showView: ", jsonObj);

        var html = "<section class='row'>";

        for (var i = 0; i < jsonObj.results.bindings.length; i++) {

            var Title = jsonObj.results.bindings[i].Title.value;
            var Author = jsonObj.results.bindings[i].Author.value;
            var Protein = jsonObj.results.bindings[i].Protein.value;
            var Species = jsonObj.results.bindings[i].Species.value;
            var Gene = jsonObj.results.bindings[i].Gene.value;
            var Located_in = jsonObj.results.bindings[i].Located_in.value;
            var DOI = jsonObj.results.bindings[i].DOI.value;

            label[i] = document.createElement("label");

            // CHANGE LATER !!!
            if (i == 0) {
                label[i].innerHTML += '<h2>Title</h2><br>';
                label[i].innerHTML += Title + '<br>';
                label[i].innerHTML += '<hr>';
                label[i].innerHTML += '<h2>Author</h2><br>';
                label[i].innerHTML += Author + '<br>';
                label[i].innerHTML += '<hr>';
                label[i].innerHTML += '<h2>Protein</h2><br>';
                label[i].innerHTML += Protein + '<br>';
                label[i].innerHTML += '<hr>';
                label[i].innerHTML += '<h2>Species</h2><br>';
                label[i].innerHTML += Species + '<br>';
                label[i].innerHTML += '<hr>';
                label[i].innerHTML += '<h2>Gene</h2><br>';
                label[i].innerHTML += Gene + '<br>';
                label[i].innerHTML += '<hr>';
                label[i].innerHTML += '<h2>DOI</h2><br>';
                label[i].innerHTML += DOI + '<br>';
                label[i].innerHTML += '<hr>';
                label[i].innerHTML += '<h2>Located_in</h2><br>';
            }

            label[i].innerHTML += '<a href=' + Located_in + ' + target=_blank>' + Located_in + '</a><br>';

            html += '<label>' + label[i].innerHTML + '</label><br>';
        }

        html += "</section>";
        finalHtml = insertProperty(finalHtml, "description", html);

        return finalHtml;
    };

    // Load the model
    mainUtils.loadModelHtml = function () {

        var workspaceURI = mainUtils.workspaceName.concat(".cellml");

        var query = 'PREFIX dcterms: <http://purl.org/dc/terms/>' +
            'PREFIX bqmodel: <http://biomodels.net/model-qualifiers/>' +
            'PREFIX vCard: <http://www.w3.org/2001/vcard-rdf/3.0#>' +
            'PREFIX ro: <http://purl.obolibrary.org/obo/ro.owl#>' +
            'SELECT ?Title ?Author ?Protein ?Species ?Gene ?Located_in ?DOI ' +
            'WHERE { ' +
            '<' + workspaceURI + '#title> dcterms:title ?Title . ' +
            '<' + workspaceURI + '#author1VcardN> vCard:FN ?Author . ' +
            '<' + workspaceURI + '#UniProtKB> dcterms:Protein ?Protein . ' +
            '<' + workspaceURI + '#UniProtKB> dcterms:Species ?Species . ' +
            '<' + workspaceURI + '#UniProtKB> dcterms:Gene ?Gene . ' +
            '<' + workspaceURI + '#located_in> ro:located_in ?Located_in . ' +
            '<' + workspaceURI + '#DOI> bqmodel:isDescribedBy ?DOI . ' +
            '}';

        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            modelHtml,
            function (modelHtmlContent) {
                insertHtml("#main-content", modelHtmlContent);

                $ajaxUtils.sendPostRequest(endpoint, query, mainUtils.showModel, true);
            },
            false);
    };

    // Show selected items in a table
    mainUtils.showModel = function (jsonObj) {

        var label = [];
        var modelList = document.getElementById("modelList");

        if (mainUtils.count == 0) {
            // Table header
            var tr = document.createElement("tr");
            tr.id = mainUtils.count;

            for (var i = 0; i < jsonObj.head.vars.length; i++) {
                if (i == 0) {
                    var label = [];
                    var th = document.createElement("th");
                    var id = mainUtils.count;
                    label[i] = document.createElement('label');
                    label[i].innerHTML = '<input id="' + id + '" type="checkbox" data-action="model" value="' +
                        id + '" class="checkbox-inline"></label>';

                    th.appendChild(label[i]);
                    tr.appendChild(th);
                }

                var th = document.createElement("th");
                th.appendChild(document.createTextNode(jsonObj.head.vars[i]));
                tr.appendChild(th);
            }

            thead.appendChild(tr);
            table.appendChild(thead);
        }

        // Table body
        for (var i = 0; i < jsonObj.results.bindings.length; i++) {

            var tr = document.createElement("tr");

            var td = document.createElement("td");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");
            var td4 = document.createElement("td");
            var td5 = document.createElement("td");
            var td6 = document.createElement("td");
            var td7 = document.createElement("td");

            var id = ++mainUtils.count;

            tr.id = id;
            label[i] = document.createElement('label');
            label[i].innerHTML = '<input id="' + id + '" type="checkbox" data-action="model" value="' +
                id + '" class="checkbox-inline"></label>';

            td.appendChild(label[i]);
            td1.appendChild(document.createTextNode(jsonObj.results.bindings[i].Title.value));
            td2.appendChild(document.createTextNode(jsonObj.results.bindings[i].Author.value));
            td3.appendChild(document.createTextNode(jsonObj.results.bindings[i].Protein.value));
            td4.appendChild(document.createTextNode(jsonObj.results.bindings[i].Species.value));
            td5.appendChild(document.createTextNode(jsonObj.results.bindings[i].Gene.value));
            td6.appendChild(document.createTextNode(jsonObj.results.bindings[i].Located_in.value));
            td7.appendChild(document.createTextNode(jsonObj.results.bindings[i].DOI.value));

            tr.appendChild(td);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        modelList.appendChild(table);
    };

    mainUtils.deleteRowModelHtml = function () {

        var hasElement = function (id) {

            for (var i = 0; i < $('table tr').length; i++) {

                if ($('table tr')[i].id == 0)
                    continue;

                if ($('table tr')[i].id == id) {
                    table.deleteRow(i);

                    return id;
                }
            }
        };

        var filtered = listOfModels.filter(hasElement);
        console.log(filtered);

        // Uncheck after delete
        for (var i = 0; i < $('table tr').length; i++) {
            document.getElementsByClassName('checkbox-inline')[i].checked = false;
        }
    };

    mainUtils.loadEpithelialHtml = function () {
        var deleteElement = function (id) {

            for (var i = 0; i < $('table tr').length; i++) {

                if ($('table tr')[i].id == 0)
                    continue;

                if ($('table tr')[i].id == id) {
                    listOfItemsForEpithelial.push($('table tr')[i]);
                    table.deleteRow(i);

                    return id;
                }
            }
        };

        var deleted = listOfModels.filter(deleteElement);
        console.log(deleted);

        showLoading("#main-content");

        $ajaxUtils.sendGetRequest(
            epithelialHtml,
            function (epithelialHtmlContent) {
                insertHtml("#main-content", epithelialHtmlContent);

                $ajaxUtils.sendGetRequest(epithelialHtml, mainUtils.showEpithelial, false);
            },
            false);
    }

    mainUtils.showEpithelial = function (epithelialHtmlContent) {

        // List of compartments
        var compartmentsList = document.getElementById("compartmentsList");

        //var numberOfRows = table.getElementsByTagName('tbody')[0].rows;

        for (var i = 0; i < listOfItemsForEpithelial.length; i++) {

            if (listOfModels.length == 0)
                break;

            for (var j = 0; j < listOfModels.length; j++) {
                if (listOfModels[j] == listOfItemsForEpithelial[i].id) {
                    compartmentsList.innerHTML += '<p id="drag1" draggable="true" ondragstart="$mainUtils.drag(event)">' +
                        listOfItemsForEpithelial[i].getElementsByTagName('td')[3].innerText + '</p>';

                    // Make empty using splice
                    //listOfModels.splice(j, 1);
                }
            }
        }

        // Helper functions for drag and drop
        $mainUtils.allowDrop = function (ev) {
            ev.preventDefault();
        }

        $mainUtils.drag = function (ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        $mainUtils.drop = function (ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }

        // SVG diagram
        var svgGraph = document.getElementById("svgGraph");
    }

    // Expose utility to the global object
    global.$mainUtils = mainUtils;

})(window);