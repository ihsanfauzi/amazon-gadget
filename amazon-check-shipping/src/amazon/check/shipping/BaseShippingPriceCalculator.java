package amazon.check.shipping;

import amazon.check.shipping.dto.ShippingPriceDTO;

public abstract class BaseShippingPriceCalculator {
	public ShippingPriceDTO calculate(String region, String content) {
		if (isSimple(content)) {
			return calculateSimple(region, content);
		} else {
			return calculateComplex(region, content);
		}
	}

	public abstract ShippingPriceDTO calculateComplex(String region, String content);

	public ShippingPriceDTO calculateSimple(String region, String content) {
		ShippingPriceDTO dto = new ShippingPriceDTO();
		String regionSub = subContent(content, region);
		String perItemSub = subContent(regionSub, "<tr bgcolor=", "</tr>");
		Boolean b = extractPerItem(perItemSub, dto);
		
		if (b) {
			regionSub = subContent(regionSub, "<tr bgcolor=");
		}
			String perWeightSub = subContent(regionSub, "<tr bgcolor=", "</tr>");
			b = extractPerWeight(perWeightSub, dto);
		if (b) {
			regionSub = subContent(regionSub, "<tr bgcolor=");
		}
		String perShipmentSub = subContent(regionSub, "<tr bgcolor=", "</tr>");
		b = extractPerShipment(perShipmentSub, dto);
		return dto;
	}

	protected Boolean extractPerItem(String content, ShippingPriceDTO dto) {
		if (content == null || content.indexOf("per Item") == -1) {
			return Boolean.FALSE;
		}
		return extractPerItemInternal(content, dto);
	}

	protected Boolean extractPerItemInternal(String content, ShippingPriceDTO dto) {
		if (content == null) {
			return false;
		}
		//Skip 2 columns
		content = subContent(content, "</td>");
		content = subContent(content, "</td>");
		
		String standardPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perItemStandard = toDouble(standardPriceSub);
		
		content = subContent(content, "</td>");
		
		String expeditedPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perItemExpedited = toDouble(expeditedPriceSub);
		
		$void();
		return true;
	}

	protected Boolean extractPerWeight(String content, ShippingPriceDTO dto) {
		if (content == null || content.indexOf("per Weight") == -1) {
			return Boolean.FALSE;
		}
		return extractPerWeightInternal(content, dto);
	}

	protected Boolean extractPerWeightInternal(String content, ShippingPriceDTO dto) {
		if (content == null) {
			return false;
		}
		//Skip 2 columns
		content = subContent(content, "</td>");
		content = subContent(content, "</td>");
		
		String standardPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perWeightStandard = toDouble(standardPriceSub);
		
		content = subContent(content, "</td>");
		
		String expeditedPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perWeightExpedited = toDouble(expeditedPriceSub);
		
		$void();
		return true;
	}
	
	protected Boolean extractPerShipment(String content, ShippingPriceDTO dto) {
		if (content == null || content.indexOf("per Shipment") == -1) {
			return Boolean.FALSE;
		}
		return extractPerShipmentInternal(content, dto);
	}

	protected Boolean extractPerShipmentInternal(String content, ShippingPriceDTO dto) {
		if (content == null) {
			return false;
		}
		//Skip 2 columns
		content = subContent(content, "</td>");
		content = subContent(content, "</td>");
		
		String standardPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perShipmentStandard = toDouble(standardPriceSub);
		
		content = subContent(content, "</td>");
		
		String expeditedPriceSub = subContent(content, "align=\"right\">", "</td>");
		dto.perShipmentExpedited = toDouble(expeditedPriceSub);
		
		$void();
		return true;
	}

	public Boolean isSimple(String content) {
		return content.indexOf("hideRates()") != -1;
	}

	public static String subContent(String content, String start) {
		if (content == null) {
			return null;
		}
		int index = content.indexOf(start);
		if (index == -1) {
			return null;
		}
		return content.substring(index + start.length());
	}

	public static String subContent(String content, String start, String end) {
		String sub = subContent(content, start);
		if (sub == null) {
			return null;
		}
		int index = sub.indexOf(end);
		if (index == -1) {
			return null;
		}
		return sub.substring(0, index);
	}

	public static Double toDouble(String sDouble) {
		if (sDouble == null) {
			return null;
		}
		char ch = sDouble.charAt(0);
		int i = 1;
		while (!Character.isDigit(ch)) {
			ch = sDouble.charAt(i);
			i++;
			if (i >= sDouble.length() - 1) {
				return null;
			}
		}
		try {
			return Double.valueOf(sDouble.substring(i-1).trim().replace(',', '.'));
		} catch (Exception e) {
		}
		return null;
	}

	private void $void() {
	}
}
