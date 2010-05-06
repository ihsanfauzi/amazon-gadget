package amazon.check.shipping;

public abstract class BaseChecker {
	public static int SHIPPING_OK = 1;
	public static int SHIPPING_FAIL = 2;
	public static int SHIPPING_NA = 0;

	public abstract int check(String region, String content);
}
