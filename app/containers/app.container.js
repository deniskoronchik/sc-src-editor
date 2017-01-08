//React library
import React from 'react';

import '../assets/less/all.less';

//Custom components
import FileTree from '../components/filetree.component';
import TabEditor from '../components/tab_editor.component';
import {listFiles} from '../js/filesprovider.js';

class AppContainer extends React.Component {

  constructor(props) {
     super(props);

     this.state = {
       files: null,
       openedFiles: [],
       activeFile: ""
     };
   }

  dragImpl (leftPaneId, rightPaneId, separatorId, leftLimit, rightLimit) {
    var sdrag = (function () {
        // simple drag
        function sdrag(onDrag, onStop, direction) {

            var startX = 0;
            var startY = 0;
            var el = this;
            var dragging = false;

            function move(e) {

                var fix = {};
                onDrag && onDrag(el, e.pageX, startX, e.pageY, startY, fix);
                if ('vertical' !== direction) {
                    var pageX = ('pageX' in fix) ? fix.pageX : e.pageX;
                    if ('startX' in fix) {
                        startX = fix.startX;
                    }
                    if (false === ('skipX' in fix)) {
                        el.style.left = (pageX - startX) + 'px';
                    }
                }
                if ('horizontal' !== direction) {
                    var pageY = ('pageY' in fix) ? fix.pageY : e.pageY;
                    if ('startY' in fix) {
                        startY = fix.startY;
                    }
                    if (false === ('skipY' in fix)) {
                        el.style.top = (pageY - startY) + 'px';
                    }
                }
            }

            function startDragging(e) {
                if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
                    dragging = true;
                    var left = el.style.left ? parseInt(el.style.left) : 0;
                    var top = el.style.top ? parseInt(el.style.top) : 0;
                    startX = e.pageX - left;
                    startY = e.pageY - top;
                    window.addEventListener('mousemove', move);
                }
                else {
                    throw new Error("Your target must be an html element");
                }
            }

            this.addEventListener('mousedown', startDragging);
            window.addEventListener('mouseup', function (e) {
                if (true === dragging) {
                    dragging = false;
                    window.removeEventListener('mousemove', move);
                    onStop && onStop(el, e.pageX, startX, e.pageY, startY);
                }
            });
        }

        Element.prototype.sdrag = sdrag;
    })();

    var leftPane = document.getElementById(leftPaneId);
    var rightPane = document.getElementById(rightPaneId);
    var paneSep = document.getElementById(separatorId);

    leftLimit = leftLimit | 10;
    rightLimit = rightLimit | 90;

    paneSep.sdrag(function (el, pageX, startX, pageY, startY, fix) {
        fix.skipX = true;
        if (pageX < window.innerWidth * leftLimit / 100) {
            pageX = window.innerWidth * leftLimit / 100;
            fix.pageX = pageX;
        }
        if (pageX > window.innerWidth * rightLimit / 100) {
            pageX = window.innerWidth * rightLimit / 100;
            fix.pageX = pageX;
        }

        var cur = pageX / window.innerWidth * 100;
        if (cur < 0) {
            cur = 0;
        }
        if (cur > window.innerWidth) {
            cur = window.innerWidth;
        }

        var right = (100-cur-2);
        leftPane.style.width = cur + '%';
        rightPane.style.width = right + '%';

    }, null, 'horizontal');
  }

  componentDidMount () {
    this.dragImpl('editor-ft', 'editor-tabs', 'panes-separator', 10, 90);

    this.setState(prevState => ({
      files: FileProvider.list("D:/github/SmartHome/kb/TestHouse")
    }));
  }

  onRequestOpenFile(file_item) {
    // append file tab
    if (this.state.openedFiles.indexOf(file_item) === -1) {
      this.setState(prevState => ({
        openedFiles: prevState.openedFiles.concat([file_item]),
        activeFile: file_item.fullpath
      }));
    } else {
      this.setState(prevState => ({
        activeFile: file_item.fullpath
      }));
    }
  }

  onRequestCloseFile(file_path) {
    // try to find it in opened files and close
    var found_idx = -1;
    const el = this.state.openedFiles.find((item, index) => {
      const res = (item.fullpath === file_path);
      if (res) {
        found_idx = index;
      }
      return res;
    });

    if (el && found_idx != -1) {
      this.setState(function(prevState, props) {
        prevState.openedFiles.splice(found_idx, 1);
        var new_state = {
          openedFiles: prevState.openedFiles
        }

        // change active tab
        if (file_path == this.state.activeFile) {
          var active_file = "";
          if (prevState.openedFiles.length > 0) {
              const active_idx = Math.min(found_idx, prevState.openedFiles.length - 1);
              active_file = prevState.openedFiles[active_idx].fullpath;
          }
          new_state['activeFile'] = active_file;
        }

        return new_state;
      }); // setState
    } else {
      throw "Unknown error: try to close file {0} but it doesn't opened".format(file_path);
    }
  }

  render () {
    return (
      <div className="panes-container">
        <FileTree
          files = {this.state.files}
          onRequestOpenFile = {this.onRequestOpenFile.bind(this)}
          />
        <div className="panes-separator" id="panes-separator"></div>
        <div id="editor-tabs" className="right-pane">
          <TabEditor
            tabs              = {this.state.openedFiles}
            active            = {this.state.activeFile}
            onRequestCloseTab = {this.onRequestCloseFile.bind(this)}
            />
        </div>
      </div>
    );
  }
}

export default AppContainer
