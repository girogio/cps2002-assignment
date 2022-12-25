FROM maven:3.6.3-jdk-11-slim 
WORKDIR /app/vehicle/
COPY pom.xml ./
RUN mvn dependency:go-offline -B
COPY ./ ./build/
RUN cd build &&  mvn clean package spring-boot:repackage && mv target/vehicle-management-1.0-SNAPSHOT.jar ../ && cd ..
EXPOSE 9001
CMD ["java", "-jar", "vehicle-management-1.0-SNAPSHOT.jar", "$ARGS"]



