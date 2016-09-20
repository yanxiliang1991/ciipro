document.addEventListener("DOMContentLoaded", function(event) {
    
    (function(global) {
      function now() {
        return new Date();
      }
    
      var force = "";
    
      if (typeof (window._bokeh_onload_callbacks) === "undefined" || force !== "") {
        window._bokeh_onload_callbacks = [];
        window._bokeh_is_loading = undefined;
      }
    
    
      
      
    
      function run_callbacks() {
        window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
        delete window._bokeh_onload_callbacks
        console.info("Bokeh: all callbacks have finished");
      }
    
      function load_libs(js_urls, callback) {
        window._bokeh_onload_callbacks.push(callback);
        if (window._bokeh_is_loading > 0) {
          console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        window._bokeh_is_loading = js_urls.length;
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var s = document.createElement('script');
          s.src = url;
          s.async = false;
          s.onreadystatechange = s.onload = function() {
            window._bokeh_is_loading--;
            if (window._bokeh_is_loading === 0) {
              console.log("Bokeh: all BokehJS libraries loaded");
              run_callbacks()
            }
          };
          s.onerror = function() {
            console.warn("failed to load library " + url);
          };
          console.log("Bokeh: injecting script tag for BokehJS library: ", url);
          document.getElementsByTagName("head")[0].appendChild(s);
        }
      };var element = document.getElementById("18112279-2aa9-46fe-9f02-abe484df6067");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '18112279-2aa9-46fe-9f02-abe484df6067' but no matching script tag was found. ")
        return false;
      }
    
      var js_urls = ['https://cdn.pydata.org/bokeh/release/bokeh-0.12.2.min.js', 'https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.2.min.js', 'https://cdn.pydata.org/bokeh/release/bokeh-compiler-0.12.2.min.js'];
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          Bokeh.$(function() {
              Bokeh.safely(function() {
                  var docs_json = {"56c044fb-ae93-42b1-b821-79e329884ca1":{"roots":{"references":[{"attributes":{"plot":{"id":"4efdd84c-a2e2-44f7-8435-7f7a8349e837","subtype":"Figure","type":"Plot"},"ticker":{"id":"41a268db-e386-4ba9-8f07-fda5bc3f86be","type":"BasicTicker"}},"id":"fca1123f-1cdf-4b9c-8135-dcb067b8e7ec","type":"Grid"},{"attributes":{"data_source":{"id":"9b9bb790-4a9c-4c77-a5a4-f83e5a33acee","type":"ColumnDataSource"},"glyph":{"id":"3ac20171-82ea-418e-85cb-6865d5a04fdd","type":"Rect"},"hover_glyph":null,"nonselection_glyph":{"id":"7e7f80b0-6b22-4c84-919d-a677787ba37d","type":"Rect"},"selection_glyph":null},"id":"2f28fcbb-d491-467a-af6b-45fbb4666891","type":"GlyphRenderer"},{"attributes":{"plot":null,"text":null},"id":"9184d989-7e85-45ac-a931-c7367ad7f93b","type":"Title"},{"attributes":{"fill_color":{"field":"colors"},"height":{"units":"data","value":1},"line_alpha":{"value":0.2},"width":{"units":"data","value":1},"x":{"field":"xs"},"y":{"field":"ys"}},"id":"3ac20171-82ea-418e-85cb-6865d5a04fdd","type":"Rect"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","logo":null,"tools":[{"id":"0b222b1b-f336-4c73-a733-a937fc869033","type":"HoverTool"}]},"id":"7820674a-076e-4af7-81e0-c0f2acfe7919","type":"Toolbar"},{"attributes":{"callback":null,"column_names":["cmps","xs","colors","index","acts","assays","ys"],"data":{"acts":[0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,-1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"assays":[1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188,1188],"cmps":["1989","2486","2566","2789","2794","3078","3225","3776","4266","4636","4696","5781","5794","5929","6819","7016","7037","7193","7284","7368","7392","7675","7762","7784","7819","7845","7986","7996","8023","8094","8117","8140","8294","8313","8346","8594","8830","8931","9309","9395","9642","10107","10352","11345","12198","12361","13930","14223","14456","16116","16253","16421","17472","19079","19343","20826","21567","22342","24730","27689","27829","29393","31249","36606","39230","40813","41109","41381","42128","54739","65360","66644","67598","75267","76187","78458","97605","115171","241582","443831","443947","737139","2723704","2723789","3032791","5352849","5371728","16219277","54678504"],"colors":["white","white","red","white","white","white","white","red","white","white","white","white","white","white","white","white","white","white","red","white","white","white","white","red","red","white","white","white","white","white","red","red","white","white","green","white","red","white","white","white","white","white","red","white","white","white","white","white","white","white","red","red","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white","white"],"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88],"xs":[0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],"ys":[0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5,10.5,11.5,12.5,13.5,14.5,15.5,16.5,17.5,18.5,19.5,20.5,21.5,22.5,23.5,24.5,25.5,26.5,27.5,28.5,29.5,30.5,31.5,32.5,33.5,34.5,35.5,36.5,37.5,38.5,39.5,40.5,41.5,42.5,43.5,44.5,45.5,46.5,47.5,48.5,49.5,50.5,51.5,52.5,53.5,54.5,55.5,56.5,57.5,58.5,59.5,60.5,61.5,62.5,63.5,64.5,65.5,66.5,67.5,68.5,69.5,70.5,71.5,72.5,73.5,74.5,75.5,76.5,77.5,78.5,79.5,80.5,81.5,82.5,83.5,84.5,85.5,86.5,87.5,88.5]}},"id":"9b9bb790-4a9c-4c77-a5a4-f83e5a33acee","type":"ColumnDataSource"},{"attributes":{"callback":null},"id":"b0bf5345-1429-464e-bfcb-8f8ca3a1f2a5","type":"Range1d"},{"attributes":{},"id":"33f2ad08-4e0e-4f27-9b7d-cade9a4242a1","type":"ToolEvents"},{"attributes":{"callback":null,"plot":{"id":"4efdd84c-a2e2-44f7-8435-7f7a8349e837","subtype":"Figure","type":"Plot"},"tooltips":[["Compound","@cmps"],["BioAssay","@assays"],["BioAssay Activity","@acts"]]},"id":"0b222b1b-f336-4c73-a733-a937fc869033","type":"HoverTool"},{"attributes":{},"id":"2b79a5ed-82b1-4935-bc9a-c4d0b991c4cf","type":"BasicTicker"},{"attributes":{},"id":"41a268db-e386-4ba9-8f07-fda5bc3f86be","type":"BasicTicker"},{"attributes":{},"id":"0a8f9aaf-4376-4adb-9900-453898f792c3","type":"BasicTickFormatter"},{"attributes":{"dimension":1,"plot":{"id":"4efdd84c-a2e2-44f7-8435-7f7a8349e837","subtype":"Figure","type":"Plot"},"ticker":{"id":"2b79a5ed-82b1-4935-bc9a-c4d0b991c4cf","type":"BasicTicker"}},"id":"371c1fb2-4cf0-427e-b046-c9e39eb2a7a4","type":"Grid"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"units":"data","value":1},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"width":{"units":"data","value":1},"x":{"field":"xs"},"y":{"field":"ys"}},"id":"7e7f80b0-6b22-4c84-919d-a677787ba37d","type":"Rect"},{"attributes":{"callback":null,"end":89},"id":"68ae9e3d-cfc4-4304-8e67-d8e4b9c1e67f","type":"Range1d"},{"attributes":{"axis_label":"BioAssays","formatter":{"id":"58202c88-81a2-491d-b382-b6a8f2808488","type":"BasicTickFormatter"},"major_label_text_color":{"value":null},"major_tick_line_color":{"value":null},"minor_tick_line_color":{"value":null},"plot":{"id":"4efdd84c-a2e2-44f7-8435-7f7a8349e837","subtype":"Figure","type":"Plot"},"ticker":{"id":"41a268db-e386-4ba9-8f07-fda5bc3f86be","type":"BasicTicker"}},"id":"77d68d35-d27e-4c93-923e-2c511fcb7998","type":"LinearAxis"},{"attributes":{},"id":"58202c88-81a2-491d-b382-b6a8f2808488","type":"BasicTickFormatter"},{"attributes":{"axis_label":"Compounds","formatter":{"id":"0a8f9aaf-4376-4adb-9900-453898f792c3","type":"BasicTickFormatter"},"major_label_text_color":{"value":null},"major_tick_line_color":{"value":null},"minor_tick_line_color":{"value":null},"plot":{"id":"4efdd84c-a2e2-44f7-8435-7f7a8349e837","subtype":"Figure","type":"Plot"},"ticker":{"id":"2b79a5ed-82b1-4935-bc9a-c4d0b991c4cf","type":"BasicTicker"}},"id":"ec291fb6-3540-4a5f-8e1f-49630bbdb701","type":"LinearAxis"},{"attributes":{"below":[{"id":"77d68d35-d27e-4c93-923e-2c511fcb7998","type":"LinearAxis"}],"left":[{"id":"ec291fb6-3540-4a5f-8e1f-49630bbdb701","type":"LinearAxis"}],"plot_height":400,"plot_width":400,"renderers":[{"id":"77d68d35-d27e-4c93-923e-2c511fcb7998","type":"LinearAxis"},{"id":"fca1123f-1cdf-4b9c-8135-dcb067b8e7ec","type":"Grid"},{"id":"ec291fb6-3540-4a5f-8e1f-49630bbdb701","type":"LinearAxis"},{"id":"371c1fb2-4cf0-427e-b046-c9e39eb2a7a4","type":"Grid"},{"id":"2f28fcbb-d491-467a-af6b-45fbb4666891","type":"GlyphRenderer"}],"title":{"id":"9184d989-7e85-45ac-a931-c7367ad7f93b","type":"Title"},"tool_events":{"id":"33f2ad08-4e0e-4f27-9b7d-cade9a4242a1","type":"ToolEvents"},"toolbar":{"id":"7820674a-076e-4af7-81e0-c0f2acfe7919","type":"Toolbar"},"x_range":{"id":"b0bf5345-1429-464e-bfcb-8f8ca3a1f2a5","type":"Range1d"},"y_range":{"id":"68ae9e3d-cfc4-4304-8e67-d8e4b9c1e67f","type":"Range1d"}},"id":"4efdd84c-a2e2-44f7-8435-7f7a8349e837","subtype":"Figure","type":"Plot"}],"root_ids":["4efdd84c-a2e2-44f7-8435-7f7a8349e837"]},"title":"Bokeh Application","version":"0.12.2"}};
                  var render_items = [{"docid":"56c044fb-ae93-42b1-b821-79e329884ca1","elementid":"18112279-2aa9-46fe-9f02-abe484df6067","modelid":"4efdd84c-a2e2-44f7-8435-7f7a8349e837"}];
                  
                  Bokeh.embed.embed_items(docs_json, render_items);
              });
          });
        },
        function(Bokeh) {
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-0.12.2.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.2.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.2.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.2.min.css");
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }
        
      }
    
      if (window._bokeh_is_loading === 0) {
        console.log("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(js_urls, function() {
          console.log("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(this));
});