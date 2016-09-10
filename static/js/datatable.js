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
      };var element = document.getElementById("fdde5906-ee95-4c68-9807-275f34768f83");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'fdde5906-ee95-4c68-9807-275f34768f83' but no matching script tag was found. ")
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
                  var docs_json = {"c0400697-f2ad-4fad-9720-b1ea4db47801":{"roots":{"references":[{"attributes":{},"id":"03412081-a3e2-43c8-bbaf-559a661a826d","type":"StringFormatter"},{"attributes":{},"id":"87b7eca4-ae1c-4bca-8bf0-b450400689c3","type":"StringEditor"},{"attributes":{"editor":{"id":"5cf0d3ce-3f41-4e31-a771-7da03ac2f98e","type":"StringEditor"},"field":"FP","formatter":{"id":"b3bac9c0-5b90-48e3-a230-f1cf5053a140","type":"StringFormatter"},"title":"FP"},"id":"fd646e80-61de-49af-a376-d881cd72c263","type":"TableColumn"},{"attributes":{},"id":"57c7f6a3-0422-4277-9a87-1e363255c241","type":"StringEditor"},{"attributes":{},"id":"073c9bcd-e86b-4707-b72b-7b1b592fb8d7","type":"StringEditor"},{"attributes":{"editor":{"id":"13684dac-5869-463c-b4e4-84d33f481319","type":"StringEditor"},"field":"L parameter","formatter":{"id":"c37c0062-8668-411f-9ef1-4c84ab032f47","type":"StringFormatter"},"title":"L parameter"},"id":"b4967e19-1356-4b6a-a3e9-00c2a68ef644","type":"TableColumn"},{"attributes":{},"id":"dea9d3b9-c3e1-43d6-8333-a70972d78d36","type":"StringEditor"},{"attributes":{},"id":"f68c53f2-b130-49c6-82ac-e1a6a725e30a","type":"StringEditor"},{"attributes":{},"id":"b3bac9c0-5b90-48e3-a230-f1cf5053a140","type":"StringFormatter"},{"attributes":{},"id":"3a69d56d-e029-43aa-940f-e3ba1fe42b2c","type":"StringEditor"},{"attributes":{"editor":{"id":"f895ead0-df4c-4ec5-b47f-df24557d86d0","type":"StringEditor"},"field":"PubChem AID","formatter":{"id":"c6bedb08-60bb-49a3-b83b-add3f08bb505","type":"StringFormatter"},"title":"PubChem AID"},"id":"025000be-e770-4d50-a419-3be8afc5a816","type":"TableColumn"},{"attributes":{"editor":{"id":"8a6c56bd-6e19-4eab-b50c-974e9acaffd9","type":"StringEditor"},"field":"FN","formatter":{"id":"8b0abb12-0333-486c-873c-b8f91fdf2f67","type":"StringFormatter"},"title":"FN"},"id":"5eae5dc5-5a48-460b-be0d-de3c8f1fc44f","type":"TableColumn"},{"attributes":{},"id":"f895ead0-df4c-4ec5-b47f-df24557d86d0","type":"StringEditor"},{"attributes":{"editor":{"id":"f68c53f2-b130-49c6-82ac-e1a6a725e30a","type":"StringEditor"},"field":"CCR","formatter":{"id":"fb144a99-e82c-4744-bd98-1276df1a084b","type":"StringFormatter"},"title":"CCR"},"id":"f2cea770-3e16-42a7-a521-8898b07d34e1","type":"TableColumn"},{"attributes":{},"id":"6c3ebe07-2e16-4744-b93d-615818cfbb5c","type":"StringFormatter"},{"attributes":{},"id":"8b0abb12-0333-486c-873c-b8f91fdf2f67","type":"StringFormatter"},{"attributes":{"editor":{"id":"073c9bcd-e86b-4707-b72b-7b1b592fb8d7","type":"StringEditor"},"field":"TN","formatter":{"id":"907007e6-9087-4ad2-b976-f0119f1f9145","type":"StringFormatter"},"title":"TN"},"id":"69de2860-a0fc-40c9-90d6-f3f11c2340a4","type":"TableColumn"},{"attributes":{"editor":{"id":"35232e35-fbbf-4427-b349-5460dc8cd618","type":"StringEditor"},"field":"Specificity","formatter":{"id":"03412081-a3e2-43c8-bbaf-559a661a826d","type":"StringFormatter"},"title":"Specificity"},"id":"008db1aa-6d88-49c8-80d8-113b36b3f413","type":"TableColumn"},{"attributes":{},"id":"8a6c56bd-6e19-4eab-b50c-974e9acaffd9","type":"StringEditor"},{"attributes":{"editor":{"id":"dea9d3b9-c3e1-43d6-8333-a70972d78d36","type":"StringEditor"},"field":"Coverage","formatter":{"id":"bcd39188-1594-4336-9120-96cc126b8c93","type":"StringFormatter"},"title":"Coverage"},"id":"60bebad1-9b64-4104-9ad2-62410ce4382f","type":"TableColumn"},{"attributes":{"editor":{"id":"c5c88ab3-9c1c-4ca6-adb9-478699ae89ec","type":"StringEditor"},"field":"Compounds\nTested","formatter":{"id":"3b8e6ace-5138-42cd-ab32-0150ab0a2083","type":"StringFormatter"},"title":"Compounds\nTested"},"id":"e91a633b-c7fd-4b18-b2f8-b7ad62b26789","type":"TableColumn"},{"attributes":{},"id":"13684dac-5869-463c-b4e4-84d33f481319","type":"StringEditor"},{"attributes":{"columns":[{"id":"025000be-e770-4d50-a419-3be8afc5a816","type":"TableColumn"},{"id":"e91a633b-c7fd-4b18-b2f8-b7ad62b26789","type":"TableColumn"},{"id":"664fcab1-e72f-4f9d-a826-419719460498","type":"TableColumn"},{"id":"69de2860-a0fc-40c9-90d6-f3f11c2340a4","type":"TableColumn"},{"id":"fd646e80-61de-49af-a376-d881cd72c263","type":"TableColumn"},{"id":"5eae5dc5-5a48-460b-be0d-de3c8f1fc44f","type":"TableColumn"},{"id":"87b034e4-b074-4045-a132-49eb1b42f01c","type":"TableColumn"},{"id":"008db1aa-6d88-49c8-80d8-113b36b3f413","type":"TableColumn"},{"id":"f2cea770-3e16-42a7-a521-8898b07d34e1","type":"TableColumn"},{"id":"1b89a02d-a0b0-4004-b61c-89777e4f9902","type":"TableColumn"},{"id":"3b8a2363-1a9f-4923-9c68-f47fa8dd5746","type":"TableColumn"},{"id":"b4967e19-1356-4b6a-a3e9-00c2a68ef644","type":"TableColumn"},{"id":"60bebad1-9b64-4104-9ad2-62410ce4382f","type":"TableColumn"}],"height":1600,"row_headers":false,"source":{"id":"3d3597e4-cb4a-4db9-aaa8-85ef786224d8","type":"ColumnDataSource"}},"id":"e3011da5-a962-498e-a8b4-c81396c4b912","type":"DataTable"},{"attributes":{},"id":"bcd39188-1594-4336-9120-96cc126b8c93","type":"StringFormatter"},{"attributes":{"editor":{"id":"87b7eca4-ae1c-4bca-8bf0-b450400689c3","type":"StringEditor"},"field":"TP","formatter":{"id":"faf0b818-e525-43f2-8920-ebaf00bf30f4","type":"StringFormatter"},"title":"TP"},"id":"664fcab1-e72f-4f9d-a826-419719460498","type":"TableColumn"},{"attributes":{},"id":"c6bedb08-60bb-49a3-b83b-add3f08bb505","type":"StringFormatter"},{"attributes":{"callback":null,"column_names":["NPV","TN","CCR","Compounds\nTested","PubChem AID","PPV","L parameter","FP","Sensitivity","Coverage","TP","index","FN","Specificity"],"data":{"CCR":[0.56,0.5,0.5,0.5,0.5,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"Compounds\nTested":[12,4,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2],"Coverage":[0.13,0.04,0.02,0.02,0.02,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.03,0.02],"FN":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"FP":[8,3,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,2],"L parameter":[1.0,0.75,0.5,0.5,0.5,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"NPV":[1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"PPV":[0.27,0.25,0.5,0.5,0.5,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"PubChem AID":[1188,1195,2062,449756,463229,522805,522806,522807,522808,522809,522810,522811,522812,522813,522814,522815,522816,977611],"Sensitivity":[1.0,1.0,1.0,1.0,1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"Specificity":[0.11,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"TN":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"TP":[3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],"index":[1188,1195,2062,449756,463229,522805,522806,522807,522808,522809,522810,522811,522812,522813,522814,522815,522816,977611]}},"id":"3d3597e4-cb4a-4db9-aaa8-85ef786224d8","type":"ColumnDataSource"},{"attributes":{},"id":"3af7064c-65f8-425c-953a-bda39586aeea","type":"StringFormatter"},{"attributes":{"editor":{"id":"4d1c7d61-532b-4508-8f9c-6f174b19eec7","type":"StringEditor"},"field":"PPV","formatter":{"id":"6c3ebe07-2e16-4744-b93d-615818cfbb5c","type":"StringFormatter"},"title":"PPV"},"id":"1b89a02d-a0b0-4004-b61c-89777e4f9902","type":"TableColumn"},{"attributes":{},"id":"907007e6-9087-4ad2-b976-f0119f1f9145","type":"StringFormatter"},{"attributes":{},"id":"21b65a44-9615-4661-b21a-85852ede0fa9","type":"StringFormatter"},{"attributes":{},"id":"faf0b818-e525-43f2-8920-ebaf00bf30f4","type":"StringFormatter"},{"attributes":{},"id":"3b8e6ace-5138-42cd-ab32-0150ab0a2083","type":"StringFormatter"},{"attributes":{},"id":"c37c0062-8668-411f-9ef1-4c84ab032f47","type":"StringFormatter"},{"attributes":{},"id":"5cf0d3ce-3f41-4e31-a771-7da03ac2f98e","type":"StringEditor"},{"attributes":{},"id":"35232e35-fbbf-4427-b349-5460dc8cd618","type":"StringEditor"},{"attributes":{},"id":"fb144a99-e82c-4744-bd98-1276df1a084b","type":"StringFormatter"},{"attributes":{},"id":"c5c88ab3-9c1c-4ca6-adb9-478699ae89ec","type":"StringEditor"},{"attributes":{"editor":{"id":"57c7f6a3-0422-4277-9a87-1e363255c241","type":"StringEditor"},"field":"NPV","formatter":{"id":"21b65a44-9615-4661-b21a-85852ede0fa9","type":"StringFormatter"},"title":"NPV"},"id":"3b8a2363-1a9f-4923-9c68-f47fa8dd5746","type":"TableColumn"},{"attributes":{"editor":{"id":"3a69d56d-e029-43aa-940f-e3ba1fe42b2c","type":"StringEditor"},"field":"Sensitivity","formatter":{"id":"3af7064c-65f8-425c-953a-bda39586aeea","type":"StringFormatter"},"title":"Sensitivity"},"id":"87b034e4-b074-4045-a132-49eb1b42f01c","type":"TableColumn"},{"attributes":{},"id":"4d1c7d61-532b-4508-8f9c-6f174b19eec7","type":"StringEditor"}],"root_ids":["e3011da5-a962-498e-a8b4-c81396c4b912"]},"title":"Bokeh Application","version":"0.12.2"}};
                  var render_items = [{"docid":"c0400697-f2ad-4fad-9720-b1ea4db47801","elementid":"fdde5906-ee95-4c68-9807-275f34768f83","modelid":"e3011da5-a962-498e-a8b4-c81396c4b912"}];
                  
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