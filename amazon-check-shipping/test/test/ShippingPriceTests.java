package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import org.junit.Before;
import org.junit.Test;

import amazon.check.shipping.BaseShippingPriceCalculator;
import amazon.check.shipping.CheckerFactory;
import amazon.check.shipping.DeShippingPriceCalculator;
import amazon.check.shipping.FrShippingPriceCalculator;
import amazon.check.shipping.ShippingPriceCalculatorFactory;
import amazon.check.shipping.UkShippingPriceCalculator;
import amazon.check.shipping.UsShippingPriceCalculator;
import amazon.check.shipping.dto.ShippingPriceDTO;


public class ShippingPriceTests {
	@Before
	public void init(){
	}
	
	@Test
	public void testUkSimple() {
		try {
			String content = loadContent("shipping_price/co.uk/simple.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_CO_UK);

			String region = UkShippingPriceCalculator.REGION_Australia_and_Far_East_Asia;
			ShippingPriceDTO res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_BFPO;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_1;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_2;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_Europe_Zone_3;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_Japan;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_North_America;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_Rest_of_World;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_UK_Street;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UkShippingPriceCalculator.REGION_UK_PO_Box;
			res = c.calculate(region, content);
			traceSimple(region, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testUsSimple() {
		try {
			String content = loadContent("shipping_price/com/simple.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_COM);

			String region = UsShippingPriceCalculator.REGION_Alaska_and_Hawaii;
			ShippingPriceDTO res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Alaska_and_Hawaii_PO_Box;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_APO_FPO;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_APO_FPO_PO_Box;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Asia;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Canada;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Continental_US;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Continental_US_PO_Box;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Europe;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_Outside_US_Eur_CA_Asia;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = UsShippingPriceCalculator.REGION_US_Protectorates;
			res = c.calculate(region, content);
			traceSimple(region, res);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testDeSimple() {
		try {
			String content = loadContent("shipping_price/de/simple.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_DE);

			String region = DeShippingPriceCalculator.REGION_Belgien_Danemark_Frankreich_Irland_Niederlande_Grobritannien;
			ShippingPriceDTO res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Deutschland;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Finnland_Griechenland_Italien_Portugal_Spanien_Schweden;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Japan;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Osterreich;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Schweiz_Liechtenstein_Luxemburg;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Ubriges_Europa;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_USA_Kanada;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = DeShippingPriceCalculator.REGION_Weltweit;
			res = c.calculate(region, content);
			traceSimple(region, res);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Test
	public void testFrSimple() {
		try {
			String content = loadContent("shipping_price/fr/simple.html");
			BaseShippingPriceCalculator c = ShippingPriceCalculatorFactory.getCalulator(CheckerFactory.WWW_AMAZON_FR);

			String region = FrShippingPriceCalculator.REGION_Autres_pays_du_monde;
			ShippingPriceDTO res = c.calculate(region, content);
			traceSimple(region, res);

			region = FrShippingPriceCalculator.REGION_DOM_TOM;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = FrShippingPriceCalculator.REGION_Etats_Unis_et_Canada;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = FrShippingPriceCalculator.REGION_Europe_autres_pays;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = FrShippingPriceCalculator.REGION_Europe_pays_limitrophes_hors_Suisse;
			res = c.calculate(region, content);
			traceSimple(region, res);

			region = FrShippingPriceCalculator.REGION_France_metropolitaine_et_Monaco;
			res = c.calculate(region, content);
			traceSimple(region, res);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void traceSimple(String region, ShippingPriceDTO res) {
		System.out.println("perItemExpedited " + res.perItemExpedited + " - " + region);
		System.out.println("perItemStandard " + res.perItemStandard + " - " + region);
		System.out.println("perShipmentExpedited " + res.perShipmentExpedited + " - " + region);
		System.out.println("perShipmentStandard " + res.perShipmentStandard + " - " + region);
		System.out.println("perWeightExpedited " + res.perWeightExpedited + " - " + region);
		System.out.println("perWeightStandard " + res.perWeightStandard + " - " + region);
		System.out.println();
	}

	private String loadContent(String string) throws Exception {
		File f = new File(string);
		String s = "";
		String content = "";
		BufferedReader br = new BufferedReader(new FileReader(f));
		while((s = br.readLine())!=null) {
			content = content + s + "\n";
		}
		return content;
	}
}
