package amazon.check.shipping;

public class DeChecker extends BaseChecker {

	@Override
	public int check(String region, String content) {
		if ("Deutschland".equals(region)) {
			return SHIPPING_OK;
		}
		String match = "<strong>{region}</strong>";
		String match1 = match.replace("{region}", region);
		int end = content.indexOf("Standardversand fur die");
		if (end == -1) {
			end = content.indexOf("Standardversand für die");
		}
		if (end != -1) {
			content = content.substring(0, end);
		}

		if (content
				.indexOf("Versandkosten und Lieferzeiten für den Versand bei Amazon Marketplace") != -1) {
			return SHIPPING_NA;
		}
		if (content.indexOf(match1) != -1) {
			return SHIPPING_OK;
		} else {
			return SHIPPING_FAIL;
		}
	}
}
