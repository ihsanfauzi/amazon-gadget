package test;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

import amazon.check.shipping.dto.ShipmentBandsDTO;
import amazon.check.shipping.dto.ShippingPriceDTO;

public class ShippingPriceBaseTestCase {
	protected void traceSimple(String region, ShippingPriceDTO res) {
		System.out.println("perItemExpedited " + res.perItemExpedited + " - " + region);
		System.out.println("perItemStandard " + res.perItemStandard + " - " + region);
		System.out.println("perShipmentExpedited " + res.perShipmentExpedited + " - " + region);
		System.out.println("perShipmentStandard " + res.perShipmentStandard + " - " + region);
		System.out.println("perWeightExpedited " + res.perWeightExpedited + " - " + region);
		System.out.println("perWeightStandard " + res.perWeightStandard + " - " + region);
		System.out.println();
	}

	protected void traceComplex(String region, ShippingPriceDTO res) {
		System.out.println("========= Standard " + region + " =========");
		for (ShipmentBandsDTO dto : res.perShipmentBandsStandard) {
			System.out.println("From " + dto.from + " to " + dto.to + " - " + dto.price);
		}

		System.out.println("========= Expedited " + region + " =========");
		for (ShipmentBandsDTO dto : res.perShipmentBandsExpedited) {
			System.out.println("From " + dto.from + " to " + dto.to + " - " + dto.price);
		}

		System.out.println();
	}

	protected String loadContent(String string) throws Exception {
		File f = new File(string);
		String s = "";
		String content = "";
		BufferedReader br = new BufferedReader(new FileReader(f));
		while ((s = br.readLine()) != null) {
			content = content + s + "\n";
		}
		return content;
	}
}
