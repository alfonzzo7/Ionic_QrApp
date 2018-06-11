Pendiente con esta dependencia en el build.gradle

dependencies {
    implementation fileTree(dir: 'libs', include: '*.jar')
    // SUB-PROJECT DEPENDENCIES START
    implementation(project(path: ":CordovaLib"))
    implementation "com.android.support:support-v4:26.0.1"
    // SUB-PROJECT DEPENDENCIES END
}
