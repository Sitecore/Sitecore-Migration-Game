export const AzureProxyService = () => {
  /**
   * Get row in Azure Table Storage by json payload
   * @param json
   * @returns
   */
  const getByJsonProxy = async (jsonString: string) => {
    const getEntityResult = await fetch(`/api/azure/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });

    if (getEntityResult.ok) {
      let entityResponse = await getEntityResult.json();

      return entityResponse;
    }
  };

  const createEntityProxy = async (jsonString: string) => {
    const createEntityResult = await fetch('/api/azure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonString,
    });

    if (createEntityResult.ok) {
      let entityResponse = await createEntityResult.json();

      return entityResponse;
    }
  };

  return {
    getByJsonProxy,
    createEntityProxy,
  };
};
