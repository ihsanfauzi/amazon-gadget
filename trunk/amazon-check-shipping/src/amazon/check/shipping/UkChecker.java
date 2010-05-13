package amazon.check.shipping;

public class UkChecker extends BaseChecker {

	@Override
	public int check(String region, String content) {
		if ("UK Mainland".equals(region)) {
			return SHIPPING_OK;
		}
		String match = "<strong>{region}</strong>";
		String match1 = match.replace("{region}", region);
		int end = content.indexOf("Delivery Rates for Books, Music, Video");
		if (end == -1) {
			end = content.indexOf("Delivery Rates for Books, Music, Video");
		}
		if (end != -1) {
			content = content.substring(0, end);
		}

		if (content
				.indexOf("Marketplace items can only be delivered to") != -1) {
			return SHIPPING_NA;
		}
		if (content.indexOf(match1) != -1) {
			return SHIPPING_OK;
		} else {
			return SHIPPING_FAIL;
		}
	}

}
