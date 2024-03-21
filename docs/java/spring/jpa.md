## jpa技巧

### 1. 多条件查询

#### 1.1 使用Specification

```java

Specification specification = new Specification() {
    @Override
    public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        if (StringUtils.isNotBlank(name)) {
            predicates.add(criteriaBuilder.equal(root.get("name"), name));
        }
        if (StringUtils.isNotBlank(code)) {
            predicates.add(criteriaBuilder.equal(root.get("code"), code));
        }
        if (StringUtils.isNotBlank(type)) {
            predicates.add(criteriaBuilder.equal(root.get("type"), type));
        }
        if (StringUtils.isNotBlank(status)) {
            predicates.add(criteriaBuilder.equal(root.get("status"), status));
        }
        if (StringUtils.isNotBlank(remark)) {
            predicates.add(criteriaBuilder.equal(root.get("remark"), remark));
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
    }
};

return repository.findAll(specification, pageable);

```

#### 1.2 使用@Query

> 该方式的原理是：根据逻辑运算符来判断是否需要拼接条件，如果条件为空，则不拼接，如果条件不为空，则拼接；
> 针对字符串类型，需要处理为空的情况，目前通过自定义注解将空字符串转成null，然后在sql中判断是否为null来拼接条件；
> 针对集合类型，需要处理为空的情况，目前通过自定义注解将空集合转成null，然后在sql中判断是否为null来拼接条件；



```java


@Query(
			value = "SELECT doc from BiddingDocumentInfo doc where 1=1" +
					" and (:batchNo is null or doc.batchNo = :batchNo)" +
					" and (:tenderNo is null or doc.tenderNo = :tenderNo)" +
					" and (CONCAT(:companyList, '') is null or doc.company in (:companyList))" +
					" and (CONCAT(:groupNames, '') is null or doc.groupName in (:groupNames))" +
					" and doc.mergeTenderNo is not null" +
					" group by doc.company, doc.mergeTenderNo"
	)
	Page<BiddingDocumentInfo> findSwMergeList(@Param("batchNo") String batchNo, @Param("tenderNo") String tenderNo,
											  @Param("companyList") List<String> companyList, @Param("groupNames") List<String> groupNames,
											  Pageable pageable);

```


#### 1.3 总结

> 通过以上两种方式的比较，目前个人常用第二种方式，因为第二种方式更加灵活，可以根据实际情况来拼接条件，而第一种方式则需要在方法中写死条件，不够灵活；


