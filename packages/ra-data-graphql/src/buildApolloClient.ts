import { ApolloClient, ApolloClientOptions } from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';

//ApolloClient expects a cache shape for the apollo client options.
// SEE "NormalizedCacheObject in apollo-client-preset"
interface ICacheShape {
    todo: any;
}

interface CustomApolloClientOptions<any> extends ApolloClientOptions {
    uri: string;
    link: string;
}

export default (options: ApolloClientOptions<ICacheShape>): ApolloClient<ICacheShape> => {
    if (!options) {
        return new ApolloClient<ICacheShape>();
    }

    const { cache, link, uri, ...otherOptions } = options;
    let finalLink = link;
    let finalCache = cache;

    if (!link && uri) {
        finalLink = new HttpLink({ uri });
    }

    if (!cache) {
        finalCache = new InMemoryCache().restore({});
    }

    return new ApolloClient({
        link: finalLink,
        cache: finalCache,
        ...otherOptions,
    });
};
