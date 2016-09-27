
(function(global) {
  function now() {
    return new Date();
  }

  if (typeof (window._bokeh_onload_callbacks) === "undefined") {
    window._bokeh_onload_callbacks = [];
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
  };var element = document.getElementById("1f99a07f-37f6-438e-999a-7a95f8566787");
  if (element == null) {
    console.log("Bokeh: ERROR: autoload.js configured with elementid '1f99a07f-37f6-438e-999a-7a95f8566787' but no matching script tag was found. ")
    return false;
  }

  var js_urls = ['https://cdn.pydata.org/bokeh/release/bokeh-0.11.1.min.js', 'https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.11.1.min.js', 'https://cdn.pydata.org/bokeh/release/bokeh-compiler-0.11.1.min.js'];

  var inline_js = [
    function(Bokeh) {
      Bokeh.set_log_level("info");
    },
    
    function(Bokeh) {
      Bokeh.$(function() {
          var docs_json = {"0aa73071-458b-42a9-b056-3413f0546ad1":{"roots":{"references":[{"attributes":{},"id":"11d93c1d-7e76-454a-b910-5ccc8d662fa3","type":"StringEditor"},{"attributes":{"columns":[{"id":"90cb86cc-a80a-4ae4-92b3-5179ac0ed00b","type":"TableColumn"},{"id":"52b7a00a-866a-48e1-98d1-96c781c73434","type":"TableColumn"},{"id":"ff69b55c-3e54-43c5-86d5-ccafcc2a103d","type":"TableColumn"},{"id":"08057eff-8146-439f-8ef4-e37ba6eb1ef9","type":"TableColumn"},{"id":"1c745f8d-8d7e-4bae-b307-380808ecea8a","type":"TableColumn"},{"id":"f289d68f-6d5d-428d-bea0-e865d2e77a4b","type":"TableColumn"},{"id":"4835241b-a3b9-4aff-839b-a57c9c4a1174","type":"TableColumn"},{"id":"afa9edcd-d3c9-49f9-afe7-d4c9d9ecf8d1","type":"TableColumn"},{"id":"a7ebf842-06ae-4a3b-835f-b2bea4cdc9a5","type":"TableColumn"},{"id":"8d6ccea8-40f0-4305-8171-2a07f9b50630","type":"TableColumn"},{"id":"7f87a5e5-919e-4792-bc81-56d0010ca732","type":"TableColumn"},{"id":"63a43091-d909-4de4-912f-23b61dd99a23","type":"TableColumn"}],"height":1600,"row_headers":false,"source":{"id":"1543ea8c-8a8e-436a-b679-7313b3798b2f","type":"ColumnDataSource"},"width":1200},"id":"3f67f026-98bd-4693-8889-dafe02b87345","type":"DataTable"},{"attributes":{"editor":{"id":"b2e2b9fc-a006-4261-86be-e9c2e240c407","type":"StringEditor"},"field":"FP","formatter":{"id":"2a74570c-9791-4b72-9898-2a871e1d71b1","type":"StringFormatter"},"title":"FP"},"id":"08057eff-8146-439f-8ef4-e37ba6eb1ef9","type":"TableColumn"},{"attributes":{"editor":{"id":"11d93c1d-7e76-454a-b910-5ccc8d662fa3","type":"StringEditor"},"field":"NPV","formatter":{"id":"146b288c-2624-4dde-83c7-e2789080c379","type":"StringFormatter"},"title":"NPV"},"id":"8d6ccea8-40f0-4305-8171-2a07f9b50630","type":"TableColumn"},{"attributes":{},"id":"8e08a53c-ee35-4944-ac99-b6d024002c12","type":"StringFormatter"},{"attributes":{},"id":"b2e2b9fc-a006-4261-86be-e9c2e240c407","type":"StringEditor"},{"attributes":{"callback":null,"column_names":["TP","NPV","Sensitivity","CCR","PPV","index","PubChem AID","Specificity","FN","Coverage","L parameter","FP","TN"],"data":{"CCR":[0.61,0.61,0.63,0.44,0.34,0.72,0.41,0.53,0.67,0.6,0.58,0.76,0.59,0.62,0.62,0.78,0.81,0.59,0.73,0.75,0.79,0.59,0.69,0.62,0.71,0.74,1.0,1.0,0.91,0.66,0.64,0.58,0.64,0.61,0.68,0.7,0.62,0.6,0.66,0.61,0.62,0.73,0.66,0.64,0.62,0.6],"Coverage":[0.4,0.4,0.4,0.18,0.14,0.1,0.15,0.14,0.54,0.81,0.79,0.23,0.82,0.72,0.72,0.61,0.64,0.77,0.68,0.73,0.71,0.77,0.51,0.76,0.66,0.73,0.82,0.82,0.7,0.75,0.73,0.75,0.69,0.67,0.63,0.45,0.76,0.76,0.73,0.67,0.69,0.64,0.73,0.69,0.73,0.7],"FN":[42,44,41,13,13,4,13,8,40,97,100,3,105,73,80,9,22,93,43,37,25,96,35,87,56,50,0,0,10,76,77,93,62,82,49,23,88,93,73,79,77,33,78,78,84,92],"FP":[14,10,10,30,26,5,26,20,10,15,12,25,13,11,6,49,30,8,28,37,37,8,7,10,14,19,1,1,18,11,10,21,28,8,7,16,9,10,10,5,6,30,9,4,4,6],"L parameter":[2.41,2.98,3.43,0.77,0.48,1.72,0.68,1.08,6.03,3.59,3.52,2.25,3.64,4.99,7.49,2.52,4.22,5.22,3.76,3.5,3.89,5.07,8.26,5.32,5.73,5.55,102.0,102.0,8.76,6.27,5.83,2.36,2.73,5.24,9.11,4.41,5.66,4.46,6.51,7.39,7.27,3.72,6.91,11.05,10.06,6.0],"NPV":[0.68,0.68,0.7,0.61,0.54,0.64,0.55,0.72,0.79,0.67,0.66,0.93,0.66,0.72,0.7,0.91,0.86,0.68,0.77,0.81,0.86,0.67,0.81,0.69,0.73,0.78,1.0,1.0,0.94,0.71,0.7,0.65,0.72,0.67,0.79,0.85,0.69,0.67,0.72,0.69,0.7,0.83,0.7,0.7,0.7,0.65],"PPV":[0.61,0.67,0.7,0.29,0.19,0.83,0.28,0.33,0.74,0.71,0.7,0.56,0.72,0.74,0.83,0.7,0.74,0.77,0.71,0.69,0.69,0.78,0.79,0.78,0.81,0.78,0.99,0.99,0.86,0.81,0.79,0.62,0.62,0.79,0.82,0.61,0.79,0.75,0.81,0.84,0.83,0.64,0.83,0.89,0.88,0.82],"PubChem AID":[155,167,175,1189,1199,1204,1205,1208,651631,651633,651634,651741,720516,720552,720634,720635,720637,720693,743012,743014,743015,743033,743035,743042,743064,743065,743075,743077,743079,743083,743084,743085,743122,743194,743199,743202,743203,743209,743211,743213,743218,743219,743224,743225,743228,1159517],"Sensitivity":[0.34,0.31,0.36,0.48,0.32,0.86,0.43,0.56,0.41,0.27,0.22,0.91,0.24,0.3,0.27,0.93,0.79,0.23,0.62,0.69,0.77,0.23,0.43,0.29,0.51,0.57,1.0,1.0,0.91,0.38,0.33,0.27,0.43,0.27,0.39,0.52,0.28,0.24,0.37,0.25,0.27,0.62,0.37,0.3,0.26,0.23],"Specificity":[0.87,0.9,0.9,0.4,0.37,0.58,0.38,0.51,0.94,0.93,0.94,0.61,0.94,0.95,0.97,0.64,0.82,0.96,0.84,0.81,0.81,0.96,0.95,0.95,0.92,0.9,1.0,1.0,0.9,0.94,0.95,0.89,0.85,0.95,0.96,0.89,0.96,0.95,0.95,0.97,0.97,0.84,0.95,0.98,0.98,0.97],"TN":[91,95,95,20,15,7,16,21,151,197,197,39,200,190,191,87,135,201,148,157,155,194,148,190,155,176,203,203,164,186,184,173,158,164,181,128,194,191,186,174,180,157,180,178,192,174],"TP":[22,20,23,12,6,25,10,10,28,36,28,32,33,31,29,114,84,27,70,81,84,28,26,36,58,66,147,147,107,47,38,34,46,31,31,25,34,30,42,26,29,53,45,34,29,28],"index":[155,167,175,1189,1199,1204,1205,1208,651631,651633,651634,651741,720516,720552,720634,720635,720637,720693,743012,743014,743015,743033,743035,743042,743064,743065,743075,743077,743079,743083,743084,743085,743122,743194,743199,743202,743203,743209,743211,743213,743218,743219,743224,743225,743228,1159517]}},"id":"1543ea8c-8a8e-436a-b679-7313b3798b2f","type":"ColumnDataSource"},{"attributes":{"editor":{"id":"9354b5c3-5a65-45a1-8503-f46192a3d728","type":"StringEditor"},"field":"PPV","formatter":{"id":"e98fd5d4-3fcd-4a59-9caa-f36373d7a293","type":"StringFormatter"},"title":"PPV"},"id":"a7ebf842-06ae-4a3b-835f-b2bea4cdc9a5","type":"TableColumn"},{"attributes":{},"id":"aa0a7ad6-991b-489c-851d-5f960d8ae1a7","type":"StringFormatter"},{"attributes":{"children":[{"id":"3f67f026-98bd-4693-8889-dafe02b87345","type":"DataTable"}]},"id":"d79eaf59-0b9c-4839-b775-6c89620cfc5a","type":"VBoxForm"},{"attributes":{},"id":"920b9ef3-4f3d-4780-adbb-147ece9b37a0","type":"StringFormatter"},{"attributes":{},"id":"1388008e-9a75-4c69-817c-dc3b0f3cd5d1","type":"StringFormatter"},{"attributes":{"editor":{"id":"1e4a17ef-9384-4481-9241-2d40196089bb","type":"StringEditor"},"field":"Specificity","formatter":{"id":"1388008e-9a75-4c69-817c-dc3b0f3cd5d1","type":"StringFormatter"},"title":"Specificity"},"id":"4835241b-a3b9-4aff-839b-a57c9c4a1174","type":"TableColumn"},{"attributes":{"editor":{"id":"6571951c-fa07-4aba-9175-d630a87e4f7f","type":"StringEditor"},"field":"CCR","formatter":{"id":"5c62698d-bd38-46df-9d7a-05b0acc2cd36","type":"StringFormatter"},"title":"CCR"},"id":"afa9edcd-d3c9-49f9-afe7-d4c9d9ecf8d1","type":"TableColumn"},{"attributes":{"editor":{"id":"b3347202-6c66-4c83-a1d2-91b934115fdf","type":"StringEditor"},"field":"L parameter","formatter":{"id":"920b9ef3-4f3d-4780-adbb-147ece9b37a0","type":"StringFormatter"},"title":"L parameter"},"id":"7f87a5e5-919e-4792-bc81-56d0010ca732","type":"TableColumn"},{"attributes":{},"id":"e7f6b299-2dfc-4a1d-87e0-fd4b9c734904","type":"StringEditor"},{"attributes":{},"id":"718f1350-805f-4005-b8d3-b7ff868cbf7d","type":"StringFormatter"},{"attributes":{},"id":"dc68d2ac-ae9d-4da8-a81e-7cca8f65efcc","type":"StringEditor"},{"attributes":{},"id":"dff6c46a-ecb3-4058-89c7-ecc15840a2eb","type":"StringFormatter"},{"attributes":{},"id":"6571951c-fa07-4aba-9175-d630a87e4f7f","type":"StringEditor"},{"attributes":{"editor":{"id":"dc68d2ac-ae9d-4da8-a81e-7cca8f65efcc","type":"StringEditor"},"field":"TP","formatter":{"id":"445cbbe2-1097-464e-8f7e-ba7652a4e9ca","type":"StringFormatter"},"title":"TP"},"id":"52b7a00a-866a-48e1-98d1-96c781c73434","type":"TableColumn"},{"attributes":{},"id":"2a74570c-9791-4b72-9898-2a871e1d71b1","type":"StringFormatter"},{"attributes":{},"id":"445cbbe2-1097-464e-8f7e-ba7652a4e9ca","type":"StringFormatter"},{"attributes":{},"id":"f9a6251c-8a19-4d40-a14e-eeef7875efd7","type":"StringEditor"},{"attributes":{},"id":"1e4a17ef-9384-4481-9241-2d40196089bb","type":"StringEditor"},{"attributes":{},"id":"7a01e858-d81e-4b52-984a-2c6ca60717ae","type":"StringEditor"},{"attributes":{},"id":"34a72e17-9b3b-4953-999f-5d0d2f0625e9","type":"StringEditor"},{"attributes":{},"id":"146b288c-2624-4dde-83c7-e2789080c379","type":"StringFormatter"},{"attributes":{"editor":{"id":"34a72e17-9b3b-4953-999f-5d0d2f0625e9","type":"StringEditor"},"field":"TN","formatter":{"id":"198fdffd-ab6b-4dad-a940-01e1e5f649ff","type":"StringFormatter"},"title":"TN"},"id":"ff69b55c-3e54-43c5-86d5-ccafcc2a103d","type":"TableColumn"},{"attributes":{},"id":"198fdffd-ab6b-4dad-a940-01e1e5f649ff","type":"StringFormatter"},{"attributes":{},"id":"e98fd5d4-3fcd-4a59-9caa-f36373d7a293","type":"StringFormatter"},{"attributes":{},"id":"b3347202-6c66-4c83-a1d2-91b934115fdf","type":"StringEditor"},{"attributes":{},"id":"9354b5c3-5a65-45a1-8503-f46192a3d728","type":"StringEditor"},{"attributes":{"editor":{"id":"f9a6251c-8a19-4d40-a14e-eeef7875efd7","type":"StringEditor"},"field":"FN","formatter":{"id":"718f1350-805f-4005-b8d3-b7ff868cbf7d","type":"StringFormatter"},"title":"FN"},"id":"1c745f8d-8d7e-4bae-b307-380808ecea8a","type":"TableColumn"},{"attributes":{},"id":"5c62698d-bd38-46df-9d7a-05b0acc2cd36","type":"StringFormatter"},{"attributes":{"editor":{"id":"7a01e858-d81e-4b52-984a-2c6ca60717ae","type":"StringEditor"},"field":"Coverage","formatter":{"id":"8e08a53c-ee35-4944-ac99-b6d024002c12","type":"StringFormatter"},"title":"Coverage"},"id":"63a43091-d909-4de4-912f-23b61dd99a23","type":"TableColumn"},{"attributes":{"editor":{"id":"d96191ca-260d-4e89-9d39-75888b2d1890","type":"StringEditor"},"field":"Sensitivity","formatter":{"id":"aa0a7ad6-991b-489c-851d-5f960d8ae1a7","type":"StringFormatter"},"title":"Sensitivity"},"id":"f289d68f-6d5d-428d-bea0-e865d2e77a4b","type":"TableColumn"},{"attributes":{"editor":{"id":"e7f6b299-2dfc-4a1d-87e0-fd4b9c734904","type":"StringEditor"},"field":"PubChem AID","formatter":{"id":"dff6c46a-ecb3-4058-89c7-ecc15840a2eb","type":"StringFormatter"},"title":"PubChem AID"},"id":"90cb86cc-a80a-4ae4-92b3-5179ac0ed00b","type":"TableColumn"},{"attributes":{},"id":"d96191ca-260d-4e89-9d39-75888b2d1890","type":"StringEditor"}],"root_ids":["d79eaf59-0b9c-4839-b775-6c89620cfc5a"]},"title":"Bokeh Application","version":"0.11.1"}};
          var render_items = [{"docid":"0aa73071-458b-42a9-b056-3413f0546ad1","elementid":"1f99a07f-37f6-438e-999a-7a95f8566787","modelid":"d79eaf59-0b9c-4839-b775-6c89620cfc5a"}];
          
          Bokeh.embed.embed_items(docs_json, render_items);
      });
    },
    function(Bokeh) {
      console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-0.11.1.min.css");
      Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-0.11.1.min.css");
      console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.11.1.min.css");
      Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.11.1.min.css");
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