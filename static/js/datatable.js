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
      };var element = document.getElementById("636baea0-2735-41b2-aa92-1531d9719d02");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '636baea0-2735-41b2-aa92-1531d9719d02' but no matching script tag was found. ")
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
                  var docs_json = {"f9be06d6-9a83-4ec8-b9f9-68ec7d19da75":{"roots":{"references":[{"attributes":{},"id":"cb3d824e-5750-425e-8edc-562f8e580450","type":"StringFormatter"},{"attributes":{"editor":{"id":"90fcb95a-4741-4558-a5f4-20238b258add","type":"StringEditor"},"field":"Compounds\nTested","formatter":{"id":"12635d51-1e66-4319-98f5-818f48e20ca8","type":"StringFormatter"},"title":"Compounds\nTested"},"id":"2c8c6979-ad63-41c9-b4a7-d7ef124afbfd","type":"TableColumn"},{"attributes":{"columns":[{"id":"c64b0e3a-0331-421f-8ad3-87bb4b52f330","type":"TableColumn"},{"id":"2c8c6979-ad63-41c9-b4a7-d7ef124afbfd","type":"TableColumn"},{"id":"9c433f7c-4c15-4a60-9b6e-72be800c9a91","type":"TableColumn"},{"id":"7a888d41-3e5d-469c-b31b-cf4a09b8bd24","type":"TableColumn"},{"id":"eddbb2d6-0760-43f7-8c32-1890fe29cb16","type":"TableColumn"},{"id":"28e7bf98-6d60-401d-9ba2-94548df932d1","type":"TableColumn"},{"id":"928d10bb-dd2a-4d49-99ca-30af9c70cb3f","type":"TableColumn"},{"id":"b08e8c70-87f9-44d9-b10d-4d64e17184d2","type":"TableColumn"},{"id":"e38d31df-9ec3-4f1c-9a10-74f729ab41c6","type":"TableColumn"},{"id":"4eb01c34-792b-498f-bd27-a6ed33e5fe10","type":"TableColumn"},{"id":"1f006fe2-588f-46ee-a69a-29458a15aa7b","type":"TableColumn"},{"id":"2d94982a-ea5d-48ef-bfe1-a0e543159fbb","type":"TableColumn"},{"id":"246fc0e0-f945-4cbd-b1ba-2d4f864a468b","type":"TableColumn"}],"height":1600,"row_headers":false,"source":{"id":"6685c3f2-4b34-473c-a621-3dc489686fd8","type":"ColumnDataSource"},"width":800},"id":"31c5693f-7a00-475c-92f4-525517fd6343","type":"DataTable"},{"attributes":{},"id":"c66fce32-0b44-4618-b00b-e7916de8e1b2","type":"StringFormatter"},{"attributes":{"editor":{"id":"af484395-3902-4b6c-a761-55f9461a4072","type":"StringEditor"},"field":"Coverage","formatter":{"id":"4c046426-1a9b-4a89-b01a-970fc66a6226","type":"StringFormatter"},"title":"Coverage"},"id":"246fc0e0-f945-4cbd-b1ba-2d4f864a468b","type":"TableColumn"},{"attributes":{},"id":"5258f036-e5c1-4a14-a0f7-97862f4bb8ff","type":"StringEditor"},{"attributes":{},"id":"7ddf8c40-c115-4180-bb99-d482b81763cd","type":"StringEditor"},{"attributes":{"editor":{"id":"337759d4-9efa-4762-9a61-8dd59b61c022","type":"StringEditor"},"field":"L parameter","formatter":{"id":"43d6e07a-f9c6-42e6-a578-c414594a96bf","type":"StringFormatter"},"title":"L parameter"},"id":"2d94982a-ea5d-48ef-bfe1-a0e543159fbb","type":"TableColumn"},{"attributes":{},"id":"51e7c5be-16cc-43c7-bad5-5efcc85edd8f","type":"StringFormatter"},{"attributes":{"editor":{"id":"e05f87f9-8ed1-493c-91de-41c70aa27a49","type":"StringEditor"},"field":"PubChem AID","formatter":{"id":"c66fce32-0b44-4618-b00b-e7916de8e1b2","type":"StringFormatter"},"title":"PubChem AID"},"id":"c64b0e3a-0331-421f-8ad3-87bb4b52f330","type":"TableColumn"},{"attributes":{"editor":{"id":"fd096298-9653-46b2-bb5e-2a3f539c98b4","type":"StringEditor"},"field":"CCR","formatter":{"id":"51e7c5be-16cc-43c7-bad5-5efcc85edd8f","type":"StringFormatter"},"title":"CCR"},"id":"e38d31df-9ec3-4f1c-9a10-74f729ab41c6","type":"TableColumn"},{"attributes":{"editor":{"id":"5258f036-e5c1-4a14-a0f7-97862f4bb8ff","type":"StringEditor"},"field":"NPV","formatter":{"id":"f86226c2-609c-4d1a-929f-b5807f3bd4de","type":"StringFormatter"},"title":"NPV"},"id":"1f006fe2-588f-46ee-a69a-29458a15aa7b","type":"TableColumn"},{"attributes":{},"id":"43d6e07a-f9c6-42e6-a578-c414594a96bf","type":"StringFormatter"},{"attributes":{},"id":"d49de63b-2255-466c-afb9-2d2b1de57800","type":"StringFormatter"},{"attributes":{},"id":"cbe883fa-0160-4560-8dd0-6c3bc1ec6550","type":"StringEditor"},{"attributes":{"editor":{"id":"464d0bd5-b321-4e2e-a709-2f76dfb8ecf1","type":"StringEditor"},"field":"Specificity","formatter":{"id":"cb3d824e-5750-425e-8edc-562f8e580450","type":"StringFormatter"},"title":"Specificity"},"id":"b08e8c70-87f9-44d9-b10d-4d64e17184d2","type":"TableColumn"},{"attributes":{},"id":"12635d51-1e66-4319-98f5-818f48e20ca8","type":"StringFormatter"},{"attributes":{"editor":{"id":"be0e428d-828b-4951-a170-8dab62852058","type":"StringEditor"},"field":"FN","formatter":{"id":"d72b9da4-4dd0-40b2-bfb5-34bf79c30c05","type":"StringFormatter"},"title":"FN"},"id":"28e7bf98-6d60-401d-9ba2-94548df932d1","type":"TableColumn"},{"attributes":{},"id":"650fdc29-676a-4e47-9fee-0cafc658acf8","type":"StringEditor"},{"attributes":{},"id":"4b979bf5-db9d-48e1-babb-4c4d11fa8284","type":"StringFormatter"},{"attributes":{"editor":{"id":"4af97055-8188-4684-ba0f-e0a3a9cfd174","type":"StringEditor"},"field":"TP","formatter":{"id":"e725ba29-b053-4c65-bc44-3f95c3018bed","type":"StringFormatter"},"title":"TP"},"id":"9c433f7c-4c15-4a60-9b6e-72be800c9a91","type":"TableColumn"},{"attributes":{},"id":"be0e428d-828b-4951-a170-8dab62852058","type":"StringEditor"},{"attributes":{},"id":"f86226c2-609c-4d1a-929f-b5807f3bd4de","type":"StringFormatter"},{"attributes":{},"id":"337759d4-9efa-4762-9a61-8dd59b61c022","type":"StringEditor"},{"attributes":{"callback":null,"column_names":["FP","index","Sensitivity","Compounds\nTested","L parameter","CCR","NPV","TP","PPV","PubChem AID","TN","Specificity","Coverage","FN"],"data":{"CCR":[0.56],"Compounds\nTested":[12],"Coverage":[0.13],"FN":[0.0],"FP":[8],"L parameter":[1.0],"NPV":[1.0],"PPV":[0.27],"PubChem AID":[1188],"Sensitivity":[1.0],"Specificity":[0.11],"TN":[1],"TP":[3],"index":[1188]}},"id":"6685c3f2-4b34-473c-a621-3dc489686fd8","type":"ColumnDataSource"},{"attributes":{},"id":"464d0bd5-b321-4e2e-a709-2f76dfb8ecf1","type":"StringEditor"},{"attributes":{},"id":"4af97055-8188-4684-ba0f-e0a3a9cfd174","type":"StringEditor"},{"attributes":{},"id":"90fcb95a-4741-4558-a5f4-20238b258add","type":"StringEditor"},{"attributes":{"editor":{"id":"cbe883fa-0160-4560-8dd0-6c3bc1ec6550","type":"StringEditor"},"field":"PPV","formatter":{"id":"e91fc5b8-1f73-486c-aa94-54fb7bf22270","type":"StringFormatter"},"title":"PPV"},"id":"4eb01c34-792b-498f-bd27-a6ed33e5fe10","type":"TableColumn"},{"attributes":{},"id":"d72b9da4-4dd0-40b2-bfb5-34bf79c30c05","type":"StringFormatter"},{"attributes":{},"id":"e725ba29-b053-4c65-bc44-3f95c3018bed","type":"StringFormatter"},{"attributes":{},"id":"fd096298-9653-46b2-bb5e-2a3f539c98b4","type":"StringEditor"},{"attributes":{},"id":"3b69c3ec-e91b-4884-93d1-7e6c94160bbb","type":"StringEditor"},{"attributes":{"editor":{"id":"650fdc29-676a-4e47-9fee-0cafc658acf8","type":"StringEditor"},"field":"TN","formatter":{"id":"4b979bf5-db9d-48e1-babb-4c4d11fa8284","type":"StringFormatter"},"title":"TN"},"id":"7a888d41-3e5d-469c-b31b-cf4a09b8bd24","type":"TableColumn"},{"attributes":{},"id":"aa01e195-8c56-4505-9361-5916203068e3","type":"StringFormatter"},{"attributes":{"editor":{"id":"3b69c3ec-e91b-4884-93d1-7e6c94160bbb","type":"StringEditor"},"field":"Sensitivity","formatter":{"id":"aa01e195-8c56-4505-9361-5916203068e3","type":"StringFormatter"},"title":"Sensitivity"},"id":"928d10bb-dd2a-4d49-99ca-30af9c70cb3f","type":"TableColumn"},{"attributes":{},"id":"4c046426-1a9b-4a89-b01a-970fc66a6226","type":"StringFormatter"},{"attributes":{},"id":"af484395-3902-4b6c-a761-55f9461a4072","type":"StringEditor"},{"attributes":{"editor":{"id":"7ddf8c40-c115-4180-bb99-d482b81763cd","type":"StringEditor"},"field":"FP","formatter":{"id":"d49de63b-2255-466c-afb9-2d2b1de57800","type":"StringFormatter"},"title":"FP"},"id":"eddbb2d6-0760-43f7-8c32-1890fe29cb16","type":"TableColumn"},{"attributes":{},"id":"e91fc5b8-1f73-486c-aa94-54fb7bf22270","type":"StringFormatter"},{"attributes":{},"id":"e05f87f9-8ed1-493c-91de-41c70aa27a49","type":"StringEditor"}],"root_ids":["31c5693f-7a00-475c-92f4-525517fd6343"]},"title":"Bokeh Application","version":"0.12.2"}};
                  var render_items = [{"docid":"f9be06d6-9a83-4ec8-b9f9-68ec7d19da75","elementid":"636baea0-2735-41b2-aa92-1531d9719d02","modelid":"31c5693f-7a00-475c-92f4-525517fd6343"}];
                  
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