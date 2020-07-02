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
    document.body.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    var ctx = canvas.getContext('2d');
    myState.pdf.getPage(myState.currentPage).then((page) => {
        var viewport = page.getViewport({scale:myState.zoom});
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
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
    const loadingTask = pdfjsLib.getDocument('http://www.africau.edu/images/default/sample.pdf');
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
    display: '0 auto'
    }
    var style =  {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      backgroundColor: 'black',
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
