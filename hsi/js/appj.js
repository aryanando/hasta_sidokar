// JavaScript Document
$(document).ready(function(){
		
	$("#cari").click(function(){
		cariData();
	});
	
	function cariData(){
		var tgl1 = $("#tglawal").val();
		var tgl2 = $("#tglakhir").val();
		var tg1 = tgl1.substr(6,4)+'-'+tgl1.substr(3,2)+'-'+tgl1.substr(0,2);
		var tg2 = tgl2.substr(6,4)+'-'+tgl2.substr(3,2)+'-'+tgl2.substr(0,2);
		$.ajax({
			type	: "GET",
			url		: "http://localhost:8080/sulmit/chart_penjualan.php",
			data	: "tg1="+tg1+
						"&tg2="+tg2,
			success	: function(data){
			
				            chartData = data;
            var chartProperties = {
                "caption": "GRAFIK PENJUALAN",
                "xAxisName": "Tanggal",
                "yAxisName": "Total Jual",
                "rotatevalues": "1",
                "theme": "carbon"
            };

            apiChart = new FusionCharts({
                type: 'column3d',
                renderAt: 'chart-container',
                width: '100%',
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
	}
});