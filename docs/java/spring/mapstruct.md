> 使用接口的方式实现对象之间的转换。


### 1.1.1. 依赖

```xml
<dependency>
    <groupId>org.mapstruct</groupId>
    <artifactId>mapstruct</artifactId>
    <version>1.3.1.Final</version>
</dependency>
```

### 1.1.2. 使用

#### 官方文档

https://mapstruct.org/documentation/reference-guide/


#### 高级映射默认值和常量

https://mapstruct.org/documentation/stable/reference/html/#advanced-mappings-default-values-and-constants

```java
@Mapper
public interface CarMapper {

    # defaultValue当target属性为null时，使用defaultValue
    @Mapping(target = "seatCount", source = "numberOfSeats", defaultValue = "2")
    @Mapping(target = "type", constant = "sedan", defaultValue = "undefined")
    # constant 常量，target属性为常量，不参与映射
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss", constant = "2019-12-12 12:12:12")
    CarDto carToCarDto(Car car);
}
```


#### 自定义映射

```java
@Mapper
public interface CarMapper {

    @Mapping(target = "seatCount", source = "numberOfSeats", qualifiedByName = "ttt")
    @Mapping(target = "type", constant = "sedan")
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss", constant = "2019-12-12 12:12:12")
    CarDto carToCarDto(Car car);

    @Named("ttt")
    String carDtoToCar(String numberOfSeats){
        return numberOfSeats + "个座位";
    };
}
```

#### 集合映射

```java
@Mapper
public interface CarMapper {

    @Named("ttt")
    String carDtoToCar(String numberOfSeats){
        return numberOfSeats + "个座位";
    };

    @Mapping(target = "seatCount", source = "numberOfSeats", qualifiedByName = "ttt")
    @Mapping(target = "type", constant = "sedan")
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss", constant = "2019-12-12 12:12:12")
    @Named("carToCarDto")
    CarDto carToCarDto(Car car);

    @IterableMapping(qualifiedByName = "carToCarDto")
    List<CarDto> carsToCarDtos(List<Car> cars);
}
```


#### 映射忽略

```java
@Mapper
public interface CarMapper {

    @Named("ttt")
    String carDtoToCar(String numberOfSeats){
        return numberOfSeats + "个座位";
    };

    @Mapping(target = "seatCount", source = "numberOfSeats", qualifiedByName = "ttt")
    @Mapping(target = "type", constant = "sedan")
    @Mapping(target = "createTime", dateFormat = "yyyy-MM-dd HH:mm:ss", constant = "2019-12-12 12:12:12")
    @Named("carToCarDto")
    CarDto carToCarDto(Car car);

    @IterableMapping(qualifiedByName = "carToCarDto")
    List<CarDto> carsToCarDtos(List<Car> cars);

    @Mapping(target = "createTime", ignore = true)
    CarDto carToCarDto2(Car car);
}
```
#### 更多demo

https://github.com/mapstruct/mapstruct-examples