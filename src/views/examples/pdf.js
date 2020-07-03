import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import "react-pdf/dist/Page/AnnotationLayer.css";
import "views/RiggsPDF.pdf";
import * as pdfjsLib from 'pdfjs-dist';

function render(myState) {
    console.log(myState.zoom)
    document.getElementById("pdf_renderer").remove();
    var container = document.getElementById("canvas_container");
    var canvas = document.createElement('canvas');
    container.appendChild(canvas);
    canvas.id     = "pdf_renderer";

    var ctx = canvas.getContext('2d');
    myState.pdf.getPage(myState.currentPage).then((page) => {
        var viewport = page.getViewport({scale:myState.zoom});
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        page.render({
            canvasContext: ctx,
            viewport: viewport,
        });
        setupAnnotations(page, viewport, canvas, ctx)
    });
}

  function setupAnnotations(page, viewport, canvas, ctx) {
    var canvasOffset = canvas.getBoundingClientRect();
    var promise = page.getAnnotations().then(function (annotationsData) {
      viewport = viewport.clone({
        dontFlip: true
      });
      for (var i = 0; i < annotationsData.length; i++) {
        var annotation = annotationsData[i];
        console.log('url' in annotation)
        if (!annotation || !('url' in annotation)) {
          continue;
        }
        console.log(annotation)


        drawHyperLink(canvas, ctx, annotation)
        console.log('appended ')

        var linkText = "Authorcode";
        var linkURL = "http://www.authorcode.com";
        var linkX = 50;
        var linkY = 25;
        var linkHeight = 600;
        var linkWidth;
        var isLink = true;


        function drawHyperLink(canvas, ctx, annotation) {
            // check if supported
            if (canvas.getContext) {
                ctx.font = linkHeight + 'px sans-serif';
                ctx.fillStyle = "#0000ff";
                ctx.fillText(linkText, linkX, linkY);
                linkWidth = ctx.measureText(linkText).width;
                ctx.beginPath();
                ctx.rect(annotation.rect[0], annotation.rect[1], annotation.rect[2] - annotation.rect[0], annotation.rect[3] - annotation.rect[1])
                ctx.stroke();
                canvas.addEventListener('mousedown', function(e) {
                    getCursorPosition(canvas, e, annotation.rect, annotation.url)
                })

                canvas.addEventListener("mousemove", (e) => CanvasMouseMove(e, annotation.rect), false);
                canvas.addEventListener("click", (e) => Link_click(e, annotation.url, ), false);

            }
        }

        function getCursorPosition(canvas, event, rectLink, url) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            console.log("x: " + x + " y: " + y)
            var linkX, linkY, linkWidth, linkHeight;
            linkX = rectLink[0]
            linkY = rectLink[1]
            linkWidth = rectLink[2] - rectLink[0]
            linkHeight = rectLink[3] - rectLink[1]
            console.log(rectLink)
            console.log("x: " + x + " y: " + y, linkX, linkY, linkWidth, linkHeight)
            if (x >= linkX && x <= (linkX + linkWidth)
                    && y <= linkY && y >= (linkY - linkHeight)) {
                document.body.style.cursor = "pointer";
                isLink = true;
            }
            else {
                document.body.style.cursor = "";
                isLink = false;
            }
        }

        function CanvasMouseMove(e, rect) {
            var x, y, linkWidth, linkHeight;
            x = rect[0]
            y = rect[1]
            linkWidth = rect[2] - rect[0]
            linkHeight = rect[3] - rect[1]
            if (x >= linkX && x <= (linkX + linkWidth)
                    && y <= linkY && y >= (linkY - linkHeight)) {
                document.body.style.cursor = "pointer";
                isLink = true;
            }
            else {
                document.body.style.cursor = "";
                isLink = false;
            }
        }

        function Link_click(e, url) {
            if (isLink) {
                window.location = url;
            }
        }
        break;
      }
    });
    return promise;
  }

function Studentreader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
    var myState = {
        pdf: null,
        currentPage: 1,
        zoom: 1
    }
    // more code here
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`
    const loadingTask = pdfjsLib.getDocument('http://www.pdf995.com/samples/pdf.pdf');
    console.log('wtf')
    loadingTask.promise.then(function(pdf) {
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
          backgroundColor: '#FFFFFF',

    }
    var style =  {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: '#FFFFFF',
      color: 'white',
      textAlign: 'center'
    }

  return (

      <div id="my_pdf_viewer" >
        <div id="canvas_container" style={canvasStyle}>
            <canvas id="pdf_renderer" ></canvas>
        </div>
            <div id="navigation_controls" style={style}>
            <button id="go_previous">Previous</button>
            <input id="current_page" type="number"/>
            <button id="go_next">Next</button>
             <div >
            <div id="zoom_controls">
            <button id="zoom_in">+</button>
            <button id="zoom_out">-</button>
            </div>
            </div>
        </div>
      </div>
      );
}
export default Studentreader;
