package amazon.check.shipping;

public class FrChecker extends BaseChecker {

	@Override
	public int check(String region, String content) {
		if ("France métropolitaine et Monaco".equals(region)) {
			return SHIPPING_OK;
		}
		if ("amazon".equals(content)) {
			return SHIPPING_NA;
		}
		String match = "<strong>{region}</strong>";
		String match1 = match.replace("{region}", region);
		int end = content.indexOf("Tarifs d'expédition pour les Livres");
		if (end == -1) {
			end = content.indexOf("Tarifs d'expédition pour les Livres");
		}
		if (end != -1) {
			content = content.substring(0, end);
		}

		if (content
				.indexOf("propos de Ambroise") != -1) {
			return SHIPPING_NA;
		}
		if (content.indexOf(match1) != -1) {
			return SHIPPING_OK;
		} else {
			return SHIPPING_FAIL;
		}
	}

}
