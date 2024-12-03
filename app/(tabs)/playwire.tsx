import React, { useEffect, useState, useMemo } from 'react';
import { Text, View, Platform, Button, FlatList } from 'react-native';
import {Playwire, PlaywireBannerView} from '@intergi/react-native-playwire-sdk';

export default function PlaywireScreen() {

    const interstitialAdUnitId = 'interstitial_2';
    const bannerAdUnitId = 'banner-320x50';

    const [bannerIsLoaded, setBannerIsLoaded] = useState(false);
    const [bannerIsPresented, setBannerIsPresented] = useState(false);
      // Maintain a single ad instance
    const [adComponent, setAdComponent] = useState<React.ReactNode | null>(null);


    enum PlaywireStatus {
        NONE = "none",
        INITIALIZING = "initializing",
        INITIALIZED = "initialized",
      }
    const [playwireStatus, setPlaywireStatus] = useState<PlaywireStatus>(PlaywireStatus.NONE as const);


    enum InterstitialStatus {
        NONE = "none",
        LOADING = "loading",
        LOADED = "loaded",
        FAILED = "failed",
      }
      const [interstitialStatus, setInterstitialStatus] = useState<InterstitialStatus>(InterstitialStatus.NONE as const);

      useEffect(() => {
        if (playwireStatus !== PlaywireStatus.NONE) return;
    
        setPlaywireStatus(PlaywireStatus.INITIALIZING);
        const publisherId = '1024407';
        const appId = Platform.OS === 'ios' ? '25' : '26';
    
        Playwire.startConsoleLogger();
        Playwire.setTest(true);
    
        // Initialize PlaywireSDK
        Playwire.initializeSDK(publisherId, appId, () => {
          setPlaywireStatus(PlaywireStatus.INITIALIZED);
    
          console.log("Current Playwire Status: !!!!!!!!!!!!!!!!!!", playwireStatus); 

          setAdComponent(<PlaywireBannerView adUnitId={bannerAdUnitId} />);
    
          // Set up event listeners
          const onInterstitialLoaded = () => setInterstitialStatus(InterstitialStatus.LOADED);
          const onInterstitialFailedToLoad = () => setInterstitialStatus(InterstitialStatus.FAILED);
          const onInterstitialClosed = () => setInterstitialStatus(InterstitialStatus.NONE);
    
          Playwire.addInterstitialLoadedEventListener(onInterstitialLoaded);
          Playwire.addInterstitialFailedToLoadEventListener(onInterstitialFailedToLoad);
          Playwire.addInterstitialClosedEventListener(onInterstitialClosed);
    
        });
      }, [playwireStatus]);
    
    const loadInterstitial = () => {
        setInterstitialStatus(InterstitialStatus.LOADING)
        Playwire.loadInterstitial(interstitialAdUnitId);      
    }
    const showInterstitial = () => {
        Playwire.getInterstitialReady(interstitialAdUnitId, isReady => {
            if (isReady) {
              Playwire.showInterstitial(interstitialAdUnitId);
            } else {
                setInterstitialStatus(InterstitialStatus.NONE)
            }
        });      
    }

    const renderPlaywire = () => {
        return (
            <View>
                <Text>Playwire Status:</Text>
                {renderPlaywireStatus()}
            </View>
        )
    }

    const renderPlaywireStatus = () => {
        switch (playwireStatus) {
            case PlaywireStatus.NONE:
                return <Text>EMPTY</Text>;
            case PlaywireStatus.INITIALIZING:
                return <Text>INITIALIZING</Text>;
            case PlaywireStatus.INITIALIZED:
                return <Text>INITIALIZED</Text>;
            default:
                return null;
          }
      };

    const renderInterstitialStatus = () => {
        switch (interstitialStatus) {
          case InterstitialStatus.NONE:
            return <Text>EMPTY</Text>;
          case InterstitialStatus.LOADING:
            return <Text>LOADING</Text>;
            case InterstitialStatus.LOADED:
                return <Text>READY</Text>;
            case InterstitialStatus.FAILED:
                return <Text>FAILED</Text>;
            default:
            return null;
        }
    };

    const renderInterstitial = () => {
        return (
            <View>
                {playwireStatus === PlaywireStatus.INITIALIZED && (
                    <View>
                        <View>
                            <Text>Interstitial Status:</Text>
                            {renderInterstitialStatus()}
                        </View>
                        {interstitialStatus === InterstitialStatus.NONE && (
                            <Button title="Load" onPress={loadInterstitial} />
                        )}  
                        {interstitialStatus === InterstitialStatus.LOADED && (
                            <Button title="Show" onPress={showInterstitial} />
                        )}  
                    </View>
                )}
            </View>
        )
    }
  
    // const renderBannerStatus = () => {
    //     if (playwireInitialized) {
    //       let bannedAdUnit = 'banner-320x50';
    //       return (
    //         <PlaywireBannerView
    //           adUnitId={bannedAdUnit}
    //           onAdLoaded={_ => {
    //             setBannerIsLoaded(true);
    //           }}
    //         />
    //       );
    //     } else {
    //       return <View />;
    //     }
    //   }

    interface Listing {
        id: string; // Unique identifier for the listing
        price: string; // Price of the listing
        address: string; // Address of the listing
      }

    interface Ad {
        id: string; // Unique identifier for the ad
    }
            

    const data: (Listing | Ad)[] = [

        { id: 'listing-id-1', price: '', address: '' },
        { id: 'listing-id-2', price: '', address: '' },
        { id: 'listing-id-3', price: '', address: '' },
        { id: 'listing-id-4', price: '', address: '' },
        { id: 'listing-id-5', price: '', address: '' },
        { id: 'listing-id-6', price: '', address: '' },
        { id: 'listing-id-7', price: '', address: '' },
        { id: 'listing-id-8', price: '', address: '' },
        { id: 'listing-id-9', price: '', address: '' },
        { id: 'listing-id-10', price: '', address: '' },
        { id: 'listing-id-11', price: '', address: '' },
        { id: 'listing-id-12', price: '', address: '' },
        { id: 'listing-id-13', price: '', address: '' },
        { id: 'listing-id-14', price: '', address: '' },
        { id: 'listing-id-15', price: '', address: '' },
        { id: 'listing-id-16', price: '', address: '' },
        { id: 'listing-id-17', price: '', address: '' },
        { id: 'listing-id-18', price: '', address: '' },
        { id: 'listing-id-19', price: '', address: '' },
        { id: 'listing-id-20', price: '', address: '' },
        { id: 'listing-id-21', price: '', address: '' },
        { id: 'listing-id-22', price: '', address: '' },
        
        { id: 'ad-1' },
        
        { id: 'listing-id-23', price: '', address: '' },
        { id: 'listing-id-24', price: '', address: '' },
        { id: 'listing-id-25', price: '', address: '' },
        { id: 'listing-id-26', price: '', address: '' },
      
      
        { id: 'ad-2' },

        { id: 'listing-id-27', price: '', address: '' },
        { id: 'listing-id-28', price: '', address: '' },
        { id: 'listing-id-29', price: '', address: '' },
        { id: 'listing-id-30', price: '', address: '' },
        { id: 'listing-id-31', price: '', address: '' },
        { id: 'listing-id-32', price: '', address: '' }
    ];

    // Component to render a listing
    const ListingComponent: React.FC<{ listing: Listing }> = ({ listing }) => {
        return (
            <View>
                <Text>{listing.id}</Text>
                <Text>{listing.address}</Text>
                <Text>{listing.price}</Text>
            </View>
        );
    };
    
  
    const renderItem = ({ item }: { item: Listing | Ad }) => {
        if ('price' in item && 'address' in item) {
          return <ListingComponent listing={item as Listing} />;
        } else {
          return (
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                {adComponent}            
            </View>
          );
        }
    };

    const keyExtractor = (item: Listing | Ad) => item.id;
      
    const renderList = () => {
        return (
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        );
      };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {renderPlaywire()}      
            {renderInterstitial()}  
            {renderList()}      
        </View>
    )
}

  