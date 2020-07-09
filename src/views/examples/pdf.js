import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "views/RiggsPDF.pdf";
import * as pdfjsLib from 'pdfjs-dist';

var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

async function goToPage(num) {
    myState.currentPage = num
    document.getElementById("current_page").value = num
    render(myState)
}

async function goToText() {
    var searchText = document.getElementById("searchtext").value
    searchText.replace(/\s+/g, '');
    var currentPage = myState.currentPage
    if(searchText) {
        console.log(searchText, currentPage)
    }
    searchText = searchText.toLowerCase()
    var maxPages = myState.pdf._pdfInfo.numPages;
    var countPromises = []; // collecting all page promises
    var pageNum = currentPage;
    for (var j = parseInt(currentPage) + 1; j <= maxPages; j++) {
      var page = await myState.pdf.getPage(j);

      var txt = "";
      var textContent = await page.getTextContent();
      textContent = textContent.items.map(function (s) { return s.str; }).join('').toLowerCase(); // value page text
      if (textContent.includes(searchText)) {
        console.log(textContent)
        pageNum = j;
        break;
      }
    }
    myState.currentPage = pageNum
    document.getElementById("current_page").value = pageNum
    render(myState)
}

function render(myState) {
    document.getElementById("pdf_renderer").remove();
    var container = document.getElementById("canvas_container");
    var canvas = document.createElement('canvas');
    var canvasStyle = {
    display: '0 auto',
          backgroundColor: '#FFFFFF',
          position: 'absolute'

    }
    canvas.id     = "pdf_renderer";
    canvas.style.position = 'relative'
    container.appendChild(canvas);
    canvas.addEventListener("mousemove", (e) => {document.body.style.cursor  = 'auto'}, false);

    var ctx = canvas.getContext('2d');

    myState.pdf.getPage(myState.currentPage).then((page) => {
        var viewport = page.getViewport({scale:myState.zoom});
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        page.render({
            canvasContext: ctx,
            viewport: viewport,
        });
        setupAnnotations(page, viewport, canvas, ctx, myState.zoom)
    });


}

  function setupAnnotations(page, viewport, canvas, ctx, zoom) {
    var canvasOffset = canvas.getBoundingClientRect();
    var promise = page.getAnnotations().then(function (annotationsData) {
      viewport = viewport.clone({
        dontFlip: true
      });
      for (var i = 0; i < annotationsData.length; i++) {
        var annotation = annotationsData[i];
        console.log(annotation)
        if (!annotation || !('Link' == annotation.subtype)) {
          continue;
        }

        drawHyperLink(canvas, ctx, annotation, zoom, page.view)

        var linkText = "Authorcode";
        var linkURL = "http://www.authorcode.com";
        var linkX = 50;
        var linkY = 25;
        var linkWidth;
        var isLink = true;


        function drawHyperLink(canvas, ctx, annotation, zoom, viewport) {
            // check if supported
            if (canvas.getContext) {
                ctx.font = 'px sans-serif';
                ctx.fillStyle = "#0000ff";
                ctx.fillText(linkText, linkX, linkY);
                linkWidth = ctx.measureText(linkText).width;
                //ctx.beginPath();
                //ctx.rect(annotation.rect[0], annotation.rect[1], annotation.rect[2] - annotation.rect[0], annotation.rect[3] - annotation.rect[1])
                //ctx.stroke();
                canvas.addEventListener("click", (e) => getCursorPosition(ctx.canvas, e, annotation.rect, annotation.url, zoom, viewport, annotation.dest), false);
                canvas.addEventListener("mousemove", (e) => setCursor(ctx.canvas, e, annotation.rect, annotation.url, zoom, viewport), false);
            }
        }

        function getCursorPosition(canvas, event, rectLink, url, zoom, viewport, dest) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            var linkX, linkY, linkWidth, linkHeight;
            linkX = rectLink[0] * zoom
            linkHeight = (rectLink[3] - rectLink[1]) * zoom
            linkY = ((viewport[3] - rectLink[1])) * zoom - linkHeight
            linkWidth = (rectLink[2] - rectLink[0]) * zoom
            if (x >= linkX && x <= (linkX + linkWidth)
                    && y >= linkY && y <= (linkY + linkHeight)) {
                if(dest) {
                    dest = dest.substring(dest.indexOf('.')+1)
                    console.log(dest)
                    document.getElementById("searchtext").value = dest
                    goToText()
                }
                else {
                window.location = url; }
            }
        }

        function setCursor(canvas, event, rectLink, url, zoom, viewport) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            var linkX, linkY, linkWidth, linkHeight;
            linkX = rectLink[0] * zoom
            linkHeight = (rectLink[3] - rectLink[1]) * zoom
            linkY = ((viewport[3] - rectLink[1])) * zoom - linkHeight
            linkWidth = (rectLink[2] - rectLink[0]) * zoom
            if (x >= linkX && x <= (linkX + linkWidth)
                    && y >= linkY && y <= (linkY + linkHeight)) {
                document.body.style.cursor = 'pointer'
            }
        }
      }
    });
    return promise;
  }

