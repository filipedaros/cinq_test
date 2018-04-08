using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace APM.WebApi.Helpers
{
    public class ConfigurationHelper
    {

        public static string LoadAppSetting(string key)
        {
            var setting = ConfigurationManager.AppSettings[key];
            if (string.IsNullOrEmpty(setting))
                throw new Exception(string.Format("Setting {0} not found on configuration file. Please check if application is correctly configured.", key));

            return setting;
        }

    }
}