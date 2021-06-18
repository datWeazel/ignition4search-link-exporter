// ==UserScript==
// @name Ignition4Search Link Export
// @namespace https://ignition4.customsforge.com/ 
// @description Allows display of multiple download links.
// @include https://ignition4.customsforge.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js 
// ==/UserScript==


function DisplayBulkDownloaderLinks(){
  let bulk_boxes_header = $('#search_table #blk_dl_btn');
  let bulk_checkboxes = $('#search_table #bulk_checkbox');
  if(bulk_boxes_header.length > 0 || bulk_checkboxes.length > 0){
    var urls = $("#search_table tr:has(input:checked)").map(function() {
       	var $tr = $(this);
       	var download_url = $tr.find(".intro-step-9")[0].attributes["href"].value;
       	return download_url;
    }).toArray();

    $('#bulk_dl_links')[0].innerHTML = urls.join("\r\n");  
  	$('#bulk_dl_dialog_box')[0].hidden = false;
  }
}

function CloseBulkDlLinks(){
  $('#bulk_dl_dialog_box')[0].hidden = true;
}

function CopyLinksToClipboard(){
  $("#bulk_dl_links").select();  
  document.execCommand('copy');
}

function AddSelectBoxes(){
  let bulk_checkboxes = $('#search_table #bulk_checkbox');    
    if(bulk_checkboxes.length <= 0){
      let table_rows = $('#search_table > tbody > tr').find(".artist").each(function(index, row){
        let a = row.innerHTML;
        row.innerHTML = ' <input type="checkbox" title="Add to bulk downloader" id="bulk_checkbox" onclick=event.stopPropagation() style="margin: 5px"></input> ' + a;
			});
    }
    boxes_added = true;
}

$('body').append($('<div id="bulk_dl_dialog_box" hidden style="background: rgba(0, 0, 0, 0.85); width: 100%; height: 100%; left: 0;top: 0; overflow: hidden; position: fixed;">' +
  '<div style="text-align: center; position: absolute; left: 50%; top: 55%; width: 50%; height: 66%; transform: translate(-50%, -50%); border: 3px solid #1e8bc3; padding: 10px;">Copy your download links: <br/>' +
  '<textarea id="bulk_dl_links" style="width: 100%; height: 80%;"></textarea><br />' +
  '<div style="margin: 5px; top: 50%;"><button id="copy_bulk_dl_links" style="left: auto; right: auto; height: 35px;" class="next paginate_button page-item">Copy to Clipboard</button> <button id="close_bulk_dl_links" style="left: auto; right: auto; height: 35px;" class="next paginate_button page-item"> Close </button></div>' +
	'</div></div>'));

let main_navi = document.getElementById("nav-controls");
main_navi.innerHTML += '<button class="btn-main btn" aria-label="Add Scrape Buttons" id="add_scrape_btn"><i id="add_scrape" class="fas fa-exclamation-circle" title="Add Scrape Buttons"></i></button>';
document.getElementById ("add_scrape_btn").addEventListener (
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