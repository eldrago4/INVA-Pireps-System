function createOnChangeTrigger() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('onNewRowAdded')
    .forSpreadsheet(ss)
    .onChange()
    .create();
}

function onNewRowAdded() {
  var discordWebhookUrl = "https://discord.com/api/webhooks/1105280257134694456/GwLEfAdwngwf2g9nFcEdqgWW8_Z6EeavXBnnNWS17uqgGWsX2llcylusv3MxVI0X7RD3";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var editedRange = SpreadsheetApp.getActiveRange();
  var editedRow = editedRange.getRow();
  var editedColumn = editedRange.getColumn();
  var startRow = 2;
  var endRow = 1001;
  
  // Only trigger the webhook if the edited range is within the range A2:F1001
  if (editedRow >= startRow && editedRow <= endRow && editedColumn >= 1 && editedColumn <= 6) {
    var lastColumn = sheet.getLastColumn();
    var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
    var values = sheet.getRange(editedRow, 1, 1, lastColumn).getValues()[0];

    var embed = {
      "embeds": [{
        "title": "New PiRep recorded!",
        "color": 15258703,
        "fields": []
      }]
    };

    for (var i = 0; i < headers.length; i++) {
      if (values[i]) {
        var field = {
          "name": headers[i] + ":",
          "value": values[i]
        };
        embed.embeds[0].fields.push(field);
      }
    }

    var options = {
      "method": "POST",
      "contentType": "application/json",
      "payload": JSON.stringify(embed)
    };

    UrlFetchApp.fetch(discordWebhookUrl, options);
  }
}
