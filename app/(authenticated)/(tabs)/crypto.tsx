import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
// import { Currency } from "@/interfaces/crypto";
import { Link } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Currency } from "@/interfaces/crypto";

const Page = () => {
  const headerHeight = useHeaderHeight();

  // Cara 1
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["listings"],
  //   queryFn: () => fetch("/api/listings").then((res) => res.json()),
  // });

  // console.log(data, "   INI DATANYA PADA HALAMAN CRYPTO");

  // if (isLoading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error.message}</Text>;

  // Cara 2
  // const currencies = useQuery({
  //   queryKey: ["listings"],
  //   queryFn: () => fetch("/api/listings").then((res) => res.json()),
  // });

  // const ids = currencies.data
  //   ?.map((currency: Currency) => currency.id)
  //   .join(",");

  // const { data } = useQuery({
  //   queryKey: ["info", ids],
  //   queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
  //   enabled: !!ids,
  // });
  const {
    data: currencyList,
    isLoading: isCurrenciesLoading,
    isError: isCurrenciesError,
    error: currenciesError,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetch("/api/listings").then((res) => res.json()),
  });

  const ids = currencyList?.map((currency: Currency) => currency.id).join(",");

  const {
    data,
    isLoading: isInfoLoading,
    isError: isInfoError,
    error: infoError,
  } = useQuery({
    queryKey: ["info", ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then((res) => res.json()),
    enabled: !!ids,
  });

  return (
    // <ScrollView style={{ paddingTop: headerHeight }}>
    //   {/* {data?.data.map((item: any) => (
    //     <View
    //       key={item.id}
    //       style={{
    //         backgroundColor: "#fff",
    //         padding: 12,
    //         margin: 8,
    //         borderRadius: 10,
    //       }}
    //     >
    //       <Text style={{ fontSize: 16, fontWeight: "bold" }}>
    //         {item.name} ({item.symbol})
    //       </Text>
    //       <Text>Price: €{item.quote.EUR.price.toFixed(2)}</Text>
    //       <Text>Market Cap: €{item.quote.EUR.market_cap.toLocaleString()}</Text>
    //       <Text>
    //         Change 24h: {item.quote.EUR.percent_change_24h.toFixed(2)}%
    //       </Text>
    //     </View>
    //   ))} */}
    // </ScrollView>
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {/* Loading state */}
        {(isCurrenciesLoading || isInfoLoading) && (
          <Text style={{ color: Colors.gray }}>Loading data...</Text>
        )}

        {/* Error state */}
        {(isCurrenciesError || isInfoError) && (
          <Text style={{ color: "red" }}>
            {currenciesError?.message || infoError?.message}
          </Text>
        )}

        {/* Data rendering */}
        {!isCurrenciesLoading &&
          !isInfoLoading &&
          currencyList?.map((currency: Currency) => (
            <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
              <TouchableOpacity
                style={{ flexDirection: "row", gap: 14, alignItems: "center" }}
              >
                <Image
                  source={{ uri: data?.[currency.id]?.logo }}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{ flex: 1, gap: 6 }}>
                  <Text style={{ fontWeight: "600", color: Colors.dark }}>
                    {currency.name}
                  </Text>
                  <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
                </View>
                <View style={{ gap: 6, alignItems: "flex-end" }}>
                  <Text>{currency.quote.EUR.price.toFixed(2)} €</Text>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <Ionicons
                      name={
                        currency.quote.EUR.percent_change_1h > 0
                          ? "caret-up"
                          : "caret-down"
                      }
                      size={16}
                      color={
                        currency.quote.EUR.percent_change_1h > 0
                          ? "green"
                          : "red"
                      }
                    />
                    <Text
                      style={{
                        color:
                          currency.quote.EUR.percent_change_1h > 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
      </View>
    </ScrollView>
  );
};

export default Page;
