package amazon.check.shipping;

public class UsChecker extends BaseChecker {

	@Override
	public int check(String region, String content) {
		if ("Continental US".equals(region)) {
			return SHIPPING_OK;
		}
		if ("amazon".equals(content)) {
			return SHIPPING_NA;
		}
		String match = "<strong>{region}</strong>";
		String match1 = match.replace("{region}", region);
		String match2 = match.replace("{region}", region + " Street");
		int end = content.indexOf("Shipping Rates for Books, Music, Video");
		if (end == -1) {
			end = content.indexOf("Shipping Rates for Books, Music, Video");
		}
		if (end != -1) {
			content = content.substring(0, end);
		}

		//if (content.indexOf("Amazon Marketplace Shipping for Buyers") != -1) {
		if (content.indexOf("Marketplace Shipping Times") != -1) {
			return SHIPPING_NA;
		}
		if (content.indexOf(match1) != -1 || content.indexOf(match2) != -1) {
			return SHIPPING_OK;
		} else {
			return SHIPPING_FAIL;
		}
	}

}
