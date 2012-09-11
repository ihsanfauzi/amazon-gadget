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

	public abstract ShippingPriceDTO calculateSimple(String region, String content);

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
			return Double.valueOf(sDouble.substring(i-1).trim());
		} catch (Exception e) {
		}
		return null;
	}

}
