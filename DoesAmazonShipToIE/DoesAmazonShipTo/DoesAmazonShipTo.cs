using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SHDocVw;
using mshtml;
using System.Runtime.InteropServices;
using Microsoft.Win32;
using System.Windows.Forms;

namespace DoesAmazonShipTo
{
        [
        ComVisible(true),
        Guid("8a194578-81ea-4850-9911-13ba2d71efb1"),
        ClassInterface(ClassInterfaceType.None)
    ]

    public class DoesAmazonShipTo:IObjectWithSite
    {
        SHDocVw.WebBrowser webBrowser;

        public static string BHOKEYNAME =
          "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Browser Helper Objects";

        [ComRegisterFunction]
        public static void RegisterBHO(Type type)
        {
            RegistryKey registryKey = Registry.LocalMachine.OpenSubKey(BHOKEYNAME, true);

            if (registryKey == null)
                registryKey = Registry.LocalMachine.CreateSubKey(BHOKEYNAME);

            string guid = type.GUID.ToString("B");
            RegistryKey ourKey = registryKey.OpenSubKey(guid, true);

            if (ourKey == null)
                ourKey = registryKey.CreateSubKey(guid);

            ourKey.SetValue("Alright", 1);
            registryKey.Close();
            ourKey.Close();
        }

        [ComUnregisterFunction]
        public static void UnregisterBHO(Type type)
        {
            RegistryKey registryKey = Registry.LocalMachine.OpenSubKey(BHOKEYNAME, true);
            string guid = type.GUID.ToString("B");

            if (registryKey != null)
                registryKey.DeleteSubKey(guid, false);
        }

        public void OnDocumentComplete(object pDisp, ref object URL)
        {
            IHTMLDocument2 doc = (IHTMLDocument2)webBrowser.Document;
            
doc.parentWindow.execScript(@"
if (""undefined"" == typeof (DoesAmazonShipToAddon)) {
	var DoesAmazonShipToAddon = {};
	
installDoesAmazonShipToAddon = function() {
	try {
		var current_document = window.document;
		var hostname = current_document.location.hostname;

		// Skip handle if current browser page is not from Amazon
		if (hostname != ""www.amazon.com"" && hostname != ""www.amazon.de""
				&& hostname != ""www.amazon.co.uk""
				&& hostname != ""www.amazon.fr"")
			return;

		// Find Amazon product page container and add our shipping button to
		// it
		var element = current_document.getElementById(""handleBuy"");
		if (!element) {
			element = current_document.getElementById(""centerCol"");
		}
		if (!element) {
			return;
		}

		var span = current_document.createElement(""SPAN"");
		span.innerHTML = '<br><br><center><div id=""ShippingByASINDiv"" style=""width:300px; height:0px;"">\n'
				+ '<object classid=""clsid:D27CDB6E-AE6D-11cf-96B8-444553540000""\n'
				+ '		id=""ShippingByASIN"" width=""100%"" height=""100%""\n'
				+ '		codebase=""http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"">\n'
				+ '		<param name=""movie"" value=""http://amazon-gadget.googlecode.com/svn/trunk/amazon-check-shipping/war/dist/ShippingByASIN.swf"" />\n'
				+ '		<param name=""quality"" value=""high"" />\n'
				+ '		<param name=""bgcolor"" value=""#ffffff"" />\n'
				+ '		<param name=""allowScriptAccess"" value=""always"" />\n'
                + '</object>\n' + '</div></center>	\n';
		element.appendChild(span);
	} catch (exc) {
//http://amazon-gadget.googlecode.com/svn/trunk/amazon-check-shipping/war/dist/ShippingByASIN.swf
//http://localhost:8080/XXXX_LOCAL/ShippingByASIN.swf
	}
};
installDoesAmazonShipToAddon();
}");
        }
 
        public int SetSite(object site)
        {
            if (site != null)
            {
                webBrowser = (SHDocVw.WebBrowser)site;
                webBrowser.DocumentComplete +=
                  new DWebBrowserEvents2_DocumentCompleteEventHandler(
                  this.OnDocumentComplete);
            }
            else
            {
                webBrowser.DocumentComplete -=
                  new DWebBrowserEvents2_DocumentCompleteEventHandler(
                  this.OnDocumentComplete);
                webBrowser = null;
            }

            return 0;
        }

        public int GetSite(ref Guid guid, out IntPtr ppvSite)
        {
            IntPtr punk = Marshal.GetIUnknownForObject(webBrowser);
            int hr = Marshal.QueryInterface(punk, ref guid, out ppvSite);
            Marshal.Release(punk);
            return hr;
        }
    }
}
