import {
  ComponentType,
  createElement,
  PropsWithChildren,
  ProviderProps,
  ReactElement
} from 'react';

type ProviderComponentType<T = any> =
  | ComponentType<React.PropsWithChildren<T>>
  | [ComponentType<React.PropsWithChildren<T>>, T];

/**
 * Funtion to handle multiple initiate Providers.
 * Directly inject your provider or with array to add provider props.
 * @example combineProviders([Provider1, Provider2])
 * @example combineProviders([Provider1, [Provider2, provider2Props]])
 * @param providers
 * @returns
 */
const combineProviders = (providers: ProviderComponentType[]) => {
  return ({ children }: PropsWithChildren<{ value?: any[] }>) => {
    // Reverse Provider array before reduce to execute latest or deepest provider first
    return providers.reduceRight<ReactElement<ProviderProps<any>>>(
      (
        /**
         * Children of Current Provider (array index after current provider)
         */
        childrenOfCurrentProvider,
        /**
         * Current provider of array providers
         */
        currentProvider
      ) => {
        // check if provider is array and need props
        if (Array.isArray(currentProvider)) {
          const [ProviderComponent, providerProps] = currentProvider;
          // create new element with props
          return createElement(
            ProviderComponent,
            providerProps,
            childrenOfCurrentProvider
          );
        }
        return createElement(currentProvider, {}, childrenOfCurrentProvider);
      },
      // set children of combination provider as initial value (children of deepest provider)
      children as ReactElement
    );
  };
};

export default combineProviders;