function Studentreader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
    // more code here
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`
    const loadingTask = pdfjsLib.getDocument('https://arek-kravitz-bucket.s3.amazonaws.com/sample.pdf');

    function makeThumb(num, page) {
      // draw page to fit into 96x96 canvas
      var vp = page.getViewport({scale:myState.zoom});
      var canvas = document.createElement("canvas");
      canvas.width = canvas.height = 96;
      canvas.onclick = function() { goToPage(num); }
      var scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);

      return page.render({canvasContext: canvas.getContext("2d"), viewport: page.getViewport({scale:scale})}).promise.then(function () {
        canvas.getContext("2d").font = "20px Arial";
        canvas.getContext("2d").fillText(String(num), 10, 20);
        return canvas;
      });
    }

    pdfjsLib.getDocument('https://arek-kravitz-bucket.s3.amazonaws.com/sample.pdf').promise.then(function (doc) {
      var pages = []; while (pages.length < doc.numPages) pages.push(pages.length + 1);
      return Promise.all(pages.map(function (num) {
        // create a div for each page and build a small canvas for it
        var div = document.getElementById("preview");
        return doc.getPage(num).then((e) => makeThumb(num, e))
          .then(function (canvas) {
            div.appendChild(canvas);
        });
      }));
    }).catch(console.error);

    loadingTask.promise.then(function(pdf) {
      console.log(pdf.getPageLabels().then(e=>console.log(e)))
      myState.pdf = pdf;
        document.getElementById('zoom_in')
        .addEventListener('click', (e) => {
            if(myState.pdf == null) return;
            myState.zoom += 0.5;
            render(myState);
        });
        document.getElementById('zoom_out')
        .addEventListener('click', (e) => {
            if(myState.pdf == null) return;
            myState.zoom -= 0.5;
            render(myState);
        });
        document.getElementById('go_previous')
                .addEventListener('click', (e) => {
                    if(myState.pdf == null
                       || myState.currentPage == 1) return;
                    myState.currentPage -= 1;
                    document.getElementById("current_page")
                            .value = myState.currentPage;
                    render(myState);
                });
        document.getElementById('go_next')
                .addEventListener('click', (e) => {
                    if(myState.pdf == null
                       || myState.currentPage > myState.pdf
                                                       ._pdfInfo.numPages)
                       return;

                    myState.currentPage += 1;
                    document.getElementById("current_page")
                            .value = myState.currentPage;
                    render(myState);
        });
        document.getElementById('current_page')
        .addEventListener('keypress', (e) => {
            if(myState.pdf == null) return;

            // Get key code
            var code = (e.keyCode ? e.keyCode : e.which);

            // If key code matches that of the Enter key
            if(code == 13) {
                var desiredPage =
                        document.getElementById('current_page')
                                .valueAsNumber;

                if(desiredPage >= 1
                   && desiredPage <= myState.pdf
                                            ._pdfInfo.numPages) {
                        myState.currentPage = desiredPage;
                        document.getElementById("current_page")
                                .value = desiredPage;
                        render(myState);
                }
            }
        });
      render(myState);
    })
    var canvasStyle = {
    display: '0 auto',
          backgroundColor: '#2CA8FF',
                verticalAlign: 'bottom',

          position: 'relative'

    }


    var style =  {
      verticalAlign: 'top',
      width: '100%',
      backgroundColor: '#2CA8FF',
      color: 'white',
      textAlign: 'center',
        position:'relative',
        width:'100%',
        minWidth:'315px'
    }

    var buttonsLeft = {
        position:'absolute',
        top:'0px',
        left:'0px',
        height:'27px',
        width:'400px',display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }


    var buttonsRight = {
    position:'absolute',
    top:'0px',
    right:'0px',
    height:'27px',
    width:'300px',display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }

    var buttonsCenter = {
    height:'27px',
    width:'200px',
    margin:'0px auto',display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }
  return (
    <div>
              <div id="my_pdf_viewer" >
                          <div id="navigation_controls" style={style}>
                <div style={buttonsLeft}>
                <button className="buttono button2" id="go_previous">Previous</button>
                <button className="buttono button2" id="go_next">Next</button>
                <input id="current_page" placeholder={1} type="number"/>
                </div>

                <div style={buttonsCenter}>
                <button className="buttono button2" id="zoom_in">Zoom In</button>
                <button className="buttono button2" id="zoom_out">Zoom out</button>
                </div>
                <div style={buttonsRight}>
                <input id='searchtext' type="text" placeholder="Go to text"></input>
                <button className="buttono button2" id="go" onClick={goToText}>Go</button>
                </div>
            </div>
                    <div id="canvas_container" style={canvasStyle}>
                        <canvas id="pdf_renderer" ></canvas>
                    </div>
                    <div id="preview"> </div>
              </div>
    </div>
      );
}
export default Studentreader;
