// ==UserScript==
// @name Ignition4Search Link Display
// @namespace https://ignition4.customsforge.com/ 
// @description Displays download links for multiple files.
// @include https://ignition4.customsforge.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js 
// ==/UserScript==

function SelectAllSongs(){  
  let bulk_checkboxes = $('#search_table #bulk_checkbox').attr('checked','checked');  
}

function DisplayBulkDownloaderLinks(){
  let bulk_checkboxes = $('#search_table #bulk_checkbox');
  if(bulk_checkboxes.length > 0){    
  	$('#bulk_dl_dialog_box')[0].hidden = false;
  	$('#bulk_dl_link_box')[0].hidden = true;
    $('#bulk_dl_loader')[0].hidden = false;
    var urls = $("#search_table tr:has(input:checked)").map(function() {
       	var $tr = $(this);
       	var request_url = $tr.find(".intro-step-9")[0].attributes["href"].value;
  			var download_link = "";
      
      	  $.ajax({
          //The URL to process the request
            'url' : request_url, 'type' : 'GET', async: false,/*'data' : {'paramater1' : 'value','parameter2' : 'another value'},*/
            'success' : function(data) {
              //console.log(data);
              if (data !== "") {
                //console.log(data.downloadLink);
                download_link = data.downloadLink;
              }
            }
          });   
      	return download_link;
    }).toArray();

    console.log(urls);
    
    $('#bulk_dl_links')[0].innerHTML = urls.join("\r\n");  
    $('#bulk_dl_loader')[0].hidden = true;
  	$('#bulk_dl_link_box')[0].hidden = false;
  }
}

function CloseBulkDlLinks(){
  $('#bulk_dl_dialog_box')[0].hidden = true;
}

function CopyLinksToClipboard(){
  $("#bulk_dl_links").select();
  //$("#bulk_dl_links").focus();
  
  document.execCommand('copy');
  //document.getSelection().removeAllRanges();
}

function AddSelectBoxes(){
  let bulk_checkboxes = $('#search_table #bulk_checkbox');    
    if(bulk_checkboxes.length <= 0){
      //let table_rows = $('#search_table > tbody > tr').find(".cdlc_btns").each(function(index, row){
      let table_rows = $('#search_table > tbody > tr').find(".artist").each(function(index, row){
        let a = row.innerHTML;
        row.innerHTML = ' <input type="checkbox" title="Add to bulk downloader" id="bulk_checkbox" onclick=event.stopPropagation() style="margin: 5px"></input> ' + a;
			});
    }
    boxes_added = true;
}

$('body').append($('<div id="bulk_dl_dialog_box" hidden style="background: rgba(0, 0, 0, 0.85); width: 100%; height: 100%; left: 0;top: 0; overflow: hidden; position: fixed; z-index: 3;">' +
  '<div id="bulk_dl_loader" style="text-align: center; position: absolute; left: 50%; top: 55%; width: 50%; height: 66%; transform: translate(-50%, -50%); border: 3px solid #1e8bc3; padding: 10px;">Fetching links ...</div>' +
  '<div id="bulk_dl_link_box" style="text-align: center; position: absolute; left: 50%; top: 55%; width: 50%; height: 66%; transform: translate(-50%, -50%); border: 3px solid #1e8bc3; padding: 10px;">Copy your download links: <br/>' +
  '<textarea id="bulk_dl_links" style="width: 100%; height: 80%;"></textarea><br />' +
  '<div style="margin: 5px; top: 50%;">' +
  '<button id="copy_bulk_dl_links" style="left: auto; right: auto; height: 35px;" class="next paginate_button page-item">Copy to Clipboard</button>' +
  '<button id="close_bulk_dl_links" style="left: auto; right: auto; height: 35px;" class="next paginate_button page-item"> Close </button>' +
  '</div></div></div>'));

let main_navi = document.getElementById("nav-controls");
main_navi.innerHTML += '<button class="btn-main btn" id="select_all_btn" style="font-weight: 700;"><i id="add_scrape" class="fas fa-list-alt" title="Select all songs"></i> SELECT ALL</button> ';
main_navi.innerHTML += '<button class="btn-main btn" id="show_links_btn" style="font-weight: 700;"><i id="add_scrape" class="fas fa-list-alt" title="Display all links"></i> DISPLAY LINKS</button>';

document.getElementById ("select_all_btn").addEventListener (
    "click", SelectAllSongs, false
);

document.getElementById ("show_links_btn").addEventListener (
    "click", DisplayBulkDownloaderLinks, false
);

document.getElementById ("close_bulk_dl_links").addEventListener (
    "click", CloseBulkDlLinks, false
);

document.getElementById ("copy_bulk_dl_links").addEventListener (
    "click", CopyLinksToClipboard, false
);

var intervalId = window.setInterval(function(){
  AddSelectBoxes();
}, 100);
