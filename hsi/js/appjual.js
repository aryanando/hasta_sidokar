$(function() {
	var tgl1 = $("#tglawal").val();
	var tgl2 = $("#tglakhir").val();		
    $.ajax({

        url: 'http://localhost/penjualan/chart_penjualan.php',
        type: 'GET',
        success: function(data) {
            chartData = data;
            var chartProperties = {
                "caption": "GRAFIK PENJUALAN",
                "xAxisName": "Nama Barang",
                "yAxisName": "Total Jual",
                "rotatevalues": "1",
                "theme": "carbon"
            };

            apiChart = new FusionCharts({
                type: 'column3d',
                renderAt: 'chart-container',
                width: '550',
                height: '350',
                dataFormat: 'json',
                dataSource: {
                    "chart": chartProperties,
                    "data": chartData
                }
            });
            apiChart.render();
        }
    });
});